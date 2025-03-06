import { Html } from "@react-three/drei";

function ErrorFallback() {
  return (
    <Html center>
      <div className="loading error">
        <div>Error loading 3D content</div>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    </Html>
  );
}

export default ErrorFallback;
