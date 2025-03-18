import React, { useRef, useState } from "react";
import { useTexture, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Bar_Menu() {
  const texture = useTexture("public/Menu/Menu.jpg");
  const barMenu = useRef();
  const [showButton, setShowButton] = useState(false);

  useFrame(({ camera }) => {
    if (barMenu.current) {
      const targetPosition = new THREE.Vector3(5.6, 0.5, -6);
      const distance = camera.position.clone().setY(0).distanceTo(targetPosition.setY(0)); // Ignore Y-axis

      const triggerDistance = 4;
      setShowButton(distance < triggerDistance);
    }
  });

  return (
    <group ref={barMenu}>
      {/* 3D Object */}
      <mesh position={[5, 0.5, -18]} rotation-y={Math.PI}>
        <planeGeometry args={[2.3, 3]} />
        <meshBasicMaterial map={texture} side={2} />
      </mesh>

      {/* Overlay Button (Using <Html> from drei) */}
      {showButton && (
        <Html position={[5.6, 1.5, -6]} center>
          <button
            onClick={() => alert("Button Clicked!")}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            Open Menu
          </button>
        </Html>
      )}
    </group>
  );
}
