import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button/Button.jsx';

/** NotFound: shown for any URL that does not match a route. */
export default function NotFound() {
  return (
    <div className="page container not-found">
      <p className="not-found__code">404</p>
      <h1 className="page__title">Page not found</h1>
      <p className="page__subtitle">The page you are looking for does not exist or has been moved.</p>
      <Button to="/" icon={<ArrowLeft size={18} aria-hidden="true" />}>
        Back to Home
      </Button>
    </div>
  );
}
