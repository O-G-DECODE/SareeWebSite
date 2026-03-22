import "../styles/explore.css";
import ProductCard from './ProductCard';

function ProductList({ products }) {
  return (
    <main className="product-list-section">
      <div className="product-list-header">
        <h2 className="product-count">
          <span>{products.length}</span> {products.length === 1 ? 'Saree' : 'Sarees'} Found
        </h2>
        <p className="product-sort-label">Curated Collection</p>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🪡</div>
            <h3>No Sarees Found</h3>
            <p>Try adjusting your search or filters to discover more.</p>
          </div>
        ) : (
          products.map((product, index) => (
            <div
              key={product.id}
              className="product-card-wrapper"
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default ProductList;