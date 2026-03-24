import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const logoUrl = "https://res.cloudinary.com/dlmwgotxp/image/upload/v1772525943/logo_wffhb4.png";

  return (
    <header className="explore-header">
      <div className="explore-header-inner">

        {/* Left: Circular Back Button */}
        <div className="header-column left">
          <button className="back-btn-minimal" onClick={() => navigate("/")}>
            <span className="arrow-icon">←</span>
            <span className="back-text">Home</span>
          </button>
        </div>

        {/* Center: Brand Identity */}
        <div className="header-column center">
          <div className="brand-group">
            <img src={logoUrl} alt="Kalyani Logo" className="header-logo-img" />
            <h1 className="header-brand-name">
              Sarees By <span>Kalyani</span>
            </h1>
          </div>
        </div>

        {/* Right: Empty Spacer for Balance */}
        <div className="header-column right"></div>

      </div>
    </header>
  );
}

export default Header;