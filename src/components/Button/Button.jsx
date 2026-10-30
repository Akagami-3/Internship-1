import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Button
 * One reusable button that can render as:
 *   - a React Router <Link>   (when `to` is given)
 *   - a normal <a> link        (when `href` is given)
 *   - a real <button>          (otherwise)
 *
 * Props:
 *   variant   'primary' | 'secondary' | 'ghost'
 *   size      'md' | 'sm'
 *   icon      optional icon element shown before the label
 *   disabled  renders a non-clickable button-like element
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  to,
  href,
  download,
  external = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${disabled ? 'btn--disabled' : ''} ${className}`.trim();

  const content = (
    <>
      {icon && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
    </>
  );

  // Disabled state: render a span so it cannot be clicked or focused as a link.
  if (disabled && (to || href)) {
    return (
      <span className={classes} aria-disabled="true" {...rest}>
        {content}
      </span>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
