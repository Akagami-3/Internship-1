import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard.jsx';
import projectData from '../data/projects.json';

/**
 * Projects
 * Loads project data from projects.json and renders one ProjectCard per entry.
 *
 * The data is put into state inside useEffect to demonstrate the usual
 * "load data on mount" pattern. With a real API this is where fetch() would go.
 */
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProjects(projectData);
    setIsLoading(false);
  }, []);

  return (
    <div className="page container">
      <header className="page__head">
        <p className="section__eyebrow">What I have built</p>
        <h1 className="page__title">Projects</h1>
        <p className="page__subtitle">A collection of web apps and experiments, from AI tools to everyday utilities.</p>
      </header>

      {isLoading ? (
        <p className="status-text" role="status">
          Loading projects...
        </p>
      ) : (
        <div className="grid grid--cards">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              github={project.github}
              live={project.live}
              sample={project.sample}
              delay={index * 100}
            />
          ))}
        </div>
      )}
    </div>
  );
}
