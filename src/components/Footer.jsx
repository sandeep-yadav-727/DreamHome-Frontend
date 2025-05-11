import React from 'react';
import '../styles/Footer.css'; // Make sure this path matches your structure

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <h2>DreamHome</h2>
                    <p>Your gateway to dream living.</p>
                </div>
                {/* 
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div> */}
                <div className="footer-bottom">
                    &copy; {new Date().getFullYear()} DreamHome. All rights reserved.
                </div>

                <div className="footer-socials">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
