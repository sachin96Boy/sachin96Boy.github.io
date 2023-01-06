import React, { useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Model from "./model";

function SachinBoy() {
  const refContainer = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [renderer, setRenderer] = React.useState(null);
  const [camera, setCamera] = React.useState(null);
  const [controls, setControls] = React.useState(null);
  const [target] = React.useState(new THREE.Vector3(0, 0, 0));
  const [initialCameraPosition] = React.useState(new THREE.Vector3(0, 0, 3));
  const [scene] = React.useState(new THREE.Scene());

  const handleWindowResize = useCallback(() => {
    if (camera === null || renderer === null) return;
    const width = refContainer.current.clientWidth;
    const height = refContainer.current.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
  }, [renderer]);

  const handlemousemove = useCallback(
    (e) => {
      if (camera === null) return;
      const mouse = new THREE.Vector2();
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        console.log(intersects[0].object.name);
      }
      controls.update();
    },
    [camera, scene]
  );

  React.useEffect(() => {
    const width = refContainer.current.clientWidth;
    const height = refContainer.current.clientHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    refContainer.current.appendChild(renderer.domElement);

    camera.position.copy(initialCameraPosition);
    camera.lookAt(target);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    controls.update();

    setRenderer(renderer);
    setCamera(camera);
    setControls(controls);

    const light = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(light);

    Model({
      scene,
      glbpath: "../../3delems/sachin96Boy.glb",
      options: {
        receiveShadow: true,
        castShadow: true,
        scale: 3,
        position: [0.7, -4, 0],
        rotation: [0, -0.4, 0],
      },
    })
      .then(() => {
        renderer.render(scene, camera);
        setLoading(false);
        renderer.dispose();
        controls.dispose();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousemove", (e) => {
      handlemousemove(e);
    });
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("mousemove", (e) => {
        handlemousemove(e);
      });
    };
  }, [renderer, handleWindowResize]);

  return (
    <div
      ref={refContainer}
      className="m-auto h-screen bg-gradient-to-r from-slate-400 to-slate-900 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-400 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
              <div className="animate-ping rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SachinBoy;
