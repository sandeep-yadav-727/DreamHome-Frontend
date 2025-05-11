import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Slider from 'react-slick';
import axios from 'axios';
import '../styles/Home.css';
import realEstateImg1 from '../assets/img1.jpg';
import realEstateImg2 from '../assets/img2.jpg';
import realEstateImg3 from '../assets/img3.jpg';
import realEstateImg4 from '../assets/img3.jpg'; // same as img3 intentionally?
import Navbar from '../components/Navbar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './footer';
import { UrlBackend } from '../utils/config';

const Home = () => {
  const [properties, setProperties] = useState([]);

  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  const feedbackSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const feedbacks = [
    { name: 'Amit S.', feedback: 'Amazing experience! Found my dream home in just days.', rating: 5 },
    { name: 'Priya D.', feedback: 'Helpful agents and great listings.', rating: 4},
    { name: 'Ravi M.', feedback: 'User-friendly site and good customer support.', rating: 5 },
    { name: 'Sneha T.', feedback: 'Got a great deal on my first flat!', rating: 4 },
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${UrlBackend}/properties`);
        setProperties(response.data.slice(0, 4)); // Display 4 featured properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />
      <div className="hero-section">
        <Slider {...heroSliderSettings}>
          <div className="slide">
            <img src={realEstateImg1} alt="Real Estate 1" />
          </div>
          <div className="slide">
            <img src={realEstateImg2} alt="Real Estate 2" />
          </div>
          <div className="slide">
            <img src={realEstateImg3} alt="Real Estate 3" />
          </div>
          <div className="slide">
            <img src={realEstateImg4} alt="Real Estate 4" />
          </div>
        </Slider>

        <div className="hero-content">
          <h1>Your Dream Home Awaits</h1>
          <h2>
            Find the best properties in{' '}
            <span className="typed-text">
              <Typewriter
                words={['Thane', 'Kalwa', 'Kalyan', 'Bandra', 'Virar']}
                loop={true}
                cursor
              />
            </span>
          </h2>
          <p>
            Whether you're buying your first home, investing in a new property, or looking for a luxury estate, we're here to help you find your perfect match.
          </p>
          {/* <a href="/properties" className="cta-btn">Explore More</a> */}
        </div>
      </div>

      <div className="feedback-section">
        <h2>What Our Customers Say</h2>
        <Slider {...feedbackSettings}>
          {feedbacks.map((item, index) => (
            <div key={index} className="feedback-card">
              <p className="feedback-text">"{item.feedback}"</p>
              <p className="feedback-name">- {item.name}</p>
              <div className="feedback-rating">
                {Array.from({ length: item.rating }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="property-preview-section">
        <h2>Featured Properties</h2>
        <div className="property-card-grid">
          {properties.map((property, index) => (
            <div className="property-card" key={index}>
              <img
                src={property.image[0]?.replace(/{|}/g, '').split(',')[0].trim()}
                alt={property.title}
                className="property-card-img"
              />
              <div className="property-card-body">
                <h3>{property.title}</h3>
                <p>{property.location}</p>
                <p><strong>₹{property.price}</strong></p>
                <a href={`/properties-details/${property.id}`} className="property-card-link">View Details</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px',marginBottom:'30px' }}>
        <a href="/properties" className="cta-btn">Browse More Properties</a>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
