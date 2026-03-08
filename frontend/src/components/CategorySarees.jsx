import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CategorySarees = () => {
  const { id } = useParams();
  const [sarees, setSarees] = useState([]);
const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/sarees/category/${id}`)
      .then(res => res.json())
      .then(data => setSarees(data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <section className="CardMainDiv">
      {sarees.length === 0 ? (
        <p>No sarees found in this category.</p>
      ) : (
        sarees.map((item) => (
          <div className="card" key={item._id}>
            <img src={item.image} alt={item.name} width="200" />
            <h4>{item.name}</h4>
            <p>₹ {item.price}</p>
            <p>{item.material}</p>
          </div>
        ))
      )}
    </section>
  );
};

export default CategorySarees;