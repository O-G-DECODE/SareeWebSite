import { useNavigate } from "react-router-dom";

const COLOR_MAP = {
  Red: "#c0392b",
  White: "#f5f0e8",
  Blue: "#2c5f8a",
  Gold: "#c9993a",
  Green: "#2e6b4f",
  Pink: "#e08aaa",
  Orange: "#d4732a",
  Ivory: "#f5f0dc",
  Yellow: "#d4b83a",
  Beige: "#c9b49a",
  Purple: "#6b3a8a",
  Black: "#1a1a1a",
};

function ProductCard({ product }) {
  const navigate = useNavigate();

  // ✅ SUPPORT BOTH OLD + NEW STRUCTURE
  const {
    id,
    _id,
    name,
    price,
    image,
    images,
    fabric,
    materials,
    color,
    colors,
    description,
    sareeType,
  } = product;

  // ✅ ID FIX
  const productId = id || _id;

  // ✅ IMAGE FIX
  const productImage =
    image || images?.[0]?.url || "/no-image.png";

  // ✅ FABRIC FIX
  const fabricText =
    fabric ||
    (materials?.length ? materials.join(", ") : "Premium Fabric");

  // ✅ COLOR FIX
  const colorText =
    color ||
    (colors?.length ? colors[0] : "No Color");

  // ✅ DESCRIPTION FIX
  const descText =
    description || sareeType || "Premium Saree Collection";

  // ✅ COLOR DOT SAFE
  const mainColor = colorText?.split(",")[0];

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

  const handleClick = () => {
    navigate(`/explore/${productId}`);
  };

  return (
    <article className="product-card" onClick={handleClick}>
      <div className="card-img-wrap">
        <img
          src={productImage}
          alt={name}
          className="card-img"
          loading="lazy"
        />

        {/* FABRIC BADGE */}
        <span className="card-badge">{fabricText}</span>

        {/* COLOR DOT */}
        <span
          className="card-color-dot"
          style={{ backgroundColor: COLOR_MAP[mainColor] || "#ccc" }}
          title={colorText}
        />
      </div>

      <div className="card-body">
        <h3 className="card-name">{name}</h3>

        {/* FABRIC + COLOR */}
        <p className="card-fabric">
          {fabricText} · {colorText}
        </p>

        {/* DESCRIPTION */}
        <p className="card-desc">{descText}</p>

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