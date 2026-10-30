import { ExternalLink } from 'lucide-react';
import Card from '../Card/Card.jsx';
import Button from '../Button/Button.jsx';
import { GithubIcon } from '../Icons/BrandIcons.jsx';
import './ProjectCard.css';

/**
 * ProjectCard
 * Displays one project. All content arrives through props (loaded from projects.json).
 *
 * Props:
 *   title, description, image
 *   technologies  array of strings shown as chips
 *   github        repository URL
 *   live          live demo URL (when empty, the Live Demo button is disabled)
 *   sample        when true, a "Sample" badge is shown (conditional rendering)
 *   delay         animation delay in ms
 */
export default function ProjectCard({ title, description, image, technologies = [], github, live, sample = false, delay = 0 }) {
  return (
    <Card as="article" padded={false} className="project-card" style={{ '--delay': `${delay}ms` }}>
      <div className="project-card__media">
        <img src={image} alt={`${title} preview`} loading="lazy" width="800" height="480" />
        {sample && <span className="project-card__badge">Sample</span>}
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>

        <ul className="chip-list" aria-label={`${title} technologies`}>
          {technologies.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        <div className="project-card__actions">
          <Button
            href={github}
            external
            variant="ghost"
            size="sm"
            icon={<GithubIcon size={16} />}
            disabled={!github}
          >
            GitHub
          </Button>
          <Button
            href={live}
            external
            size="sm"
            icon={<ExternalLink size={16} aria-hidden="true" />}
            disabled={!live}
            title={live ? 'Open live demo' : 'Live demo coming soon'}
          >
            Live Demo
          </Button>
        </div>
      </div>
    </Card>
  );
}
