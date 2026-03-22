import { useState } from 'react';
import { fabricOptions, colorOptions, priceRanges } from './data/products';

const COLOR_MAP = {
  Red: '#c0392b',
  White: '#f5f0e8',
  Blue: '#2c5f8a',
  Gold: '#c9993a',
  Green: '#2e6b4f',
  Pink: '#e08aaa',
  Orange: '#d4732a',
  Ivory: '#f5f0dc',
  Yellow: '#d4b83a',
  Beige: '#c9b49a',
  Purple: '#6b3a8a',
  Black: '#1a1a1a',
};

function Filters({ filters, onFilterChange, onReset }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleFabricToggle = (fabric) => {
    const updated = filters.fabrics.includes(fabric)
      ? filters.fabrics.filter((f) => f !== fabric)
      : [...filters.fabrics, fabric];

    onFilterChange({ ...filters, fabrics: updated });
  };

  const handleColorToggle = (color) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];

    onFilterChange({ ...filters, colors: updated });
  };

  const handlePriceChange = (label) => {
    onFilterChange({
      ...filters,
      priceRange: filters.priceRange === label ? null : label,
    });
  };

  const hasActiveFilters =
    filters.fabrics.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange !== null;

  return (
    <aside className="explore-sidebar">
      
      {/* Mobile Toggle Button */}
      <button
        className="mobile-filter-toggle"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-expanded={mobileOpen}
      >
        <span>⚙</span>
        {mobileOpen ? 'Hide Filters' : 'Show Filters'}
        {hasActiveFilters &&
          ` (${filters.fabrics.length + filters.colors.length + (filters.priceRange ? 1 : 0)})`}
      </button>

      {/* Filters Panel */}
      <div className={`filters-panel ${mobileOpen ? 'open' : ''}`}>
        
        {/* Header */}
        <div className="filters-header">
          <h3>Filter</h3>
          {hasActiveFilters && (
            <button className="filters-reset" onClick={onReset}>
              Reset
            </button>
          )}
        </div>

        {/* Price Range */}
        <div className="filter-group">
          <p className="filter-group-title">Price Range</p>
          {priceRanges.map((range) => (
            <label key={range.label} className="filter-option">
              <input
                type="radio"
                name="price"
                checked={filters.priceRange === range.label}
                onChange={() => handlePriceChange(range.label)}
              />
              {range.label}
            </label>
          ))}
        </div>

        {/* Fabric */}
        <div className="filter-group">
          <p className="filter-group-title">Fabric</p>
          {fabricOptions.map((fabric) => (
            <label key={fabric} className="filter-option">
              <input
                type="checkbox"
                checked={filters.fabrics.includes(fabric)}
                onChange={() => handleFabricToggle(fabric)}
              />
              {fabric}
            </label>
          ))}
        </div>

        {/* Color */}
        <div className="filter-group">
          <p className="filter-group-title">Color</p>
          {colorOptions.map((color) => (
            <label key={color} className="filter-option">
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={() => handleColorToggle(color)}
              />
              <span
                className="color-dot"
                style={{ backgroundColor: COLOR_MAP[color] || '#ccc' }}
              />
              {color}
            </label>
          ))}
        </div>

      </div>
    </aside>
  );
}

export default Filters;