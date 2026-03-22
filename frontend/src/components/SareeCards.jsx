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

  return (
    <section className="CardMainDiv">
      {categories.map((item) => (
        <div
          className="card"
          key={item._id}
          onClick={() => navigate(`/saree/${item._id}`)} // ✅ fixed path
          style={{ cursor: "pointer" }}
        >
          {/* ✅ FIRST IMAGE */}
          <img
            src={item.images?.[0]}
            alt={item.name}
            width="200"
          />

          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  );
};

export default SareeCards;