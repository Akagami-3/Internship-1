import TimelineCard from '../components/TimelineCard/TimelineCard.jsx';
import { education } from '../data/profile.js';

/**
 * Education
 * Vertical timeline built from the `education` array (list rendering).
 */
export default function Education() {
  return (
    <div className="page container">
      <header className="page__head">
        <p className="section__eyebrow">My journey</p>
        <h1 className="page__title">Education</h1>
        <p className="page__subtitle">From school to engineering: the steps that shaped my path into technology.</p>
      </header>

      <ol className="timeline" aria-label="Education timeline">
        {education.map((item, index) => (
          <TimelineCard
            key={item.id}
            index={index}
            title={item.title}
            subtitle={item.subtitle}
            institute={item.institute}
            year={item.year}
            score={item.score}
            description={item.description}
          />
        ))}
      </ol>
    </div>
  );
}
