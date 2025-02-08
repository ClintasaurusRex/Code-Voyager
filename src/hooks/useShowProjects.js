import { useState, useEffect } from "react";

const useShowProjects = () => {
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProjects(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);
  return showProjects;
};

export default useShowProjects;
