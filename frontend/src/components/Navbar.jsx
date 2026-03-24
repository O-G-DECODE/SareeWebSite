import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Helper function to handle navigation and close menu
  const handleNav = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <button className="menu-btn" onClick={() => setIsOpen(true)}>
            <span className="menu-icon-line"></span>
            <span className="menu-icon-line short"></span>
          </button>
          
          <div className="brand" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
            <img
              src="https://res.cloudinary.com/dlmwgotxp/image/upload/v1772525943/logo_wffhb4.png"
              alt="Logo"
              className="brand-logo"
            />
            <h3 className="logo-text">Sarees By <span>Kalyani</span></h3>
          </div>
        </div>
      </nav>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

     <aside className={`side-menu ${isOpen ? "open" : ""}`}>
  <div className="menu-header">
    <div className="menu-header-left">
      <span className="menu-subtitle">Boutique</span>
      {/* Admin Login moved to top for better visibility */}
      <button className="admin-portal-link" onClick={() => handleNav("/login")}>
        Admin Login
      </button>
    </div>
    <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
  </div>

  <ul className="nav-links">
    <li><button className="nav-item-btn" onClick={() => handleNav("/")}>Home</button></li>
    <li><button className="nav-item-btn" onClick={() => handleNav("/explore")}>Our Collection</button></li>
    <li><a href="#offers" onClick={() => setIsOpen(false)}>Special Offers</a></li>
    <li><a href="#about" onClick={() => setIsOpen(false)}>About Us</a></li>
    <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
  </ul>
  
  {/* menu-footer is now empty or can be removed if not needed */}
</aside>

      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;