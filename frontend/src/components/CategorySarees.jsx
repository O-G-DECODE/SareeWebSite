import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const CategorySarees = () => {
  const { id } = useParams();
  const [sarees, setSarees] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/sarees/category/${id}`)
      .then((res) => res.json())
      .then((data) => setSarees(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <section className="product-page-container container-padding">
      <div className="product-header">
        <h2 className="section-title">Our Collection</h2>
        <div className="title-underline"></div>
      </div>

      {sarees.length === 0 ? (
        <div className="loading-state">
          <p>We are currently updating this collection. Check back soon!</p>
        </div>
      ) : (
        <div className="product-grid">
          {sarees.map((item) => (
            <div className="product-card" key={item._id}>
              <div className="product-image-wrapper">
                <img
                  src={item.images?.[0]?.url || "/placeholder.jpg"}
                  alt={item.name}
                />
                <div className="product-badge">Handpicked</div>
              </div>

              <div className="product-info">
                <h4 className="product-name">{item.name}</h4>
                
                <div className="product-meta">
                  <span className="product-price">₹{item.price}</span>
                </div>

                <div className="product-details">
                  <p><strong>Material:</strong> {item.materials?.join(", ") || "Pure Silk"}</p>
                  <p><strong>Colors:</strong> {item.colors?.join(", ") || "Multicolor"}</p>
                </div>
                
                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySarees;