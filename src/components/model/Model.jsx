import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Model({
    scene,
    glbpath,
    options,
}) {
    const { receiveShadow, castShadow, scale, position, rotation } = options
  return new Promise((resolve, reject) => {
    // initiate a loader
    const loader = new GLTFLoader();
    // load a resource 
    loader.load(
        // resource URL
       glbpath,
    //    called when the resource is loaded
    ( gltf ) => {
        const model = gltf.scene
        model.name = 'sachin96Boy'
        model.position.set(...position)
        model.rotation.set(...rotation)
        model.scale.set(scale, scale, scale)
        model.receiveShadow = receiveShadow
        model.castShadow = castShadow
        scene.add(model)

        resolve(model)
    },
    // called while loading is progressing
    ( xhr ) => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    ( error ) => {
        console.log( 'An error happened', error );
        reject(error)
    }

    )
  });
}

export default Model