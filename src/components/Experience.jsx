import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { useRef } from "react";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";
import { SpotLight } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'


const maps = {
  bar: {
    scale: 0.02,
    position: [10, -1, -20.5],
  },
};

export const Experience = () => {
  const shadowCameraRef = useRef();
  const pointRef = useRef();
  const ambientRef = useRef();
  const spotRef = useRef()

  const { map } = useControls("Map", {
    map: {
      value: "bar",
      options: Object.keys(maps),
    },
  });

  useControls('Point Light', {
    visible: {
      value: true,
      onChange: (v) => {
        pointRef.current.visible = v
      },
    },
    position: {
      x: 12,
      y: 30,
      z: 30,
      onChange: (v) => {
        pointRef.current.position.copy(v)
      },
    },
    color: {
      value: '#ff8e23',
      onChange: (v) => {
        pointRef.current.color = new THREE.Color(v)
      },
    },
    intensity:{
      value: 6,
      onChange: (v) => {
        pointRef.current.intensity = v
      },
    }
  })

  useControls('Ambient Light', {
    visible: {
      value: true,
      onChange: (v) => {
        ambientRef.current.visible = v
      },
    },
    color: {
      value: '#623c19',
      onChange: (v) => {
        ambientRef.current.color = new THREE.Color(v)
      },
    },
  })
  useControls('Spot Light', {
    visible: {
      value: false,
      onChange: (v) => {
        spotRef.current.visible = v
      },
    },
    position: {
      x: -6,
      y: 9.5,
      z: 0.4,
      onChange: (v) => {
        spotRef.current.position.copy(v)
      },
    },
    color: {
      value: '#ff8e23',
      onChange: (v) => {
        spotRef.current.color = new THREE.Color(v)
      },
    },
    intensity:{
      value: 1.5,
      onChange: (v) => {
        pointRef.current.intensity = v
      },
    }
  })

  return (
    <>
      {/* <OrbitControls /> */}
      <Environment preset="sunset" />
      <pointLight ref={pointRef} />
      <ambientLight ref={ambientRef} />
      <spotLight ref={spotRef} />
      <directionalLight
        intensity={0.5}
        castShadow
        position={[20,-68, 1.5]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>
      <Physics key={map}>
        <Map
          scale={maps[map].scale}
          position={maps[map].position}
          model={`models/${map}.glb`}
        />
        <CharacterController />
      </Physics>
    </>
  );
};
