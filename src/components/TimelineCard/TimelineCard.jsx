import { Calendar, Award, School } from 'lucide-react';
import Card from '../Card/Card.jsx';
import './TimelineCard.css';

/**
 * TimelineCard
 * One entry on the Education timeline.
 *
 * Props:
 *   title, subtitle, institute, year, score, description
 *   index   used to alternate left/right on large screens and to stagger animation
 */
export default function TimelineCard({ title, subtitle, institute, year, score, description, index = 0 }) {
  const side = index % 2 === 0 ? 'left' : 'right';

  return (
    <li
      className={`timeline-item timeline-item--${side}`}
      style={{ '--delay': `${index * 150}ms` }}
    >
      <span className="timeline-item__dot" aria-hidden="true" />

      <Card className="timeline-card">
        <span className="timeline-card__year">
          <Calendar size={14} aria-hidden="true" /> {year}
        </span>
        <h3 className="timeline-card__title">{title}</h3>
        {subtitle && <p className="timeline-card__subtitle">{subtitle}</p>}

        <p className="timeline-card__meta">
          <School size={16} aria-hidden="true" /> {institute}
        </p>
        <p className="timeline-card__meta timeline-card__score">
          <Award size={16} aria-hidden="true" /> {score}
        </p>

        <p className="timeline-card__desc">{description}</p>
      </Card>
    </li>
  );
}
