import { useEffect, useState } from "react";

// Custom hook to handle the matrix animation

const useMatrixAnimation = () => {
  // State to keep track of the current message index
  // and the messages to display
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = ["Wake up, Neo......", "The Matrix has you"];

  // Use effect to update the message index every 4 seconds
  useEffect(() => {
    if (messageIndex < messages.length) {
      const timer = setTimeout(() => {
        setMessageIndex((prevIndex) => prevIndex + 1);
      }, 4000);
      return () => clearTimeout(timer); // Cleanup timeout (important!)
    }
  }, [messageIndex, messages.length]);
  return { messages, messageIndex };
};

export default useMatrixAnimation;
