import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/PropertyList.css';
import Navbar from './Navbar';
import { UrlBackend } from '../utils/config';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, [search]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${UrlBackend}/properties`, {
        params: { search }
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/properties-details/${propertyId}`);
  };

  const sortedProperties = properties;

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="property-list-container"
      >
        <motion.h3
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          className="animated-heading"
        >
          🏠 Properties
        </motion.h3>

        <motion.div
          className="search-bar-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="modern-search-input"
          />
        </motion.div>


        <div className="property-list">
          {sortedProperties.map((property) => {
            const imageString = property.image?.[0] || '';
            const cleanedImageString = imageString.replace(/[{}"]/g, '');
            const imageUrls = cleanedImageString.split(',').map((url) => url.trim()).filter(Boolean);
            const firstImage = imageUrls[0];
            const secondImage = imageUrls[1];

            return (
              <div key={property.id} className="property-item">
                <div className="property-content">
                  <div className="image-slider">
                    {firstImage && (
                      <motion.img
                        src={firstImage}
                        alt={`${property.title} image 1`}
                        className="first-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    {secondImage && (
                      <motion.img
                        src={secondImage}
                        alt={`${property.title} image 2`}
                        className="second-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </div>

                  <div className="property-text">
                    <h3>{property.title}</h3>
                    <p className="price">Price: ₹{property.price}</p>
                    <p>Location: {property.location}</p>
                    <button onClick={() => handleViewDetails(property.id)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default PropertyList;
