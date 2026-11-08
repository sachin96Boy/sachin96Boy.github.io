#!/usr/bin/env node
/**
 * Bake CMU motion-capture BVH clips onto the Ready Player Me avatar rig.
 *
 * Motion data from mocap.cs.cmu.edu, created with funding from NSF EIA-0196217.
 * BVH conversion: cgspeed.com "Daz-friendly" release (B. Hahne).
 *
 * Usage:  npm run bake:motions
 *         MOTION_DIR=/path/to/cmu-bvh npm run bake:motions
 *
 * Output: public/3delems/avatar-motions.json  ({ fps, credit, clips: AnimationClip.toJSON()[] })
 *
 * How it works (world-space, rest-relative retargeting):
 *   - Frame 0 of every cgspeed BVH is a T-pose calibration frame and is skipped.
 *   - The BVH rest pose (OFFSETs, no rotation) is a T-pose; the avatar rests in an A-pose.
 *     Each mapped bone gets an alignment rotation Qalign that turns the avatar's rest bone
 *     direction into the BVH's rest bone direction.
 *   - Per frame:  Qt_world = Qyaw⁻¹ · Qbvh_world(t) · Qalign · Qt_restWorld
 *     then converted to local rotations top-down. Unmapped bones keep their rest rotation.
 *   - The capture subject's facing (median hip yaw) is removed so the avatar faces +Z.
 *   - Hip X/Z are locked to the rest pose (no drift); hip height is scaled to the avatar.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as THREE from "three";
import { BVHLoader } from "three/examples/jsm/loaders/BVHLoader.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MOTION_DIR = process.env.MOTION_DIR ?? "E:/motion";
const AVATAR_CANDIDATES = [
  "public/3delems/sachin96Boy.min.glb",
  "public/3delems/sachin96Boy.glb",
].map((p) => path.join(ROOT, p));
const OUT_FILE = path.join(ROOT, "public/3delems/avatar-motions.json");
const FPS = 30;
const CREDIT =
  "Motion data from mocap.cs.cmu.edu, created with funding from NSF EIA-0196217.";

/**
 * Clips to bake (auditioned on the avatar at hero framing; see BAKE_EXTRA below to try others).
 * start/end trim (seconds, source time): every trial opens with ~0.2 s of the actor in a T-pose.
 */
const CLIPS = [
  {
    name: "idle", // 113_21 "Standing Still"
    file: "113/113_21",
    loop: { minSeconds: 6, maxSeconds: 10, blendSeconds: 0.5 },
    headScale: 0.4, // soften head look-around; the runtime cursor-follow adds life back
  },
  { name: "wave", file: "141/141_16", start: 0.2 }, // "Wave Hello": big, clearly readable wave
  { name: "shrug", file: "111/111_25", start: 0.2 }, // "Shrug": palms up + head tilt
  { name: "stretch", file: "113/113_23", start: 1.0, end: 6.8 }, // "Stretch and yawn"
];

// Audition extra clips without editing the list: BAKE_EXTRA="happy=142/142_08,laugh=13/13_14"
for (const entry of (process.env.BAKE_EXTRA ?? "").split(",").filter(Boolean)) {
  const [name, file] = entry.split("=");
  CLIPS.push({ name, file, start: 0.2 });
}

/**
 * Per-subject head calibration fix. Subject 113's neck/head joints carry a constant rotation offset
 * in every trial (neck ≈ -24° yaw / -27° pitch, head roll ≈ 66°; other subjects measure near 0°).
 * For each [child, parent] pair, the mean child-relative-to-parent rotation is measured on a calm
 * calibration clip and removed (right-multiplied) so the subject's average head pose is neutral.
 */
const HEAD_FIX = {
  113: { calibrate: "113/113_21", chain: [["neck", "chest"], ["head", "neck"]] },
};

/** Keyframe reduction tolerances (max per-component error after linear interpolation). */
const REDUCE_TOLERANCE = { quaternion: 0.0015, position: 0.0008 };

/** BVH joint -> avatar bone. */
const BONE_MAP = {
  hip: "Hips",
  abdomen: "Spine",
  chest: "Spine2",
  neck: "Neck",
  head: "Head",
  lCollar: "LeftShoulder",
  lShldr: "LeftArm",
  lForeArm: "LeftForeArm",
  lHand: "LeftHand",
  rCollar: "RightShoulder",
  rShldr: "RightArm",
  rForeArm: "RightForeArm",
  rHand: "RightHand",
  lThigh: "LeftUpLeg",
  lShin: "LeftLeg",
  lFoot: "LeftFoot",
  rThigh: "RightUpLeg",
  rShin: "RightLeg",
  rFoot: "RightFoot",
};

/** Rest-direction alignment: [source child joint, target child bone]. Bones not listed use identity. */
const ALIGN_CHILD = {
  abdomen: ["chest", "Spine2"],
  chest: ["neck", "Neck"],
  neck: ["head", "Head"],
  lCollar: ["lShldr", "LeftArm"],
  lShldr: ["lForeArm", "LeftForeArm"],
  lForeArm: ["lHand", "LeftHand"],
  lHand: ["lMid1", "LeftHandMiddle1"],
  rCollar: ["rShldr", "RightArm"],
  rShldr: ["rForeArm", "RightForeArm"],
  rForeArm: ["rHand", "RightHand"],
  rHand: ["rMid1", "RightHandMiddle1"],
  lThigh: ["lShin", "LeftLeg"],
  lShin: ["lFoot", "LeftFoot"],
  rThigh: ["rShin", "RightLeg"],
  rShin: ["rFoot", "RightFoot"],
};

/** Bones weighted when searching for a seamless idle loop. */
const LOOP_WEIGHTS = {
  Hips: 2, Spine: 1.5, Spine2: 1.5, Neck: 1, Head: 1.5,
  LeftArm: 1, RightArm: 1, LeftForeArm: 0.75, RightForeArm: 0.75,
  LeftUpLeg: 0.5, RightUpLeg: 0.5,
};

// ---------------------------------------------------------------------------
// Target (avatar) rest skeleton, read straight from the GLB's JSON chunk.
// ---------------------------------------------------------------------------
function loadTargetRest() {
  const file = AVATAR_CANDIDATES.find((p) => fs.existsSync(p));
  if (!file) throw new Error(`Avatar GLB not found. Looked in:\n  ${AVATAR_CANDIDATES.join("\n  ")}`);
  const buf = fs.readFileSync(file);
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error(`${file} is not a binary glTF`);
  const jsonLength = buf.readUInt32LE(12);
  const gltf = JSON.parse(buf.subarray(20, 20 + jsonLength).toString("utf8"));

  const objects = gltf.nodes.map((n) => {
    const o = new THREE.Object3D();
    o.name = n.name ?? "";
    if (n.matrix) {
      new THREE.Matrix4().fromArray(n.matrix).decompose(o.position, o.quaternion, o.scale);
    } else {
      if (n.translation) o.position.fromArray(n.translation);
      if (n.rotation) o.quaternion.fromArray(n.rotation);
      if (n.scale) o.scale.fromArray(n.scale);
    }
    return o;
  });
  gltf.nodes.forEach((n, i) => (n.children ?? []).forEach((c) => objects[i].add(objects[c])));
  const root = new THREE.Object3D();
  gltf.scenes[gltf.scene ?? 0].nodes.forEach((i) => root.add(objects[i]));
  root.updateMatrixWorld(true);

  const byName = new Map(objects.map((o) => [o.name, o]));
  const hips = byName.get("Hips");
  if (!hips) throw new Error("Avatar has no 'Hips' bone");

  // Topological order of the skeleton below Hips (parents before children).
  const order = [];
  hips.traverse((o) => order.push(o));

  const rest = new Map();
  for (const o of objects) {
    rest.set(o.name, {
      localQuat: o.quaternion.clone(),
      localPos: o.position.clone(),
      worldQuat: o.getWorldQuaternion(new THREE.Quaternion()),
      worldPos: o.getWorldPosition(new THREE.Vector3()),
    });
  }
  return { file, byName, hips, order, rest, nodeNames: new Set(objects.map((o) => o.name)) };
}

// ---------------------------------------------------------------------------
// Source (BVH) evaluation
// ---------------------------------------------------------------------------
function loadBvh(relFile) {
  const file = path.join(MOTION_DIR, `${relFile}.bvh`);
  if (!fs.existsSync(file)) throw new Error(`BVH not found: ${file} (set MOTION_DIR?)`);
  const result = new BVHLoader().parse(fs.readFileSync(file, "utf8"));
  const bones = result.skeleton.bones;
  const byName = new Map(bones.map((b) => [b.name, b]));
  const group = new THREE.Group();
  group.add(bones[0]);
  group.updateMatrixWorld(true);

  // Rest pose = OFFSET hierarchy with no rotation (a T-pose).
  const restPos = new Map(bones.map((b) => [b.name, b.getWorldPosition(new THREE.Vector3())]));

  for (const track of result.clip.tracks) {
    track.name = track.name.replace(/^\.bones\[(.+?)\]/, "$1");
  }
  const hipTrack = result.clip.tracks.find((t) => t.name === "hip.position");
  const restHipY = hipTrack.values[1]; // frame 0 is the T-pose calibration frame

  const mixer = new THREE.AnimationMixer(group);
  mixer.clipAction(result.clip).play();
  const frameTime = result.clip.tracks[0].times[1] - result.clip.tracks[0].times[0];

  return { file, group, byName, restPos, restHipY, mixer, clip: result.clip, frameTime };
}

function sampleTimes(src, { start = 0, end = Infinity } = {}) {
  const first = Math.max(src.frameTime, start); // skip frame 0 (T-pose)
  const last = Math.min(src.clip.duration - 1e-4, end);
  const times = [];
  for (let t = first; t <= last + 1e-9; t += 1 / FPS) times.push(t);
  return times;
}

function medianYaw(src, times) {
  const hip = src.byName.get("hip");
  const q = new THREE.Quaternion();
  const fwd = new THREE.Vector3();
  const yaws = times.map((t) => {
    src.mixer.setTime(t);
    src.group.updateMatrixWorld(true);
    hip.getWorldQuaternion(q);
    fwd.set(0, 0, 1).applyQuaternion(q);
    return Math.atan2(fwd.x, fwd.z);
  });
  // Median of angles via unit vectors around the circular mean (robust to wrap-around).
  const mean = Math.atan2(
    yaws.reduce((s, a) => s + Math.sin(a), 0),
    yaws.reduce((s, a) => s + Math.cos(a), 0)
  );
  const rel = yaws.map((a) => Math.atan2(Math.sin(a - mean), Math.cos(a - mean))).sort((a, b) => a - b);
  return mean + rel[Math.floor(rel.length / 2)];
}

// ---------------------------------------------------------------------------
// Subject calibration (head offset) and head softening
// ---------------------------------------------------------------------------
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const IDENTITY = new THREE.Quaternion();

/** Sign-aligned quaternion mean; fine for tightly clustered rotations. */
function meanQuaternion(quats) {
  const ref = quats[0];
  const sum = new THREE.Vector4();
  for (const q of quats) {
    const s = ref.dot(q) < 0 ? -1 : 1;
    sum.x += s * q.x;
    sum.y += s * q.y;
    sum.z += s * q.z;
    sum.w += s * q.w;
  }
  return new THREE.Quaternion(sum.x, sum.y, sum.z, sum.w).normalize();
}

const headFixCache = new Map();
/** Returns [{ child, parent, offsetInv }] for the clip's subject, or null. */
function subjectHeadFix(relFile) {
  const subject = relFile.split("/")[0];
  const cfg = HEAD_FIX[subject];
  if (!cfg) return null;
  if (headFixCache.has(subject)) return headFixCache.get(subject);

  const src = loadBvh(cfg.calibrate);
  const samples = sampleTimes(src).map((t) => {
    src.mixer.setTime(t);
    src.group.updateMatrixWorld(true);
    const m = new Map();
    for (const [child, parent] of cfg.chain) {
      for (const n of [child, parent]) {
        if (!m.has(n)) m.set(n, src.byName.get(n).getWorldQuaternion(new THREE.Quaternion()));
      }
    }
    return m;
  });

  // Sequential: each child's offset is measured against its already-corrected parent.
  const fix = [];
  for (const [child, parent] of cfg.chain) {
    const rels = samples.map((m) => m.get(parent).clone().invert().multiply(m.get(child)));
    const offset = meanQuaternion(rels);
    const offsetInv = offset.clone().invert();
    for (const m of samples) m.set(child, m.get(child).clone().multiply(offsetInv));
    fix.push({ child, parent, offset, offsetInv });
  }
  headFixCache.set(subject, fix);
  return fix;
}

/**
 * World rotations of all mapped source joints for the current frame, with the subject head fix
 * applied and (optionally) neck/head motion scaled toward neutral by `headScale`.
 */
function sourceWorldQuats(src, fix, headScale = 1) {
  const q = new Map();
  for (const name of Object.keys(BONE_MAP)) {
    q.set(name, src.byName.get(name).getWorldQuaternion(new THREE.Quaternion()));
  }
  for (const { child, offsetInv } of fix ?? []) q.set(child, q.get(child).clone().multiply(offsetInv));

  if (headScale !== 1) {
    // Rebuild the chain top-down from scaled relative rotations.
    const original = new Map(q);
    for (const [child, parent] of [["neck", "chest"], ["head", "neck"]]) {
      const rel = original.get(parent).clone().invert().multiply(original.get(child));
      const scaled = IDENTITY.clone().slerp(rel, headScale);
      q.set(child, q.get(parent).clone().multiply(scaled));
    }
  }
  return q;
}

// ---------------------------------------------------------------------------
// Retargeting
// ---------------------------------------------------------------------------
function computeAlignments(src, tgt) {
  const align = new Map();
  for (const [srcName, tgtName] of Object.entries(BONE_MAP)) {
    const q = new THREE.Quaternion();
    const pair = ALIGN_CHILD[srcName];
    if (pair) {
      const [srcChild, tgtChild] = pair;
      const sA = src.restPos.get(srcName);
      const sB = src.restPos.get(srcChild);
      const tA = tgt.rest.get(tgtName)?.worldPos;
      const tB = tgt.rest.get(tgtChild)?.worldPos;
      if (!sA || !sB || !tA || !tB) {
        throw new Error(`Missing joint for alignment ${srcName}->${srcChild} / ${tgtName}->${tgtChild}`);
      }
      const srcDir = sB.clone().sub(sA).normalize();
      const tgtDir = tB.clone().sub(tA).normalize();
      q.setFromUnitVectors(tgtDir, srcDir);
    }
    align.set(tgtName, q);
  }
  return align;
}

/** Returns per-frame { quats: Map<bone, Quaternion>, hipPos: Vector3 } in avatar-local space. */
function retarget(src, tgt, times, fix, headScale) {
  const yaw = medianYaw(src, times);
  const qYawInv = new THREE.Quaternion().setFromAxisAngle(Y_AXIS, -yaw);
  const align = computeAlignments(src, tgt);
  const tgtToSrc = new Map(Object.entries(BONE_MAP).map(([s, t]) => [t, s]));

  const hipsRest = tgt.rest.get("Hips");
  const hipsParent = tgt.hips.parent;
  const parentWorldInv = hipsParent.matrixWorld.clone().invert();
  const scale = hipsRest.worldPos.y / src.restHipY;

  const srcHip = src.byName.get("hip");
  const frames = [];

  for (const t of times) {
    src.mixer.setTime(t);
    src.group.updateMatrixWorld(true);
    const srcWorld = sourceWorldQuats(src, fix, headScale);

    const world = new Map();
    const local = new Map();
    for (const bone of tgt.order) {
      const parentWorld =
        bone === tgt.hips
          ? hipsParent.getWorldQuaternion(new THREE.Quaternion())
          : world.get(bone.parent.name);
      const srcName = tgtToSrc.get(bone.name);
      if (srcName) {
        const w = qYawInv
          .clone()
          .multiply(srcWorld.get(srcName))
          .multiply(align.get(bone.name))
          .multiply(tgt.rest.get(bone.name).worldQuat);
        world.set(bone.name, w);
        local.set(bone.name, parentWorld.clone().invert().multiply(w).normalize());
      } else {
        world.set(bone.name, parentWorld.clone().multiply(tgt.rest.get(bone.name).localQuat));
      }
    }

    const srcY = srcHip.getWorldPosition(new THREE.Vector3()).y;
    const hipWorld = new THREE.Vector3(
      hipsRest.worldPos.x,
      hipsRest.worldPos.y + (srcY - src.restHipY) * scale,
      hipsRest.worldPos.z
    );
    frames.push({ quats: local, hipPos: hipWorld.applyMatrix4(parentWorldInv) });
  }
  return { frames, yaw };
}

// ---------------------------------------------------------------------------
// Idle loop search + seamless blend
// ---------------------------------------------------------------------------
function poseDistance(a, b) {
  let d = 0;
  for (const [bone, w] of Object.entries(LOOP_WEIGHTS)) {
    d += w * a.quats.get(bone).angleTo(b.quats.get(bone));
  }
  return d + 20 * Math.abs(a.hipPos.y - b.hipPos.y);
}

function findLoop(frames, { minSeconds, maxSeconds }) {
  const minLen = Math.round(minSeconds * FPS);
  const maxLen = Math.round(maxSeconds * FPS);
  let best = { cost: Infinity, s: 0, e: Math.min(frames.length - 1, maxLen) };
  for (let s = 1; s + minLen < frames.length - 1; s++) {
    for (let e = s + minLen; e <= Math.min(s + maxLen, frames.length - 2); e++) {
      // Pose match plus velocity match (pose one frame later should also match).
      const cost =
        poseDistance(frames[s], frames[e]) + 0.5 * poseDistance(frames[s + 1], frames[e + 1]);
      if (cost < best.cost) best = { cost, s, e };
    }
  }
  return best;
}

function blendLoopEnd(frames, blendSeconds) {
  const n = Math.min(frames.length - 1, Math.round(blendSeconds * FPS));
  const first = frames[0];
  for (let i = 0; i < n; i++) {
    const idx = frames.length - n + i;
    const x = (i + 1) / n;
    const w = x * x * (3 - 2 * x); // smoothstep, reaches 1 on the final frame
    const f = frames[idx];
    for (const [bone, q] of f.quats) q.slerp(first.quats.get(bone), w);
    f.hipPos.lerp(first.hipPos, w);
  }
}

// ---------------------------------------------------------------------------
// Clip assembly
// ---------------------------------------------------------------------------
const round = (v) => Math.round(v * 1e4) / 1e4;

/**
 * Ramer–Douglas–Peucker keyframe reduction: drop keys that linear interpolation between the
 * surrounding kept keys reproduces within `tol` (per component). First and last keys always stay,
 * so looping clips remain seamless.
 */
function reduceKeys(times, values, stride, tol) {
  const n = times.length;
  if (n <= 2) return { times, values };
  const keep = new Uint8Array(n);
  keep[0] = keep[n - 1] = 1;
  const stack = [[0, n - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let maxErr = 0;
    let at = -1;
    for (let i = a + 1; i < b; i++) {
      const u = (times[i] - times[a]) / (times[b] - times[a]);
      for (let k = 0; k < stride; k++) {
        const va = values[a * stride + k];
        const err = Math.abs(va + (values[b * stride + k] - va) * u - values[i * stride + k]);
        if (err > maxErr) {
          maxErr = err;
          at = i;
        }
      }
    }
    if (maxErr > tol) {
      keep[at] = 1;
      stack.push([a, at], [at, b]);
    }
  }
  const outTimes = [];
  const outValues = [];
  for (let i = 0; i < n; i++) {
    if (!keep[i]) continue;
    outTimes.push(times[i]);
    for (let k = 0; k < stride; k++) outValues.push(values[i * stride + k]);
  }
  return { times: outTimes, values: outValues };
}

function buildClip(name, frames) {
  const times = frames.map((_, i) => i / FPS);
  const tracks = [];
  for (const bone of frames[0].quats.keys()) {
    const values = [];
    let prev = null;
    for (const f of frames) {
      const q = f.quats.get(bone).clone();
      if (prev && prev.dot(q) < 0) q.set(-q.x, -q.y, -q.z, -q.w); // sign continuity
      values.push(q.x, q.y, q.z, q.w);
      prev = q;
    }
    const r = reduceKeys(times, values, 4, REDUCE_TOLERANCE.quaternion);
    tracks.push(new THREE.QuaternionKeyframeTrack(`${bone}.quaternion`, r.times, r.values));
  }
  const hip = reduceKeys(
    times,
    frames.flatMap((f) => [f.hipPos.x, f.hipPos.y, f.hipPos.z]),
    3,
    REDUCE_TOLERANCE.position
  );
  tracks.push(new THREE.VectorKeyframeTrack("Hips.position", hip.times, hip.values));
  const clip = new THREE.AnimationClip(name, -1, tracks);
  const json = THREE.AnimationClip.toJSON(clip);
  for (const t of json.tracks) {
    t.times = Array.from(t.times, round);
    t.values = Array.from(t.values, round);
  }
  // Stable, unique id per clip: AnimationMixer caches actions by clip uuid, so clips must not share one.
  json.uuid = `avatar-motion-${name}`;
  return json;
}

function validate(clipJson, tgt) {
  for (const t of clipJson.tracks) {
    const bone = t.name.split(".")[0];
    if (!tgt.nodeNames.has(bone)) throw new Error(`${clipJson.name}: track bone '${bone}' not in avatar`);
    if (t.values.some((v) => !Number.isFinite(v))) throw new Error(`${clipJson.name}: NaN in ${t.name}`);
  }
}

/** Quick sanity metric: highest right/left hand height relative to the head, from the baked clip. */
function handReport(clipJson, tgt) {
  const clip = THREE.AnimationClip.parse(clipJson);
  const root = tgt.hips.parent.parent ?? tgt.hips.parent;
  const mixer = new THREE.AnimationMixer(root);
  mixer.clipAction(clip).play();
  const head = tgt.byName.get("Head");
  const rh = tgt.byName.get("RightHand");
  const lh = tgt.byName.get("LeftHand");
  let r = -Infinity;
  let l = -Infinity;
  const v = new THREE.Vector3();
  for (let t = 0; t < clip.duration; t += 1 / FPS) {
    mixer.setTime(t);
    root.updateMatrixWorld(true);
    const hy = head.getWorldPosition(v).y;
    r = Math.max(r, rh.getWorldPosition(v).y - hy);
    l = Math.max(l, lh.getWorldPosition(v).y - hy);
  }
  mixer.stopAllAction();
  mixer.uncacheRoot(root);
  // Restore rest pose for the next clip.
  for (const [name, rest] of tgt.rest) {
    const o = tgt.byName.get(name);
    if (o) {
      o.quaternion.copy(rest.localQuat);
      o.position.copy(rest.localPos);
    }
  }
  root.updateMatrixWorld(true);
  return `max hand-above-head  R ${r.toFixed(2)} m  L ${l.toFixed(2)} m`;
}

// ---------------------------------------------------------------------------
function main() {
  const tgt = loadTargetRest();
  console.log(`Avatar:  ${path.relative(ROOT, tgt.file)}`);
  console.log(`Motions: ${MOTION_DIR}`);
  for (const [subject, cfg] of Object.entries(HEAD_FIX)) {
    const fix = subjectHeadFix(cfg.calibrate);
    const desc = fix.map((f) => {
      const deg = (2 * Math.acos(Math.min(1, Math.abs(f.offset.w))) * 180) / Math.PI;
      return `${f.child}/${f.parent} ${deg.toFixed(0)}°`;
    });
    console.log(`Head calibration fix (subject ${subject}): ${desc.join(", ")}`);
  }
  console.log();

  const clips = [];
  for (const cfg of CLIPS) {
    const src = loadBvh(cfg.file);
    const times = sampleTimes(src, cfg);
    const fix = subjectHeadFix(cfg.file);
    let { frames, yaw } = retarget(src, tgt, times, fix, cfg.headScale ?? 1);
    let note = "";
    if (cfg.loop) {
      const loop = findLoop(frames, cfg.loop);
      frames = frames.slice(loop.s, loop.e + 1);
      blendLoopEnd(frames, cfg.loop.blendSeconds);
      note = `loop ${(loop.s / FPS).toFixed(2)}s–${(loop.e / FPS).toFixed(2)}s (cost ${loop.cost.toFixed(3)})`;
    }
    const json = buildClip(cfg.name, frames);
    validate(json, tgt);
    clips.push(json);
    console.log(
      `${cfg.name.padEnd(6)} <- ${cfg.file}  ${json.duration.toFixed(2)}s  ${frames.length} frames  ` +
        `${json.tracks.length} tracks  yaw ${((yaw * 180) / Math.PI).toFixed(0)}°  ${note}`
    );
    console.log(`         ${handReport(json, tgt)}`);
  }

  const out = { version: 1, fps: FPS, credit: CREDIT, clips };
  fs.writeFileSync(OUT_FILE, JSON.stringify(out));
  const kb = (fs.statSync(OUT_FILE).size / 1024).toFixed(0);
  console.log(`\nWrote ${path.relative(ROOT, OUT_FILE)} (${kb} KB)`);
}

main();
