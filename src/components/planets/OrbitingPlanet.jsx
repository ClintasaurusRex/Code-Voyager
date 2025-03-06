import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

function OrbitingPlanet({ orbitRadius, orbitSpeed, orbitOffset = 0, yOffset = 0, children }) {
  const groupRef = useRef();
  const [angle, setAngle] = useState(orbitOffset);

  useFrame((state, delta) => {
    setAngle((prev) => prev + orbitSpeed * delta);
    if (groupRef.current) {
      const x = Math.sin(angle) * orbitRadius;
      const z = Math.cos(angle) * orbitRadius;
      groupRef.current.position.x = x;
      groupRef.current.position.y = yOffset;
      groupRef.current.position.z = z;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default OrbitingPlanet;
