import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import '../styles/EditProperty.css';
import { UrlBackend } from '../utils/config';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [property, setProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    configuration: '',
    area: '',
    property_age: '',
    furnishing: '',
    image: [], // will store existing image URLs
  });

  const [selectedFiles, setSelectedFiles] = useState([]); // for new uploads
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${UrlBackend}/properties/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperty(res.data);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form fields
    Object.entries(property).forEach(([key, value]) => {
      if (key !== 'image') {
        formData.append(key, value);
      }
    });

    // Append files
    if (selectedFiles.length > 0) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append('images', file);
      });

    }

    try {
      await axios.put(`${UrlBackend}/properties/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating property:', err);
      setError('Failed to update property.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-property-container">
      <h2>Edit Property</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {['title', 'description', 'price', 'location', 'configuration', 'area', 'property_age', 'furnishing'].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.replace('_', ' ').toUpperCase()}</label>
            <input
              type={field === 'description' ? 'textarea' : 'text'}
              id={field}
              name={field}
              value={property[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="image">Upload New Images</label>
          <input
            type="file"
            id="image"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            <FaSave /> Save Changes
          </button>
          <button type="button" className="cancel-button" onClick={() => navigate('/dashbord')}>
            <FaArrowLeft /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;
