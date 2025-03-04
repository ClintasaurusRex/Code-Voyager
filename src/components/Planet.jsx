import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import * as THREE from "three";

function Planet({
  position,
  size = 1,
  texturePath,
  rotationSpeed = 0.01,
  onClick,
  name,
  nameOffset,
  nameClassName,
}) {
  const meshRef = useRef();

  // Load the texture with useTexture
  // The key is to use it directly without conditional logic during render
  const texture = useTexture(texturePath);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });
  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} metalness={0.2} roughness={0.8} />
      </mesh>

      <Html position={[0, size + (nameOffset || 1), 0]} center>
        <div className={nameClassName || "planet-label"}>{name}</div>
      </Html>
    </group>
  );
}

export default Planet;
