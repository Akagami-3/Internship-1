/**
 * profile.js
 * ----------------------------------------------------------------
 * Single source of truth for personal information.
 * Edit this file to update the Home, About, Education, Footer and
 * Contact pages without touching any component code.
 */

export const profile = {
  name: 'Aditya',
  role: 'First Year Information Technology Engineering Student | Aspiring Full Stack Developer',
  shortRole: 'Aspiring Full Stack Developer',
  college: 'Trinity Academy of Engineering, Pune',
  branch: 'Information Technology (IT)',
  location: 'Pune, Maharashtra, India',
  intro:
    'I build modern web applications with React and JavaScript, join hackathons, and keep learning new technologies every day.',
  about:
    'I am a passionate first-year Information Technology student with a strong interest in Full Stack Development, React, JavaScript, AI, Cloud Computing, and problem solving. I enjoy building modern web applications, participating in hackathons, and continuously learning new technologies. My goal is to become a skilled software engineer and secure a placement at a leading technology company.',
  careerObjective:
    'To build impactful software solutions, strengthen my development skills, contribute to innovative projects, and grow into a professional Full Stack Developer.',
  resumeUrl: '/resume.pdf',
};

/** Words cycled by the typing animation on the Home page. */
export const typingWords = [
  'Aspiring Full Stack Developer',
  'React Enthusiast',
  'Hackathon Participant',
  'Problem Solver',
];

/**
 * Social links.
 * TODO: replace the LinkedIn, Instagram and email values with your own.
 */
export const socials = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/staticflux-adi' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-username' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/your-username' },
  { id: 'email', label: 'Email', href: 'mailto:your.email@example.com' },
];

/**
 * Navigation. Used by both the Header and the Footer quick links.
 */
export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/education', label: 'Education' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

/**
 * Skills shown as cards on the About page.
 * `level` is a percentage used for the progress bar.
 * `icon` is a key understood by the SkillCard component.
 * Adjust the levels so they honestly reflect your own confidence.
 */
export const skills = [
  { id: 1, title: 'HTML5', icon: 'Globe', level: 90 },
  { id: 2, title: 'CSS3', icon: 'Palette', level: 85 },
  { id: 3, title: 'JavaScript', icon: 'Braces', level: 75 },
  { id: 4, title: 'React.js', icon: 'Atom', level: 70 },
  { id: 5, title: 'Vite', icon: 'Zap', level: 65 },
  { id: 6, title: 'Git & GitHub', icon: 'GitBranch', level: 70 },
  { id: 7, title: 'Python', icon: 'Terminal', level: 70 },
  { id: 8, title: 'C++', icon: 'Cpu', level: 60 },
  { id: 9, title: 'SQL', icon: 'Database', level: 60 },
  { id: 10, title: 'Responsive Web Design', icon: 'Smartphone', level: 85 },
];

/** Interests shown as chips on the About page. */
export const interests = [
  'Full Stack Development',
  'React',
  'JavaScript',
  'Artificial Intelligence',
  'Cloud Computing',
  'Problem Solving',
  'Hackathons',
];

/**
 * Education timeline (newest first).
 * TODO: add your school names and confirm the years.
 */
export const education = [
  {
    id: 1,
    title: 'Bachelor of Engineering',
    subtitle: 'Information Technology',
    institute: 'Trinity Academy of Engineering, Pune',
    year: '2026 – Present',
    score: 'Currently pursuing',
    description:
      'Studying core computer science and IT subjects while building real-world projects and taking part in hackathons.',
  },
  {
    id: 2,
    title: 'HSC (Science)',
    subtitle: 'Higher Secondary Certificate',
    institute: 'Junior College, Maharashtra',
    year: '2026',
    score: '84%',
    description:
      'Completed higher secondary education in the Science stream with Mathematics and Physics as the foundation for engineering.',
  },
  {
    id: 3,
    title: 'SSC',
    subtitle: 'Secondary School Certificate',
    institute: 'Secondary School, Maharashtra',
    year: '2024',
    score: '94%',
    description:
      'Completed secondary school with distinction and developed an early interest in computers and logical problem solving.',
  },
];
