import { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import Filters from "./Filters";
import ProductList from "./ProductList";
import "../../components/styles/explore.css";

const DEFAULT_FILTERS = { priceRange: null, fabrics: [], colors: [] };

function ExploreProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    fetch("https://sareewebsite.onrender.com/sarees")
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(item => ({
          id: item._id, name: item.name, price: item.price,
          image: item.images?.[0]?.url, colors: item.colors || [],
          materials: item.materials || [], description: item.sareeType || "Premium Saree",
        }));
        setProducts(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const dynamicOptions = useMemo(() => ({
    colors: [...new Set(products.flatMap(p => p.colors))].filter(Boolean),
    fabrics: [...new Set(products.flatMap(p => p.materials))].filter(Boolean),
  }), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.fabrics.length > 0 && !p.materials.some(m => filters.fabrics.includes(m))) return false;
      if (filters.colors.length > 0 && !p.colors.some(c => filters.colors.includes(c))) return false;
      if (filters.priceRange) {
        if (filters.priceRange === "Under ₹2,000" && p.price >= 2000) return false;
        if (filters.priceRange === "₹2,000 - ₹5,000" && (p.price < 2000 || p.price > 5000)) return false;
        if (filters.priceRange === "Above ₹5,000" && p.price <= 5000) return false;
      }
      return true;
    });
  }, [products, searchQuery, filters]);

  return (
    <div className="explore-app">
      <Header />

      <div className="app-body">
        {/* ROW 1: SEARCH BAR (Full Width) */}
        <div className="search-container-standalone">
          <div className="search-box">
            <span className="search-icon"></span>
            <input
              type="text"
              placeholder="Search by saree name or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && <button className="clear-search" onClick={() => setSearchQuery("")}>✕</button>}
          </div>
        </div>

        {/* ROW 2: FILTERS & RESULTS COUNT */}
        <div className="filter-toolbar-row">
          <Filters
            filters={filters}
            onFilterChange={setFilters}
            onReset={() => {setFilters(DEFAULT_FILTERS); setSearchQuery("");}}
            dynamicOptions={dynamicOptions}
          />
        
        </div>

        {loading ? (
          <div className="explore-loading">Curating collection...</div>
        ) : (
          <div className="product-results">
            <ProductList products={filteredProducts} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ExploreProducts;