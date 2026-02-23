import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <nav className="navbar">
        <button className="menu-btn" onClick={() => setIsOpen(true)}>
          ☰
        </button>
        <div className="brand">
  <img
    src="images/logo/logo.png"
    alt="Sarees By Kalyani Logo"
    className="brand-logo"
  />
  <h2 className="logo-text">Sarees By Kalyani</h2>
</div>

      </nav>

      {/* Overlay */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Side Menu */}
      <aside className={`side-menu ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          ✕
        </button>

        <ul>
          <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
          <li><a href="#products" onClick={() => setIsOpen(false)}>Products</a></li>
          <li><a href="#offers" onClick={() => setIsOpen(false)}>Offers</a></li>
          <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
          <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
         <li onClick={() => setIsOpen(false)}> <Link to="/login">Admin Login</Link></li>
        </ul>
      </aside>

      {/* Push content below navbar */}
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;
