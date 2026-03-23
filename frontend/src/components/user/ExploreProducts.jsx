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

  // 1. Fetch from Backend
  useEffect(() => {
    fetch("https://sareewebsite.onrender.com/sarees")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then((data) => {
        // Map the MongoDB structure to the UI structure
        const mapped = data.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          image: item.images?.[0]?.url,
          colors: item.colors || [],      // Stored as Array
          materials: item.materials || [], // Stored as Array
          description: item.sareeType || "Premium Saree",
        }));

        setProducts(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // 2. Generate Dynamic Filter Options based on existing products
  const dynamicOptions = useMemo(() => {
    const allColors = products.flatMap((p) => p.colors);
    const allFabrics = products.flatMap((p) => p.materials);
    
    return {
      colors: [...new Set(allColors)].filter(Boolean),   // Unique colors
      fabrics: [...new Set(allFabrics)].filter(Boolean), // Unique materials
    };
  }, [products]);

  // 3. Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search Query Filter
      if (
        searchQuery.trim() &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) return false;

      // Fabric Filter (Checks if any material in product.materials matches selected filters)
      if (filters.fabrics.length > 0) {
        const hasMatchingFabric = product.materials.some(m => filters.fabrics.includes(m));
        if (!hasMatchingFabric) return false;
      }

      // Color Filter (Checks if any color in product.colors matches selected filters)
      if (filters.colors.length > 0) {
        const hasMatchingColor = product.colors.some(c => filters.colors.includes(c));
        if (!hasMatchingColor) return false;
      }

      // Price Range Filter (Logic depends on your priceRanges labels)
      if (filters.priceRange) {
        const price = product.price;
        if (filters.priceRange === "Under ₹2,000" && price >= 2000) return false;
        if (filters.priceRange === "₹2,000 - ₹5,000" && (price < 2000 || price > 5000)) return false;
        if (filters.priceRange === "Above ₹5,000" && price <= 5000) return false;
      }

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
          dynamicOptions={dynamicOptions} // Passing dynamic data
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