import { Target, Lightbulb, User } from 'lucide-react';
import Card from '../components/Card/Card.jsx';
import SkillCard from '../components/SkillCard/SkillCard.jsx';
import { profile, skills, interests } from '../data/profile.js';

/**
 * About
 * About me, career objective, skill cards with progress bars, and interests.
 */
export default function About() {
  return (
    <div className="page container">
      <header className="page__head">
        <p className="section__eyebrow">Who I am</p>
        <h1 className="page__title">About Me</h1>
        <p className="page__subtitle">{profile.role}</p>
      </header>

      <div className="about-grid">
        <Card as="section" className="about-card" aria-labelledby="about-me-title">
          <span className="about-card__icon">
            <User size={22} aria-hidden="true" />
          </span>
          <h2 id="about-me-title" className="about-card__title">
            About Me
          </h2>
          <p>{profile.about}</p>
        </Card>

        <Card as="section" className="about-card" aria-labelledby="objective-title">
          <span className="about-card__icon">
            <Target size={22} aria-hidden="true" />
          </span>
          <h2 id="objective-title" className="about-card__title">
            Career Objective
          </h2>
          <p>{profile.careerObjective}</p>
        </Card>
      </div>

      <section className="section" aria-labelledby="skills-title">
        <header className="section__head">
          <div>
            <p className="section__eyebrow">What I work with</p>
            <h2 id="skills-title" className="section__title">
              Skills
            </h2>
          </div>
        </header>

        <ul className="grid grid--skills">
          {skills.map((skill, index) => (
            <SkillCard key={skill.id} title={skill.title} icon={skill.icon} level={skill.level} delay={index * 80} />
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="interests-title">
        <header className="section__head">
          <div>
            <p className="section__eyebrow">Outside the code</p>
            <h2 id="interests-title" className="section__title">
              Interests
            </h2>
          </div>
        </header>

        <Card className="interests-card" hoverable={false}>
          <span className="about-card__icon">
            <Lightbulb size={22} aria-hidden="true" />
          </span>
          <ul className="chip-list chip-list--lg">
            {interests.map((interest) => (
              <li key={interest} className="chip">
                {interest}
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
