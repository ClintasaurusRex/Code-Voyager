import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

function CameraControl({ targetPosition, ...props }) {
  const cameraRef = useRef();

  useFrame(({ camera }) => {
    if (targetPosition && cameraRef.current) {
      camera.position.lerp(targetPosition, 0.03);
      camera.lookAt(0, 0, 0);
    }
  });

  return <PerspectiveCamera ref={cameraRef} {...props} />;
}

export default CameraControl;
