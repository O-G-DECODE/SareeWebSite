import { useState, useMemo } from 'react';
import "../../components/styles/explore.css";

import { products, priceRanges } from './data/products';
import Header from './Header';
import Filters from './Filters';
import ProductList from './ProductList';

const DEFAULT_FILTERS = {
  priceRange: null,
  fabrics: [],
  colors: [],
};

function ExploreProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        searchQuery.trim() &&
        !product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ) return false;

      if (filters.priceRange) {
        const range = priceRanges.find((r) => r.label === filters.priceRange);
        if (range && (product.price < range.min || product.price > range.max)) {
          return false;
        }
      }

      if (filters.fabrics.length > 0 && !filters.fabrics.includes(product.fabric)) {
        return false;
      }

      if (filters.colors.length > 0 && !filters.colors.includes(product.color)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery('');
  };

  return (
    <div className="explore-app">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="app-body">
        <Filters
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleReset}
        />
        <ProductList products={filteredProducts} />
      </div>

      <footer className="footer">
        <p>
          © 2026 <span>Vistara</span> — A Curated Saree Catalog. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default ExploreProducts;