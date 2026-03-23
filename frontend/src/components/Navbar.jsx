import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <button className="menu-btn" onClick={() => setIsOpen(true)}>
            <span className="menu-icon-line"></span>
            <span className="menu-icon-line short"></span>
          </button>
          
          <div className="brand">
            <img
              src="https://res.cloudinary.com/dlmwgotxp/image/upload/v1772525943/logo_wffhb4.png"
              alt="Logo"
              className="brand-logo"
            />
            <h2 className="logo-text">Sarees By <span>Kalyani</span></h2>
          </div>
        </div>
      </nav>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      <aside className={`side-menu ${isOpen ? "open" : ""}`}>
        <div className="menu-header">
          <span className="menu-title">Menu</span>
          <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <ul className="nav-links">
          <li><a href="/" onClick={() => setIsOpen(false)}>Home</a></li>
          <li><a href="/explore" onClick={() => setIsOpen(false)}>Our Collection</a></li>
          <li><a href="#offers" onClick={() => setIsOpen(false)}>Special Offers</a></li>
          <li><a href="#about" onClick={() => setIsOpen(false)}>About Our Store</a></li>
          <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact Us</a></li>
        </ul>

        <div className="menu-footer">
          <Link to="/login" className="admin-link" onClick={() => setIsOpen(false)}>
            Admin Portal
          </Link>
        </div>
      </aside>

      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;