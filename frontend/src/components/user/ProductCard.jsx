import { useNavigate } from "react-router-dom";

const COLOR_MAP = {
  Red: '#c0392b',
  White: '#f5f0e8',
  Blue: '#2c5f8a',
  Gold: '#c9993a',
  Green: '#2e6b4f',
  Pink: '#e08aaa',
  Orange: '#d4732a',
  Ivory: '#f5f0dc',
  Yellow: '#d4b83a',
  Beige: '#c9b49a',
  Purple: '#6b3a8a',
  Black: '#1a1a1a',
};

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { id, name, price, fabric, color, image, description } = product;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  const handleClick = () => {
    navigate(`/explore/${id}`);
  };

  return (
    <article className="product-card" onClick={handleClick}>
      <div className="card-img-wrap">
        <img
          src={image}
          alt={name}
          className="card-img"
          loading="lazy"
        />
        <span className="card-badge">{fabric}</span>
        <span
          className="card-color-dot"
          style={{ backgroundColor: COLOR_MAP[color] || '#ccc' }}
          title={color}
        />
      </div>

      <div className="card-body">
        <h3 className="card-name">{name}</h3>
        <p className="card-fabric">{fabric} · {color}</p>
        <p className="card-desc">{description}</p>

        <div className="card-footer">
          <div>
            <p className="card-price">{formattedPrice}</p>
            <p className="card-price-sub">onwards</p>
          </div>
          <span className="card-view-btn">View</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;