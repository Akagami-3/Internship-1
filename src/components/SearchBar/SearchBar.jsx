import { Search, X } from 'lucide-react';
import './SearchBar.css';

/**
 * SearchBar (controlled input)
 * The parent owns the text, so the blog list can update on every keystroke.
 *
 * Props:
 *   value        current search text
 *   onChange     called with the new text
 *   placeholder  hint text
 */
export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="search-bar" role="search">
      <Search size={18} className="search-bar__icon" aria-hidden="true" />
      <input
        type="search"
        className="search-bar__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {value && (
        <button type="button" className="search-bar__clear" onClick={() => onChange('')} aria-label="Clear search">
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
