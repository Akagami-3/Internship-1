import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import './Header.css';

/**
 * Header
 * Sticky top bar with logo, navigation links, theme toggle and a mobile hamburger menu.
 *
 * Props:
 *   brandName       text shown next to the logo mark
 *   links           [{ to, label }] navigation items
 *   theme           'light' | 'dark'
 *   onToggleTheme   called when the theme button is clicked
 */
export default function Header({ brandName, links, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Add a stronger shadow once the page has been scrolled a little.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Let the Escape key close the mobile menu.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const isDark = theme === 'dark';

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="header__inner container">
        <Link to="/" className="header__logo" aria-label={`${brandName} - home`}>
          <span className="header__logo-mark">{brandName.charAt(0)}</span>
          <span className="header__logo-text">{brandName}</span>
        </Link>

        <nav
          id="primary-navigation"
          className={`header__nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Primary navigation"
        >
          <ul className="header__list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Light theme' : 'Dark theme'}
          >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>

          <button
            type="button"
            className="icon-btn header__burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
