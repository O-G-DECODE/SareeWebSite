import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/explore.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(""); // ✅ Tracks the main view

  useEffect(() => {
    fetch(`https://sareewebsite.onrender.com/sarees`)
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((p) => p._id === id);

        if (item) {
          const mappedProduct = {
            id: item._id,
            name: item.name,
            price: item.price,
            images: item.images || [], // ✅ All images
            color: item.colors?.join(", "),
            fabric: item.materials?.join(", "),
            description: item.sareeType,
          };
          setProduct(mappedProduct);
          // ✅ Set the first image as default
          setActiveImage(item.images?.[0]?.url || "/no-image.png");
        }
      });
  }, [id]);

  if (!product) return <p className="loading">Loading...</p>;

  return (
    <div className="explore-app">
      <div className="product-details-container">
        <button className="back-btn" onClick={() => navigate("/explore")}>
          ← Back to Collection
        </button>

        <div className="product-details">
          {/* LEFT: IMAGE SECTION */}
          <div className="details-image-section">
            <div className="main-image-container">
              <img src={activeImage} alt={product.name} className="main-view-img" />
            </div>

            {/* ✅ THUMBNAIL TRACK */}
            <div className="thumbnail-track">
              {product.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-item ${activeImage === img.url ? "active" : ""}`}
                  onClick={() => setActiveImage(img.url)}
                >
                  <img src={img.url} alt={`View ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: INFO SECTION */}
          <div className="details-info">
            <h1 className="details-title">{product.name}</h1>
            <div className="details-meta">
              <span><strong>Fabric:</strong> {product.fabric}</span>
              <span><strong>Color:</strong> {product.color}</span>
            </div>
            <p className="details-description">{product.description}</p>
            <h2 className="details-price">₹ {new Intl.NumberFormat('en-IN').format(product.price)}</h2>
            
            <button className="buy-btn">Inquiry on WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;