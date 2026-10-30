import { useState, useEffect } from 'react';
import {
  Globe,
  Palette,
  Braces,
  Atom,
  Zap,
  GitBranch,
  Terminal,
  Cpu,
  Database,
  Smartphone,
  Code,
} from 'lucide-react';
import Card from '../Card/Card.jsx';
import './SkillCard.css';

// Maps the string `icon` stored in the data file to a real icon component.
const ICONS = { Globe, Palette, Braces, Atom, Zap, GitBranch, Terminal, Cpu, Database, Smartphone };

/**
 * SkillCard
 * Shows an icon, the skill title and an animated progress bar.
 *
 * Props:
 *   title  skill name
 *   icon   key from the ICONS map (falls back to a generic code icon)
 *   level  number from 0 to 100
 *   delay  animation delay in ms (used to stagger cards in a grid)
 */
export default function SkillCard({ title, icon, level, delay = 0 }) {
  const Icon = ICONS[icon] || Code;
  const safeLevel = Math.min(100, Math.max(0, Number(level) || 0));

  // The bar starts at 0% and grows to `level` after mount, so CSS can animate the width.
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(safeLevel), 150 + delay);
    return () => clearTimeout(timer);
  }, [safeLevel, delay]);

  return (
    <Card as="li" className="skill-card" style={{ '--delay': `${delay}ms` }}>
      <div className="skill-card__head">
        <span className="skill-card__icon">
          <Icon size={22} aria-hidden="true" />
        </span>
        <h3 className="skill-card__title">{title}</h3>
        <span className="skill-card__percent">{safeLevel}%</span>
      </div>

      <div
        className="skill-card__track"
        role="progressbar"
        aria-label={`${title} proficiency`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeLevel}
      >
        <div className="skill-card__bar" style={{ width: `${width}%` }} />
      </div>
    </Card>
  );
}
