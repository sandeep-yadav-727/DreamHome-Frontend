import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';  // Importing the CSS file
import { toast } from 'react-toastify';
import { TextField, Button, Box, Grid } from '@mui/material';
import { UrlBackend } from '../utils/config';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Username and password are required!');
      return;
    }
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post(`${UrlBackend}/token`, formData);
      localStorage.setItem('token', response.data.access_token);
      window.location.href = '/dashbord';
    } catch {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <Box display="flex" flexDirection="column" gap={2}> {/* Use Box for layout */}
                <TextField
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
