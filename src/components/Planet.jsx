import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import * as THREE from "three";

function Planet({ position, size = 1, texturePath, rotationSpeed = 0.01, onClick, name }) {
  const meshRef = useRef();
  // Use useTexture hook to load the texture
  const texture = useTexture(texturePath);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} metalness={0.2} roughness={0.8} />
      </mesh>
      <Html position={[0, size + 0.5, 0]} center>
        <div className="planet-label">{name}</div>
      </Html>
    </group>
  );
}

export default Planet;
