import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
    </div>
  );
};

export default ProjectCard;
