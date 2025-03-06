import React, { useState, useRef, useEffect, Suspense, lazy } from "react";

import Loader from "../components/loaders/Loader";

import { Text3D, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

import CameraControl from "../components/camera/CameraControl";
import StarField from "../components/StarField";
import Planet from "../components/Planet";
import OrbitingPlanet from "../components/planets/OrbitingPlanet";
import SimplePlanet from "../components/planets/SimplePlanet";
import ErrorBoundary from "../components/errors/ErrorBoundary";

const Contact = lazy(() => import("../components/Contact"));
const ProjectGrid = lazy(() => import("../components/ProjectGrid"));

// Import data
import paragraphs from "../../data/about";
function MainScene() {
  const [activePlanet, setActivePlanet] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([20, 20, 100]);
  const nameTextRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanetClick = (planetName, viewPosition) => {
    setActivePlanet(planetName);
    setCameraPosition(viewPosition);
  };

  useEffect(() => {
    window.onModalStateChange = (isOpen) => {
      setIsModalOpen(isOpen);
    };

    return () => {
      window.onModalStateChange = null;
    };
  }, []);

  return (
    <>
      <CameraControl makeDefault position={cameraPosition} fov={95} near={0.1} far={1000} />
      <ambientLight intensity={0.9} />
      <pointLight position={[0, 0, 0]} intensity={200.5} color="#f8e3c9" />
      <StarField />

      {/* Central name/logo */}
      <group position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[5, 32, 32]} />
          <meshStandardMaterial emissive="#f5c542" emissiveIntensity={1} color="#f8e3c9" />
        </mesh>
        <Text3D
          ref={nameTextRef}
          position={[-10, 10, 0]}
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
        <OrbitingPlanet orbitRadius={15} orbitSpeed={0.05} orbitOffset={0} yOffset={5}>
          <Planet
            position={[0, -5, 0]}
            size={2.2}
            texturePath="/textures/earth_atmos_2048.jpg"
            rotationSpeed={0.01}
            onClick={() => handlePlanetClick("About", [0, 0, 50])}
            name="About Me"
            nameOffset={2.5}
            emissiveIntensity={10.5}
            brightness={10.5}
          />
        </OrbitingPlanet>
      </ErrorBoundary>

      {/* Projects planet */}
      <ErrorBoundary fallback={<SimplePlanet position={[-10, 2, 5]} size={1.8} name="Projects" />}>
        <OrbitingPlanet orbitRadius={30} orbitSpeed={0.03} orbitOffset={2} yOffset={0}>
          <Planet
            position={[0, 10, 0]}
            size={3.8}
            texturePath="/textures/2k_jupiter.jpg"
            rotationSpeed={0.019}
            nameOffset={2.5}
            onClick={() => handlePlanetClick("Projects", [0, 0, 50])}
            name="Project"
          />
        </OrbitingPlanet>
      </ErrorBoundary>

      {/* Contact planet */}
      <ErrorBoundary fallback={<SimplePlanet position={[5, -8, -4]} size={1.0} name="Contact" />}>
        <OrbitingPlanet orbitRadius={20} orbitSpeed={0.07} orbitOffset={4} yOffset={-10}>
          <Planet
            position={[0, 0, 0]}
            size={2.0}
            texturePath="/textures/2k_mars.jpg"
            rotationSpeed={0.01}
            onClick={() => handlePlanetClick("Contact", [0, 0, 50])}
            name="Contact"
            nameOffset={2.5}
          />
        </OrbitingPlanet>
      </ErrorBoundary>

      {/* Content sections */}
      {activePlanet && (
        <Html
          position={[
            cameraPosition[0] * 0.01 - 1,
            cameraPosition[1] * 0.01 + 1,
            cameraPosition[2] * 0.01,
          ]}
          transform
          distanceFactor={25}
        >
          <div className="content-container">
            <div className="content-panel">
              <h2>{activePlanet}</h2>
              {activePlanet === "About" && (
                <div className="content-panel-body about-panel">
                  <p>{paragraphs}</p>
                </div>
              )}
              {activePlanet === "Projects" && (
                <div className="content-panel-body projects-panel">
                  <Suspense fallback={<div className="loading">Loading... </div>}>
                    <ProjectGrid />
                  </Suspense>
                </div>
              )}
              {activePlanet === "Contact" && (
                <div className="content-panel-body">
                  <Suspense fallback={<div className="loading">Loading contact...</div>}>
                    <Contact />
                    <p>Get in touch via email or social media...</p>
                  </Suspense>
                </div>
              )}
            </div>

            {/* Button */}
            {activePlanet && !isModalOpen && (
              <button className="floating-button" onClick={() => setActivePlanet(null)}>
                Back to Space
              </button>
            )}
          </div>
        </Html>
      )}

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        maxDistance={30}
        minDistance={5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

export default MainScene;
