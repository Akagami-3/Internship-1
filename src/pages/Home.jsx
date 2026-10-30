import { ArrowRight, ChevronDown, Download, Mail, MapPin, GraduationCap } from 'lucide-react';
import Button from '../components/Button/Button.jsx';
import ProjectCard from '../components/ProjectCard/ProjectCard.jsx';
import BlogCard from '../components/BlogCard/BlogCard.jsx';
import useTypewriter from '../hooks/useTypewriter.js';
import { profile, typingWords } from '../data/profile.js';
import projects from '../data/projects.json';
import posts from '../data/posts.json';
import avatar from '../assets/avatar.svg';

// How many items to preview on the Home page.
const FEATURED_COUNT = 3;

/**
 * Home
 * Hero section (typing animation, fade-in, scroll indicator) followed by
 * a small preview of the latest projects and blog posts.
 */
export default function Home() {
  const typedText = useTypewriter(typingWords);

  // Real (non-sample) projects first, then the newest blog posts.
  const featuredProjects = [...projects].sort((a, b) => Number(a.sample) - Number(b.sample)).slice(0, FEATURED_COUNT);
  const latestPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, FEATURED_COUNT);

  const scrollToHighlights = () => {
    document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true">
          <span className="hero__blob hero__blob--1" />
          <span className="hero__blob hero__blob--2" />
          <span className="hero__blob hero__blob--3" />
        </div>

        <div className="container hero__inner">
          <div className="hero__content">
            <p className="hero__greeting fade-in" style={{ '--delay': '100ms' }}>
              Hello, I&apos;m
            </p>
            <h1 id="hero-title" className="hero__name fade-in" style={{ '--delay': '250ms' }}>
              {profile.name}
            </h1>

            <p className="hero__role fade-in" style={{ '--delay': '400ms' }}>
              {/* Screen readers get the static role; the animated text is hidden from them. */}
              <span className="sr-only">{profile.shortRole}</span>
              <span className="hero__typed" aria-hidden="true">
                {typedText}
              </span>
              <span className="hero__cursor" aria-hidden="true" />
            </p>

            <p className="hero__intro fade-in" style={{ '--delay': '550ms' }}>
              {profile.intro}
            </p>

            <ul className="hero__facts fade-in" style={{ '--delay': '650ms' }}>
              <li>
                <GraduationCap size={16} aria-hidden="true" /> {profile.college}
              </li>
              <li>
                <MapPin size={16} aria-hidden="true" /> {profile.location}
              </li>
            </ul>

            <div className="hero__actions fade-in" style={{ '--delay': '750ms' }}>
              <Button href={profile.resumeUrl} download icon={<Download size={18} aria-hidden="true" />}>
                Download Resume
              </Button>
              <Button to="/contact" variant="secondary" icon={<Mail size={18} aria-hidden="true" />}>
                Contact Me
              </Button>
            </div>
          </div>

          <div className="hero__visual fade-in" style={{ '--delay': '400ms' }}>
            <div className="hero__avatar-ring">
              <img src={avatar} alt="Profile placeholder for Aditya" className="hero__avatar" width="320" height="320" />
            </div>
          </div>
        </div>

        <button type="button" className="scroll-indicator" onClick={scrollToHighlights} aria-label="Scroll down to highlights">
          <span>Scroll</span>
          <ChevronDown size={22} aria-hidden="true" />
        </button>
      </section>

      <section id="highlights" className="section container" aria-labelledby="featured-projects-title">
        <header className="section__head">
          <div>
            <p className="section__eyebrow">Selected work</p>
            <h2 id="featured-projects-title" className="section__title">
              Featured Projects
            </h2>
          </div>
          <Button to="/projects" variant="ghost" size="sm" icon={<ArrowRight size={16} aria-hidden="true" />}>
            View all
          </Button>
        </header>

        <div className="grid grid--cards">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              github={project.github}
              live={project.live}
              sample={project.sample}
              delay={index * 120}
            />
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="latest-posts-title">
        <header className="section__head">
          <div>
            <p className="section__eyebrow">From the blog</p>
            <h2 id="latest-posts-title" className="section__title">
              Latest Posts
            </h2>
          </div>
          <Button to="/blog" variant="ghost" size="sm" icon={<ArrowRight size={16} aria-hidden="true" />}>
            Read blog
          </Button>
        </header>

        <div className="grid grid--cards">
          {latestPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              title={post.title}
              category={post.category}
              author={post.author}
              date={post.date}
              description={post.description}
              image={post.image}
              readTime={post.readTime}
              delay={index * 120}
            />
          ))}
        </div>
      </section>
    </>
  );
}
