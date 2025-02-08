// import { useEffect, useState } from "react";
import "./MatrixAnimation.css";
import useMatrixAnimation from "../hooks/useMatrixAnimation";

const MatrixAnimation = () => {
  const { messages, messageIndex } = useMatrixAnimation();

  return (
    <div className="matrix-container">
      <div
        className="matrix-text typing"
        key={messageIndex} //  This forces re-render for each new message
      >
        {messages[messageIndex]}
      </div>
    </div>
  );
};

export default MatrixAnimation;
