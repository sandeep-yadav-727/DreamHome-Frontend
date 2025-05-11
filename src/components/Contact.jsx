import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import '../../src/styles/Contact.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from './Navbar';
import { UrlBackend } from '../utils/config';

const Contact = () => {
  const [formData, setFormData] = useState({
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
    try {
      const response = await axios.post(`${UrlBackend}/contact`, formData);
      toast.success(response.data.message)
      setFormData({
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

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h1 className="contact-header">Contact Us</h1>
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
    </>
  );
};

export default Contact;
