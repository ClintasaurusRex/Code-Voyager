import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

function SimplePlanet({ position, size, name }) {
  const meshRef = useRef();
  const color = new THREE.Color(
    0.5 + Math.random() * 0.5,
    0.5 + Math.random() * 0.5,
    0.5 + Math.random() * 0.5
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html position={[0, size + 0.5, 0]} center>
        <div className="planet-label">{name}</div>
      </Html>
    </group>
  );
}

export default SimplePlanet;
