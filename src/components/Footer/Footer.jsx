import { Link } from 'react-router-dom';
import { SocialIcon } from '../Icons/BrandIcons.jsx';
import './Footer.css';

/**
 * Footer
 * Shows the brand, quick links, social links and the copyright line.
 *
 * Props:
 *   name        owner name (used in the brand and the copyright line)
 *   quickLinks  [{ to, label }]
 *   socials     [{ id, label, href }]   id is one of github | linkedin | instagram | email
 */
export default function Footer({ name, quickLinks, socials }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-mark">{name.charAt(0)}</span>
            {name}
          </Link>
          <p className="footer__tagline">
            Building modern web experiences, one project at a time.
          </p>
        </div>

        <nav className="footer__col" aria-label="Quick links">
          <h2 className="footer__heading">Quick Links</h2>
          <ul className="footer__list">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">Connect</h2>
          <ul className="footer__socials">
            {socials.map((social) => {
              const isMail = social.href.startsWith('mailto:');
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    className="footer__social"
                    aria-label={social.label}
                    title={social.label}
                    {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <SocialIcon name={social.id} size={20} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          &copy; {year} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
