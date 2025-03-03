import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, OrbitControls, PerspectiveCamera, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";

// Import components
import StarField from "./components/StarField";
import Planet from "./components/Planet";

// Loader for texture suspense
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

// ErrorFallback component
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

// Camera controls with smooth movement
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

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

function Scene() {
  const [activePlanet, setActivePlanet] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 40]);

  const handlePlanetClick = (planetName, viewPosition) => {
    setActivePlanet(planetName);
    setCameraPosition(viewPosition);
  };

  return (
    <>
      <CameraControl makeDefault position={cameraPosition} fov={75} near={0.1} far={1000} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />

      {/* Main light source (sun) */}
      <pointLight position={[0, 0, 0]} intensity={100.5} color="#f8e3c9" />

      {/* Dynamic star background */}
      <StarField />

      {/* Central name/logo */}
      <group position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[5, 32, 32]} />
          <meshStandardMaterial emissive="#f5c542" emissiveIntensity={1} color="#f8e3c9" />
        </mesh>

        <Text3D
          position={[0, 10, 0]}
          font={"/fonts/helvetiker_regular.typeface.json"}
          size={1.95}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.2}
          bevelSize={0.02}
        >
          Clint Arneson-Hiles
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </Text3D>
      </group>

      {/* Planets for different sections */}
      <ErrorBoundary fallback={<SimplePlanet position={[8, 0, 0]} size={1.2} name="About Me" />}>
        <Planet
          position={[18, 5, 0]}
          size={2.2}
          texturePath="/textures/earth_atmos_2048.jpg"
          rotationSpeed={0.005}
          onClick={() => handlePlanetClick("about", [6, 1, 5])}
          name="About Me"
        />
      </ErrorBoundary>

      <ErrorBoundary fallback={<SimplePlanet position={[-10, 2, 5]} size={1.8} name="Projects" />}>
        <Planet
          position={[-23, 2, 5]}
          size={3.8}
          texturePath="/textures/2k_jupiter.jpg"
          rotationSpeed={0.008}
          onClick={() => handlePlanetClick("projects", [-7, 2, 5])}
          name="Projects"
        />
      </ErrorBoundary>

      <ErrorBoundary fallback={<SimplePlanet position={[5, -8, -4]} size={1.0} name="Contact" />}>
        <Planet
          position={[15, -13, -4]}
          size={2.0}
          texturePath="/textures/2k_mars.jpg"
          rotationSpeed={0.01}
          onClick={() => handlePlanetClick("contact", [3, -5, 3])}
          name="Contact"
        />
      </ErrorBoundary>

      {/* Content sections - shown when planet is selected */}
      {activePlanet && (
        <Html
          position={[cameraPosition[0] * 0.5, cameraPosition[1] * 0.5, cameraPosition[2] * 0.5]}
          transform
          distanceFactor={5}
        >
          <div className="content-panel">
            <h2>{activePlanet}</h2>
            {activePlanet === "about" && (
              <div>
                <p>Software developer with a passion for 3D web experiences...</p>
                <button onClick={() => setActivePlanet(null)}>Back to Space</button>
              </div>
            )}
            {activePlanet === "projects" && (
              <div>
                <p>Check out my portfolio of web development projects...</p>
                <button onClick={() => setActivePlanet(null)}>Back to Space</button>
              </div>
            )}
            {activePlanet === "contact" && (
              <div>
                <p>Get in touch via email or social media...</p>
                <button onClick={() => setActivePlanet(null)}>Back to Space</button>
              </div>
            )}
          </div>
        </Html>
      )}

      {/* Allow limited orbit controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={30}
        minDistance={5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

// Fallback for planets when textures fail to load
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

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#000814",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Canvas style={{ position: "absolute" }}>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Scene />
          </ErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}
export default App;
