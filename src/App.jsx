import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";

import Loader from "./components/loaders/Loader";
import ErrorFallback from "./components/errors/ErrorFallback";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import MainScene from "./scenes/MainScene";
import CursorBubble from "./components/CursorBubble";

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
      <CursorBubble />
      <Canvas style={{ position: "absolute" }}>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <MainScene />
          </ErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
