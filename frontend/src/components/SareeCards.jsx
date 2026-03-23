import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SareeCards = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <section className="classic-category-container">
      <div className="horizontal-scroll">
        {categories.length === 0 ? (
          <p className="loading-text">Bringing you the finest weaves...</p>
        ) : (
          categories.map((item) => (
            <div
              className="classic-card"
              key={item._id}
              onClick={() => navigate(`/saree/${item._id}`)}
            >
              <div className="image-wrapper">
                <img 
                  src={item.images?.[0]?.url || "/placeholder.jpg"} 
                  alt={item.name} 
                />
                <div className="card-overlay">
                  <span>View Collection</span>
                </div>
              </div>
              <div className="card-details">
                <h4 className="category-title">{item.name}</h4>
                <p className="category-desc">{item.description}</p>
                <div className="gold-line"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default SareeCards;