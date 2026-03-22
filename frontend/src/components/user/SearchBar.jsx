import "../styles/explore.css";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">⌕</span>

      <input
        type="text"
        placeholder="Search sarees..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search sarees"
      />

      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;