import { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import Filters from "./Filters";
import ProductList from "./ProductList";
import "../../components/styles/explore.css";

const DEFAULT_FILTERS = {
  priceRange: null,
  fabrics: [],
  colors: [],
};

function ExploreProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch("https://sareewebsite.onrender.com/sarees") // <-- change if needed
      .then((res) => res.json())
      .then((data) => {
        // 🔄 map backend → frontend format
        const mapped = data.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          color: item.color,
          fabric: item.material, // 🔥 important mapping
          description: item.sareeType || "Premium Saree",
        }));

        setProducts(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        searchQuery.trim() &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) return false;

      if (
        filters.fabrics.length > 0 &&
        !filters.fabrics.includes(product.fabric)
      ) return false;

      if (
        filters.colors.length > 0 &&
        !filters.colors.includes(product.color)
      ) return false;

      return true;
    });
  }, [products, searchQuery, filters]);

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery("");
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

        {loading ? (
          <p style={{ padding: "20px" }}>Loading products...</p>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </div>
    </div>
  );
}

export default ExploreProducts;