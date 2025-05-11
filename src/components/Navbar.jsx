import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import '../styles/Navbar.css';
import logo from '../../src/assets/about.png'; // Ensure this path is correct

const Navbar = () => {
  // State to track whether the menu is open or not
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" exact activeClassName="active">
          <img src={logo} alt="Logo" className="logo-img" />
          DreamHome
        </NavLink>
        <button className="navbar-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>
      
      {/* Navbar Links - Only visible if isMenuOpen is true */}
      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/properties" activeClassName="active">Properties</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
        <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
