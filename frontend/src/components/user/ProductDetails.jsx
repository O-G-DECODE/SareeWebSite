import { useParams, useNavigate } from "react-router-dom";
import { products } from "./data/products";
import "../styles/explore.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <h2 className="not-found">Product not found</h2>;

  return (
    <div className="explore-app">
      <div className="product-details-container">
        
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate("/explore")}>
          ← Back to Explore
        </button>

        <div className="product-details">
          
          {/* Image */}
          <div className="details-image">
            <img src={product.image} alt={product.name} />
          </div>

          {/* Info */}
          <div className="details-info">
            <h1 className="details-title">{product.name}</h1>

            <p className="details-meta">
              {product.fabric} • {product.color}
            </p>

            <p className="details-description">
              {product.description}
            </p>

            <h2 className="details-price">₹ {product.price}</h2>

            <button className="buy-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;