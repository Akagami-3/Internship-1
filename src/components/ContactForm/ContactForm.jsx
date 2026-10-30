import { useState, useEffect, useRef } from 'react';
import { Send, Check } from 'lucide-react';
import Card from '../Card/Card.jsx';
import Button from '../Button/Button.jsx';
import './ContactForm.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validate one field. Returns an error message, or '' when the value is fine.
 * Keeping validation in a pure function makes it easy to read and to test.
 */
function validateField(field, rawValue) {
  const value = rawValue.trim();

  if (field.required && !value) {
    return `${field.label} is required.`;
  }
  if (field.type === 'email' && value && !EMAIL_PATTERN.test(value)) {
    return 'Please enter a valid email address.';
  }
  if (field.minLength && value && value.length < field.minLength) {
    return `${field.label} must be at least ${field.minLength} characters.`;
  }
  return '';
}

/** Build an object with one empty string per field, e.g. { name: '', email: '' } */
function buildEmptyValues(fields) {
  return fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
}

/**
 * ContactForm
 * A reusable, fully controlled form. The fields are described by the `fields`
 * prop, so the same component can build any simple form.
 *
 * Props:
 *   fields     [{ name, label, type, placeholder, required, minLength }]
 *              type can be 'text', 'email' or 'textarea'
 *   onSubmit   optional callback that receives the form values after validation passes
 *   title      heading shown above the form
 */
export default function ContactForm({ fields, onSubmit, title = 'Send me a message' }) {
  const [values, setValues] = useState(() => buildEmptyValues(fields));
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'
  const timerRef = useRef(null);

  // Clear any pending timer when the component unmounts.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));

    // Once a field has been visited, re-validate it live so the error disappears as soon as it is fixed.
    if (touched[name]) {
      const field = fields.find((item) => item.name === name);
      setErrors((current) => ({ ...current, [name]: validateField(field, value) }));
    }
    if (status === 'success') setStatus('idle');
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const field = fields.find((item) => item.name === name);
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validateField(field, value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate every field at once.
    const nextErrors = {};
    fields.forEach((field) => {
      nextErrors[field.name] = validateField(field, values[field.name]);
    });
    const allTouched = fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {});

    setErrors(nextErrors);
    setTouched(allTouched);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    // There is no backend here, so we simulate a short network delay.
    setStatus('sending');
    timerRef.current = setTimeout(() => {
      if (typeof onSubmit === 'function') onSubmit(values);
      setValues(buildEmptyValues(fields));
      setErrors({});
      setTouched({});
      setStatus('success');
    }, 900);
  };

  return (
    <Card as="section" className="contact-form" hoverable={false} aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" className="contact-form__title">
        {title}
      </h2>

      {status === 'success' && (
        <p className="contact-form__success" role="status">
          <Check size={20} aria-hidden="true" />
          Thank you! Your message has been sent successfully. I will get back to you soon.
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {fields.map((field) => {
          const errorId = `${field.name}-error`;
          const showError = touched[field.name] && errors[field.name];
          const commonProps = {
            id: field.name,
            name: field.name,
            value: values[field.name],
            onChange: handleChange,
            onBlur: handleBlur,
            placeholder: field.placeholder,
            className: `contact-form__control ${showError ? 'has-error' : ''}`,
            'aria-invalid': Boolean(showError),
            'aria-describedby': showError ? errorId : undefined,
            'aria-required': field.required,
          };

          return (
            <div className="contact-form__group" key={field.name}>
              <label htmlFor={field.name} className="contact-form__label">
                {field.label}
                {field.required && <span aria-hidden="true"> *</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea rows={6} {...commonProps} />
              ) : (
                <input type={field.type} autoComplete={field.autoComplete} {...commonProps} />
              )}

              {showError && (
                <p id={errorId} className="contact-form__error" role="alert">
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        })}

        <Button type="submit" icon={<Send size={18} aria-hidden="true" />} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Card>
  );
}
