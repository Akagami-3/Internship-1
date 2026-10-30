import { useState, useEffect, useRef } from 'react';
import { Mail, Check } from 'lucide-react';
import Card from '../Card/Card.jsx';
import Button from '../Button/Button.jsx';
import './Newsletter.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter
 * A small subscription form with a controlled email input and validation.
 * There is no backend in this project, so "subscribing" only shows a success
 * message. Connect `onSubscribe` to a real service (Mailchimp, Formspree, ...) later.
 *
 * Props:
 *   title, description  text shown above the form
 *   onSubscribe         optional callback that receives the email address
 */
export default function Newsletter({
  title = 'Subscribe to the newsletter',
  description = 'Get new posts in your inbox. No spam, ever.',
  onSubscribe,
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const resetTimer = useRef(null);

  // Clear the pending timer if the component unmounts.
  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setError('Please enter your email address.');
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    if (typeof onSubscribe === 'function') onSubscribe(value);
    setSubscribed(true);
    setEmail('');

    // Hide the success message after a few seconds.
    resetTimer.current = setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <Card as="section" className="newsletter" hoverable={false} aria-labelledby="newsletter-title">
      <span className="newsletter__icon">
        <Mail size={22} aria-hidden="true" />
      </span>
      <h3 id="newsletter-title" className="newsletter__title">
        {title}
      </h3>
      <p className="newsletter__desc">{description}</p>

      {subscribed ? (
        <p className="newsletter__success" role="status">
          <Check size={18} aria-hidden="true" /> Thanks for subscribing!
        </p>
      ) : (
        <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            className={`newsletter__input ${error ? 'has-error' : ''}`}
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'newsletter-error' : undefined}
          />
          {error && (
            <p id="newsletter-error" className="newsletter__error" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" size="sm">
            Subscribe
          </Button>
        </form>
      )}
    </Card>
  );
}
