import './CategoryFilter.css';

/**
 * CategoryFilter
 * A row of pill buttons. Clicking one tells the parent which category is active.
 *
 * Props:
 *   categories  array of category names (e.g. ['All', 'React', ...])
 *   active      the currently selected category
 *   onChange    called with the clicked category
 *   counts      optional object { React: 3, ... } to show a count badge
 */
export default function CategoryFilter({ categories, active, onChange, counts = {} }) {
  return (
    <div className="category-filter" role="group" aria-label="Filter posts by category">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            className={`category-filter__btn ${isActive ? 'is-active' : ''}`}
            onClick={() => onChange(category)}
            aria-pressed={isActive}
          >
            {category}
            {counts[category] !== undefined && <span className="category-filter__count">{counts[category]}</span>}
          </button>
        );
      })}
    </div>
  );
}
