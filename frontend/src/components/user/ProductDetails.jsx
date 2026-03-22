import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/explore.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://sareewebsite.onrender.com/sarees`)
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((p) => p._id === id);

        if (item) {
          setProduct({
            id: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
            color: item.color,
            fabric: item.material,
            description: item.sareeType,
          });
        }
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="explore-app">
      <div className="product-details-container">
        <button className="back-btn" onClick={() => navigate("/explore")}>
          ← Back
        </button>

        <div className="product-details">
          <div className="details-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="details-info">
            <h1 className="details-title">{product.name}</h1>
            <p>{product.fabric} • {product.color}</p>
            <p className="details-description">{product.description}</p>
            <h2 className="details-price">₹ {product.price}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;