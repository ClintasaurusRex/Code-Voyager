// src/Pages/Projects.jsx
import './Projects.css';
import ProjectGrid from '../components/ProjectGrid';
import useTypingEffect from '../hooks/typingEffect';
import useShowProjects from '../hooks/useShowProjects';
import React from 'react';
const Projects = () => {
  const typedText = useTypingEffect('Projects....');
  const showProjects = useShowProjects();
  return (
    <div data-testid='projects-container' className='fade-in'>
      <h1 className='project-text'>{typedText}</h1>
      {showProjects && <ProjectGrid />}
    </div>
  );
};

export default Projects;
