import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TextField, Button, Grid, Typography, CircularProgress, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { UrlBackend } from '../utils/config';

const AddProperty = () => {
  const [property, setProperty] = useState({
    title: '', description: '', price: '', location: '', 
    configuration: '', area: '', property_age: '', furnishing: ''
  });
  const [images, setImages] = useState([]);  // Store multiple images
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();

    // Append property details to the form data
    formData.append('title', property.title);
    formData.append('description', property.description || ''); // Default empty string if not provided
    formData.append('price', property.price || '');  // Ensure price is a valid float
    formData.append('location', property.location || ''); // Default empty string if not provided
    formData.append('configuration', property.configuration || ''); // Append configuration
    formData.append('area', property.area || ''); // Append area
    formData.append('property_age', property.property_age || ''); // Append property age
    formData.append('furnishing', property.furnishing || ''); // Append furnishing

    // Append each image to the form data (images is an array of files)
    images.forEach((image) => {
      formData.append('images', image);  // Append each file individually
    });

    try {
      const response = await axios.post(`${UrlBackend}/properties`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Property added:', response.data);
      window.location.href = '/properties';  // Redirect to properties page
    } catch (err) {
      setError('Error submitting property. Please try again.');
      console.error('Error submitting property:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle file input change and preview images
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Typography variant="h4" gutterBottom align="center">
        Add Property
      </Typography>
      <form onSubmit={handleSubmit} style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={property.title}
              onChange={(e) => setProperty({ ...property, title: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              // type="number"
              value={property.price}
              onChange={(e) => setProperty({ ...property, price: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={property.description}
              onChange={(e) => setProperty({ ...property, description: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              value={property.location}
              onChange={(e) => setProperty({ ...property, location: e.target.value })}
              required
            />
          </Grid>

          {/* New Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Configuration"
              variant="outlined"
              fullWidth
              value={property.configuration}
              onChange={(e) => setProperty({ ...property, configuration: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Area (sq.ft)"
              variant="outlined"
              fullWidth
              value={property.area}
              onChange={(e) => setProperty({ ...property, area: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Property Age"
              variant="outlined"
              fullWidth
              value={property.property_age}
              onChange={(e) => setProperty({ ...property, property_age: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Furnishing</InputLabel>
              <Select
                label="Furnishing"
                value={property.furnishing}
                onChange={(e) => setProperty({ ...property, furnishing: e.target.value })}
              >
                <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
                <MenuItem value="Fully-Furnished">Fully-Furnished</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </Grid>

          {/* Image preview */}
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {images.length > 0 &&
                images.map((image, index) => (
                  <Box key={index}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  </Box>
                ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Add Property
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}  {/* Show error message if there's an error */}
    </motion.div>
  );
};

export default AddProperty;
