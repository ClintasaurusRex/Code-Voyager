import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function StarField({ count = 2000 }) {
  const starsRef = useRef();

  const starsMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });
  }, []);

  const stars = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Random position in a sphere
      const radius = 20 + Math.random() * 150;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Random size between 0.1 and 0.5
      const size = 0.01 + Math.random() * 0.04;

      temp.push({ position: [x, y, z], size });
    }

    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      starsRef.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <group ref={starsRef}>
      {stars.map((star, i) => (
        <mesh key={i} position={star.position}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <primitive object={starsMaterial} />
        </mesh>
      ))}
    </group>
  );
}
export default StarField;
