import { useNavigate } from "react-router-dom";
import sarees  from "../data/sarees";

const SareeCards = () => {
    const navigate = useNavigate();

  return (
   <section id="products" className="CardMainDiv">
  {sarees.map((saree) => (
    <div className="card" key={saree.id}
    onClick={() => navigate(`/saree/${saree.id}`)}
    style={{ cursor: "pointer" }}
    >
      <img src={saree.image} className="ImageClass" />
      <h4>{saree.name}</h4>
      <p>{saree.price}</p>
    </div>
  ))}
</section>

  );
};

export default SareeCards;
