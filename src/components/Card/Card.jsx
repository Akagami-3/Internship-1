import './Card.css';

/**
 * Card
 * A generic glassmorphism container. Other components (ProjectCard, BlogCard,
 * SkillCard, ...) wrap their content in it so the look stays consistent.
 *
 * Props:
 *   as         HTML tag to render ('div', 'article', 'li', ...)
 *   hoverable  lifts the card on hover when true
 *   padded     adds inner padding when true
 */
export default function Card({
  as: Tag = 'div',
  children,
  hoverable = true,
  padded = true,
  className = '',
  ...rest
}) {
  const classes = `card ${hoverable ? 'card--hoverable' : ''} ${padded ? 'card--padded' : ''} ${className}`.trim();

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
