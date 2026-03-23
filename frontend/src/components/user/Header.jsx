import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header({ searchQuery, onSearchChange }) {
  const navigate = useNavigate();
  const logoUrl = "https://res.cloudinary.com/dlmwgotxp/image/upload/v1772525943/logo_wffhb4.png";

  return (
    <header className="explore-header">
      <div className="explore-header-inner">
        
        <div className="header-back-section">
          <button className="header-back-btn" onClick={() => navigate("/")}>
            ← <span>Home</span>
          </button>
        </div>

        <div className="explore-header-brand">
          <div className="explore-header-logo">
            {/* ✅ LOGO ADDED HERE */}
            <img src={logoUrl} alt="Kalyani Logo" className="header-brand-logo" />
            
            <h1 className="explore-header-title">
              Sarees By<span> Kalyani</span>
            </h1>
          </div>
        </div>

        <div className="explore-header-search">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

      </div>
    </header>
  );
}

export default Header;