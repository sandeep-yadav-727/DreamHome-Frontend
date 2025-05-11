import React from 'react';
import '../../src/styles/About.css';
import AboutImg from '../assets/about.png'
import Navbar from './Navbar';

const About = () => {
  return (
    <>

      <Navbar/>
      <section className="about-section">
        <div className="container">
          <h1 className="title">About Us</h1>
          <div className="about-content">
            <div className="about-info">
              <h2>We Are Your Trusted Real Estate Partners</h2>
              <p>
                At XYZ Real Estate, we specialize in helping you find the perfect home. With years of experience and a deep understanding of the local market, we are committed to delivering top-notch services that match your needs.
              </p>
              <p>
                Whether you’re buying, selling, or renting, our professional team ensures a seamless experience throughout your journey.
              </p>
              <button className="contact-btn">Get in Touch</button>
            </div>
            <div className="about-image">
              <img src={AboutImg} alt="Real Estate Team" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
