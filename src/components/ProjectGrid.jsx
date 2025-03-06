import React, { useState, useEffect } from "react";
import { projects } from "../Projects/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "../Modal/ProjectModal";
import "../styles/ProjectGrid.css";

const ProjectGrid = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Add this function to notify parent components when modal state changes
  const onModalStateChange = window.onModalStateChange;

  useEffect(() => {
    // Call the notification function whenever modal state changes
    if (onModalStateChange) {
      onModalStateChange(selectedProject !== null);
    }
  }, [selectedProject]);

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
      ))}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default ProjectGrid;
