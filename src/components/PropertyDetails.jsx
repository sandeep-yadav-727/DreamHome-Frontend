import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MapPin, Ruler, Home, Calendar, Sofa, IndianRupeeIcon, FileText } from 'lucide-react';
import '../styles/PropertyDetails.css'
import Navbar from './Navbar';
import { TextField, Button } from '@mui/material';
import '../../src/styles/Contact.css';
import { toast } from 'react-toastify';
import { UrlBackend } from '../utils/config';

const PropertyDetails = () => {
  const { propertyId } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState(null); // State for main image
  const [formData, setFormData] = useState({
    property_id: '',
    property_title: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if required fields are set
    if (!formData.property_id || !formData.property_title) {
      toast.error("Property info is missing.");
      return;
    }
    try {
      const response = await axios.post(`${UrlBackend}/inquiry`, formData,
      {
        headers: {
          'Content-Type': 'application/json',  // Make sure it's JSON
        },
      })
      toast.success(response.data.message);
      setFormData({
        property_id: '',
        property_title: '',
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact info:', error);
      toast.error('Error submitting contact info');
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [propertyId]); // Re-fetch data when propertyId changes

  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(`${UrlBackend}/properties/${propertyId}`);
      setProperty(response.data);
      console.log('property', response.data);

      // Set property details into formData
      setFormData((prevState) => ({
        ...prevState,
        property_id: response.data.id,
        property_title: response.data.title,
      }));

      // Clean the image string and set the first image as the default main image
      if (response.data && response.data.image && response.data.image[0]) {
        const imageString = response.data.image[0]; // This contains the image URLs
        const cleanedImageString = imageString.replace(/{|}/g, ''); // Remove the curly braces
        const imageUrls = cleanedImageString.split(','); // Split by commas to get an array of URLs
        setMainImage(imageUrls[0].trim()); // Set the first image as the main image
      }
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  if (!property) {
    return <div>Loading...</div>;  // Show loading until property data is fetched
  }

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl); // Change the main image when thumbnail is clicked
  };

  // Clean the image string and return the array of image URLs
  const getImageUrls = (imageString) => {
    const cleanedImageString = imageString.replace(/{|}/g, ''); // Remove curly braces
    return cleanedImageString.split(',').map((url) => url.trim()); // Split by commas and trim spaces
  };

  const imageUrls = getImageUrls(property.image[0]); // Get image URLs

  return (
    <>
      <Navbar />
      <div className="property-details-container">
        <h2 style={{ textAlign: 'center' }}>
          <Home size={20} /> {property.title}
        </h2>
        <div className="property-details-content">
          <div className="main-image">
            {/* Display the main image */}
            {mainImage && (
              <img
                src={mainImage}
                alt={`${property.title} main image`}
                className="property-main-image"
              />
            )}
          </div>
          {/* Thumbnails at the bottom */}
          <div className="image-thumbnails">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${property.title} image thumbnail ${index + 1}`}
                className="property-thumbnail"
                onClick={() => handleThumbnailClick(url)} // On click, set the clicked image as the main image
              />
            ))}
          </div>
          <div className="property-info">
            <p><FileText size={20} color="#3498db" /> {property.description}</p>
            <p><IndianRupeeIcon size={20} color="#27ae60" /> {property.price}</p>
            <p><MapPin size={20} color="#e74c3c" /> {property.location}</p>
            <p><Ruler size={20} color="#f1c40f" /> {property.area} sq.ft</p>
            <p><Home size={20} color="#9b59b6" /> {property.configuration}</p>
            <p><Calendar size={20} color="#2ecc71" /> {property.property_age} years old</p>
            <p><Sofa size={20} color="#e67e22" /> {property.furnishing}</p>
          </div>
        </div>
        <div className="contact-container">
          <h1 className="contact-header">Inquiry</h1>
          {/* <p>{formData.property_id}</p>   */}
          {/* <p>{formData.property_title}</p>  */}
          <form onSubmit={handleSubmit} className="contact-form">
            <TextField
              label="Full Name"
              variant="standard"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
            <TextField
              label="Gmail"
              variant="standard"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
            <TextField
              label="Contact Number"
              variant="standard"
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-field"
            />
            <TextField
              label="Message"
              variant="standard"
              fullWidth
              multiline
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="input-field"
            />
            <Button type="submit" variant="contained" color="primary" className="submit-btn">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
