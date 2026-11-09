/**
 * Framework-free Three.js scene for the hero avatar.
 *
 * - Loads the meshopt-compressed Ready Player Me avatar and the baked CMU mocap clips
 *   (see scripts/bake-motions.mjs) in parallel.
 * - Idle loop + one-shot gestures (wave / shrug / stretch) with normalised weight crossfades,
 *   so interrupting a gesture never blends toward the bind pose.
 * - Head follows the pointer, eyes blink, slight smile.
 * - Renders only while on screen and the tab is visible. Honors prefers-reduced-motion.
 */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const MODEL_URL = "/3delems/sachin96Boy.min.glb";
const MOTIONS_URL = "/3delems/avatar-motions.json";

export const GESTURES = ["wave", "shrug", "stretch"];

const FADE_IN = 0.35; // s, idle/gesture -> gesture
const FADE_OUT = 0.5; // s, gesture -> idle
const AUTO_GESTURE_EVERY = 15; // s of visible idle time
const AUTO_STRETCH_EVERY = 3; // every 3rd automatic gesture is a stretch instead of a wave
const NO_HEAD_FOLLOW = new Set(["stretch"]); // gestures that move the head a lot themselves
const MAX_DT = 1 / 20;

/** Framing box in model space (meters): hips to above the head, shoulders plus raised hands. */
const FRAME = { bottom: 0.82, top: 2.0, halfWidth: 0.5, margin: 1.06 };
const FOV = 30;
const MODEL_YAW = -0.15; // turn slightly toward the hero text

const HEAD = {
  maxYaw: THREE.MathUtils.degToRad(35),
  maxPitch: THREE.MathUtils.degToRad(20),
  neckShare: 0.4,
  follow: 5, // 1/s smoothing rate
  forgetAfter: 4, // s without pointer movement -> look back at the camera
};

const BASE_SMILE = 0.25;
const GESTURE_SMILE = { wave: 0.6, shrug: 0.2, stretch: 0.05 };

const damp = (current, target, rate, dt) =>
  THREE.MathUtils.lerp(current, target, 1 - Math.exp(-rate * dt));

/**
 * @param {HTMLElement} container element the canvas is appended to (should be position: relative)
 * @param {{ reducedMotion?: boolean, onLoaded?: () => void, onError?: (e: unknown) => void,
 *           onGesture?: (name: string | null) => void }} options
 */
export function createAvatarScene(container, options = {}) {
  const { reducedMotion = false, onLoaded, onError, onGesture } = options;
  const canHover = window.matchMedia?.("(hover: hover)").matches ?? true;
  const headFollowEnabled = canHover && !reducedMotion;

  // --- renderer / scene / camera -----------------------------------------
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.touchAction = "pan-y";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);

  // Physical light units (three r155+): ≈ π × the old legacy-mode intensities.
  scene.add(new THREE.HemisphereLight(0xf1f5f9, 0x1e293b, 0.9 * Math.PI));
  const key = new THREE.DirectionalLight(0xffffff, 1.35 * Math.PI);
  key.position.set(1.6, 3, 2.6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xcbd5e1, 0.35 * Math.PI);
  fill.position.set(-2.5, 1.5, 1.5);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x86efac, 0.75 * Math.PI); // accent-tinted rim light
  rim.position.set(-1.5, 2.6, -2.5);
  scene.add(rim);

  // --- state ---------------------------------------------------------------
  const timer = new THREE.Timer();
  let disposed = false;
  let loaded = false;
  let running = false;
  let onScreen = true;
  let pageVisible = !document.hidden;

  let model = null;
  let mixer = null;
  /** @type {Record<string, THREE.AnimationAction>} */
  const actions = {};
  const weights = new Map();
  let active = null; // action with target weight 1
  let fadeTime = FADE_IN;
  let gestureName = null;
  let lastGesture = null;
  let cycle = 0;
  let idleTime = 0;
  let autoCount = 0;

  let neck = null;
  let head = null;
  const look = { yaw: 0, pitch: 0, weight: headFollowEnabled ? 1 : 0 };
  const pointer = { x: 0, y: 0, idle: Infinity, seen: false };

  const faceMeshes = []; // { mesh, blinkL, blinkR, smile }
  let blinkIn = 2 + Math.random() * 3;
  let blinkT = -1;
  let smile = BASE_SMILE;

  // --- framing ---------------------------------------------------------------
  function frame() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    const aspect = width / height;
    camera.aspect = aspect;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const halfH = (FRAME.top - FRAME.bottom) / 2;
    const dist = Math.max(halfH / tanHalf, FRAME.halfWidth / (tanHalf * aspect)) * FRAME.margin;
    const cy = (FRAME.top + FRAME.bottom) / 2;
    camera.position.set(0, cy, dist);
    camera.lookAt(0, cy, 0);
    camera.updateProjectionMatrix();
  }

  // --- animation control -----------------------------------------------------
  function setActive(action, fade) {
    active = action;
    fadeTime = fade;
  }

  function updateWeights(dt) {
    const step = fadeTime > 0 ? dt / fadeTime : 1;
    let sum = 0;
    for (const action of Object.values(actions)) {
      const w = weights.get(action) ?? 0;
      const next = action === active ? Math.min(1, w + step) : Math.max(0, w - step);
      weights.set(action, next);
      sum += next;
    }
    for (const action of Object.values(actions)) {
      const w = sum > 0 ? weights.get(action) / sum : 0;
      action.enabled = w > 0;
      action.setEffectiveWeight(w);
    }
  }

  function playGesture(name) {
    const action = actions[name];
    if (!action || disposed) return;
    action.reset();
    action.play();
    setActive(action, FADE_IN);
    gestureName = name;
    lastGesture = name;
    idleTime = 0;
    onGesture?.(name);
    ensureLoop();
  }

  function playNextGesture() {
    if (!loaded) return;
    let name = GESTURES[cycle % GESTURES.length];
    if (name === lastGesture) {
      cycle += 1;
      name = GESTURES[cycle % GESTURES.length];
    }
    cycle += 1;
    playGesture(name);
  }

  function updateGestureState(dt) {
    if (gestureName) {
      const action = actions[gestureName];
      const duration = action.getClip().duration;
      if (active === action && action.time >= duration - FADE_OUT) {
        setActive(actions.idle, FADE_OUT);
      }
      if (active === actions.idle && (weights.get(actions.idle) ?? 0) >= 1) {
        gestureName = null;
        idleTime = 0;
        onGesture?.(null);
      }
    } else if (!reducedMotion) {
      idleTime += dt;
      if (idleTime >= AUTO_GESTURE_EVERY) {
        autoCount += 1;
        playGesture(autoCount % AUTO_STRETCH_EVERY === 0 && actions.stretch ? "stretch" : "wave");
      }
    }
  }

  // --- head follow / face ------------------------------------------------------
  const qTmp = new THREE.Quaternion();
  const qParent = new THREE.Quaternion();
  const qLook = new THREE.Quaternion();
  const eTmp = new THREE.Euler(0, 0, 0, "YXZ");

  function applyLookRotation(bone, share) {
    if (!bone) return;
    eTmp.set(look.pitch * share * look.weight, look.yaw * share * look.weight, 0, "YXZ");
    qLook.setFromEuler(eTmp);
    bone.parent.getWorldQuaternion(qParent);
    // local' = parent⁻¹ · R · parent · local  (rotate about world axes at the bone pivot)
    qTmp.copy(qParent).invert().multiply(qLook).multiply(qParent);
    bone.quaternion.premultiply(qTmp);
  }

  function updateHead(dt) {
    let targetYaw = 0;
    let targetPitch = 0;
    pointer.idle += dt;
    if (headFollowEnabled && pointer.seen && pointer.idle < HEAD.forgetAfter) {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.3; // roughly the avatar's face
      const nx = THREE.MathUtils.clamp((pointer.x - cx) / (window.innerWidth / 2), -1, 1);
      const ny = THREE.MathUtils.clamp((pointer.y - cy) / (window.innerHeight / 2), -1, 1);
      targetYaw = nx * HEAD.maxYaw - MODEL_YAW * 0.5;
      targetPitch = ny * HEAD.maxPitch;
    }
    const wantWeight = headFollowEnabled && !NO_HEAD_FOLLOW.has(gestureName) ? 1 : 0;
    look.weight = damp(look.weight, wantWeight, 4, dt);
    look.yaw = damp(look.yaw, targetYaw, HEAD.follow, dt);
    look.pitch = damp(look.pitch, targetPitch, HEAD.follow, dt);
    if (look.weight < 0.001) return;
    applyLookRotation(neck, HEAD.neckShare);
    applyLookRotation(head, 1 - HEAD.neckShare);
  }

  function updateFace(dt) {
    if (!faceMeshes.length) return;
    // Blink: close 60 ms, open 100 ms, every 2–6 s.
    let blink = 0;
    if (!reducedMotion) {
      if (blinkT < 0) {
        blinkIn -= dt;
        if (blinkIn <= 0) blinkT = 0;
      }
      if (blinkT >= 0) {
        blinkT += dt;
        blink = blinkT < 0.06 ? blinkT / 0.06 : Math.max(0, 1 - (blinkT - 0.06) / 0.1);
        if (blinkT > 0.16) {
          blinkT = -1;
          blinkIn = 2 + Math.random() * 4;
        }
      }
    }
    smile = damp(smile, gestureName ? GESTURE_SMILE[gestureName] ?? BASE_SMILE : BASE_SMILE, 4, dt);
    for (const f of faceMeshes) {
      const infl = f.mesh.morphTargetInfluences;
      if (f.blinkL !== undefined) infl[f.blinkL] = blink;
      if (f.blinkR !== undefined) infl[f.blinkR] = blink;
      if (f.smile !== undefined) infl[f.smile] = smile;
    }
  }

  // --- loop ----------------------------------------------------------------------
  function render() {
    renderer.render(scene, camera);
  }

  function tick(timestamp) {
    timer.update(timestamp);
    const dt = Math.min(timer.getDelta(), MAX_DT);
    updateWeights(dt);
    updateGestureState(dt);
    mixer.update(dt);
    updateHead(dt);
    updateFace(dt);
    render();
    if (reducedMotion && !gestureName) ensureLoop(); // stop once the gesture has settled
  }

  function shouldRun() {
    if (disposed || !loaded || !onScreen || !pageVisible) return false;
    return !reducedMotion || gestureName !== null;
  }

  function ensureLoop() {
    const want = shouldRun();
    if (want && !running) {
      timer.reset(); // no catch-up jump after a pause
      renderer.setAnimationLoop(tick);
      running = true;
    } else if (!want && running) {
      renderer.setAnimationLoop(null);
      running = false;
      if (loaded && !disposed) render();
    }
  }

  // --- observers / listeners -----------------------------------------------------
  const resizeObserver = new ResizeObserver(() => {
    frame();
    if (loaded && !running) render();
  });
  resizeObserver.observe(container);

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      onScreen = entries.some((e) => e.isIntersecting);
      ensureLoop();
    },
    { threshold: 0 }
  );
  intersectionObserver.observe(container);

  const onVisibility = () => {
    pageVisible = !document.hidden;
    ensureLoop();
  };
  document.addEventListener("visibilitychange", onVisibility);

  const onPointerMove = (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.idle = 0;
    pointer.seen = true;
  };
  if (headFollowEnabled) window.addEventListener("pointermove", onPointerMove, { passive: true });

  const onClick = () => playNextGesture();
  container.addEventListener("click", onClick);

  // --- load ------------------------------------------------------------------------
  frame();
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const motionsRequest = fetch(MOTIONS_URL).then((res) => {
    if (!res.ok) throw new Error(`Failed to load ${MOTIONS_URL}: ${res.status}`);
    return res.json();
  });

  Promise.all([loader.loadAsync(MODEL_URL), motionsRequest])
    .then(([gltf, motions]) => {
      if (disposed) {
        disposeObject(gltf.scene);
        return;
      }
      model = gltf.scene;
      model.rotation.y = MODEL_YAW;
      model.traverse((obj) => {
        if (obj.isSkinnedMesh || obj.isMesh) obj.frustumCulled = false;
        const dict = obj.morphTargetDictionary;
        if (dict && obj.morphTargetInfluences) {
          faceMeshes.push({
            mesh: obj,
            blinkL: dict.eyeBlinkLeft,
            blinkR: dict.eyeBlinkRight,
            smile: dict.mouthSmile,
          });
        }
      });
      neck = model.getObjectByName("Neck");
      head = model.getObjectByName("Head");
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      for (const json of motions.clips) {
        const clip = THREE.AnimationClip.parse(json);
        // AnimationMixer caches actions by clip uuid; clips without one would all share a single action.
        if (!clip.uuid) clip.uuid = THREE.MathUtils.generateUUID();
        const action = mixer.clipAction(clip);
        if (clip.name === "idle") {
          action.setLoop(THREE.LoopRepeat, Infinity);
        } else {
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
        }
        action.enabled = false;
        action.play();
        actions[clip.name] = action;
        weights.set(action, 0);
      }
      if (!actions.idle) throw new Error("avatar-motions.json has no idle clip");

      // Start fully in idle.
      weights.set(actions.idle, 1);
      setActive(actions.idle, FADE_IN);
      updateWeights(0);

      if (reducedMotion) {
        actions.idle.time = 1.2; // a calm, natural frame
        actions.idle.paused = true;
      }
      mixer.update(0);
      updateFace(0);
      loaded = true;
      if (import.meta.env.DEV) {
        // Dev-only handle for tuning clips from the console (stripped from production builds).
        window.__avatarDebug = { THREE, model, mixer, actions, weights, play: playGesture, get running() { return running; } };
      }
      frame();
      render();
      onLoaded?.();

      if (!reducedMotion) playGesture("wave");
      ensureLoop();
    })
    .catch((err) => {
      if (!disposed) onError?.(err);
    });

  // --- teardown ----------------------------------------------------------------------
  function disposeObject(root) {
    root.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      const materials = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : [];
      for (const m of materials) {
        for (const value of Object.values(m)) {
          if (value && value.isTexture) value.dispose();
        }
        m.dispose();
      }
      if (obj.skeleton) obj.skeleton.dispose();
    });
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    renderer.setAnimationLoop(null);
    running = false;
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("click", onClick);
    if (mixer) {
      mixer.stopAllAction();
      if (model) mixer.uncacheRoot(model);
    }
    if (model) disposeObject(model);
    timer.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  }

  return { playNextGesture, dispose };
}
