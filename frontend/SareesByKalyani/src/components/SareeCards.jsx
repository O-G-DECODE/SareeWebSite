import { useNavigate } from "react-router-dom";
import sarees  from "../data/sarees";

const SareeCards = () => {
    const navigate = useNavigate();

  return (
   <div className="CardMainDiv">
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
</div>

  );
};

export default SareeCards;
