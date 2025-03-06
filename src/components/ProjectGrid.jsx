import React, { useState } from "react";
import { projects } from "../Projects/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "../Modal/ProjectModal";
import "./ProjectGrid.css";

const ProjectGrid = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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
