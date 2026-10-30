import { Calendar, User, Clock } from 'lucide-react';
import Card from '../Card/Card.jsx';
import './BlogCard.css';

/** Turns "2026-10-24" into "24 Oct 2026". Falls back to the raw text if the date is invalid. */
export function formatDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * BlogCard
 * Displays one blog post.
 *
 * Props:
 *   title, category, author, date, description, image
 *   readTime  optional reading time in minutes
 *   delay     animation delay in ms
 */
export default function BlogCard({ title, category, author, date, description, image, readTime, delay = 0 }) {
  return (
    <Card as="article" padded={false} className="blog-card" style={{ '--delay': `${delay}ms` }}>
      <div className="blog-card__media">
        <img src={image} alt={`Cover for ${title}`} loading="lazy" width="800" height="480" />
        <span className="blog-card__category">{category}</span>
      </div>

      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span>
            <User size={14} aria-hidden="true" /> {author}
          </span>
          <span>
            <Calendar size={14} aria-hidden="true" /> {formatDate(date)}
          </span>
          {readTime && (
            <span>
              <Clock size={14} aria-hidden="true" /> {readTime} min read
            </span>
          )}
        </div>

        <h3 className="blog-card__title">{title}</h3>
        <p className="blog-card__desc">{description}</p>
      </div>
    </Card>
  );
}
