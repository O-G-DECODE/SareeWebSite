import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Sarees By Kalyani</h2>

      <ul className="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#products">Our Products</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
