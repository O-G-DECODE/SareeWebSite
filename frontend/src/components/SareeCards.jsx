import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SareeCards = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/`) // better to use /categories later
      .then((res) => res.json())
      .then((data) => {
        console.log("Data from backend:", data);
        setCategories(data);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  // ... inside SareeCards.jsx return statement
return (
  <section className="CardMainDiv horizontal-scroll"> {/* Added horizontal-scroll class */}
    {categories.length === 0 ? (
      <p>Loading categories...</p>
    ) : (
      categories.map((item) => (
        <div
          className="card"
          key={item._id}
          onClick={() => navigate(`/saree/${item._id}`)}
        >
          <img 
            src={item.images?.[0]?.url || "/placeholder.jpg"} 
            alt={item.name} 
            className="ImageClass" 
          />
          <h4>{item.name}</h4>
          <p className="text-sm opacity-80">{item.description}</p>
        </div>
      ))
    )}
  </section>
);
  
};

export default SareeCards;