import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import useTheme from './hooks/useTheme.js';
import { profile, navLinks, socials } from './data/profile.js';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Education from './pages/Education.jsx';
import Projects from './pages/Projects.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * ScrollToTop
 * React Router changes the page without a browser reload, so the scroll
 * position would otherwise stay where it was. This resets it on every route change.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

/**
 * App
 * Owns the theme state and lays out Header + page content + Footer.
 */
export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <ScrollToTop />
      <Header
        brandName={profile.name}
        links={navLinks}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="app__main" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer name={profile.name} quickLinks={navLinks} socials={socials} />
    </div>
  );
}
