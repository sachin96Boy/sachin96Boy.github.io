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
  const [initialCameraPosition] = React.useState(new THREE.Vector3(0, 0, 5));
  const [scene] = React.useState(new THREE.Scene());

  const handleWindowResize = useCallback(() => {
    const width = refContainer.current.clientWidth;
    const height = refContainer.current.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
  }, [renderer]);

  React.useEffect(() => {
    const width = refContainer.current.clientWidth;
    const height = refContainer.current.clientHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    refContainer.current.appendChild(renderer.domElement);

    camera.position.copy(initialCameraPosition);
    camera.lookAt(target);

    controls.update();

    setRenderer(renderer);
    setCamera(camera);
    setControls(controls);

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(light2);

    Model({
      scene,
      glbpath: "../../3delems/sachin96Boy.glb",
      options: {
        receiveShadow: true,
        castShadow: true,
        scale: 1,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
    })
      .then(() => {
        renderer.render(scene, camera);
        setLoading(false);
        renderer.dispose();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    }
  }, [renderer, handleWindowResize]);

  return (
    <div ref={refContainer} className="m-auto -mb-28 w-96 h-96 relative">
      <div className="absolute top-0 left-0 w-full h-full">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex justify-center items-center">
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
