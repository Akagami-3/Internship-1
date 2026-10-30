import { Mail, MapPin, GraduationCap } from 'lucide-react';
import Card from '../components/Card/Card.jsx';
import ContactForm from '../components/ContactForm/ContactForm.jsx';
import { SocialIcon } from '../components/Icons/BrandIcons.jsx';
import { profile, socials } from '../data/profile.js';

// The form is described as data, so ContactForm stays reusable.
const CONTACT_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your full name', required: true, minLength: 2, autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true, autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this about?', required: true, minLength: 3 },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Write your message here...', required: true, minLength: 10 },
];

/**
 * Contact
 * Contact details + the reusable validated form.
 */
export default function Contact() {
  const email = socials.find((item) => item.id === 'email');

  return (
    <div className="page container">
      <header className="page__head">
        <p className="section__eyebrow">Let&apos;s talk</p>
        <h1 className="page__title">Contact</h1>
        <p className="page__subtitle">Have a project idea, a question or a hackathon team to join? I would love to hear from you.</p>
      </header>

      <div className="contact-layout">
        <ContactForm fields={CONTACT_FIELDS} />

        <aside className="contact-info" aria-label="Contact details">
          <Card hoverable={false}>
            <h2 className="sidebar-title">Get in touch</h2>
            <ul className="info-list">
              {email && (
                <li>
                  <Mail size={18} aria-hidden="true" />
                  <a href={email.href}>{email.href.replace('mailto:', '')}</a>
                </li>
              )}
              <li>
                <MapPin size={18} aria-hidden="true" />
                <span>{profile.location}</span>
              </li>
              <li>
                <GraduationCap size={18} aria-hidden="true" />
                <span>{profile.college}</span>
              </li>
            </ul>
          </Card>

          <Card hoverable={false}>
            <h2 className="sidebar-title">Find me online</h2>
            <ul className="info-socials">
              {socials
                .filter((item) => item.id !== 'email')
                .map((social) => (
                  <li key={social.id}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="info-social">
                      <SocialIcon name={social.id} size={18} />
                      <span>{social.label}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
