import { useProgress, Html } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loading">
        <div>{progress.toFixed(0)}% loaded</div>
      </div>
    </Html>
  );
}

export default Loader;
