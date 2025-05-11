import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/PageNotFound.css'; 
import oops from '../assets/oops.jpg'

const PageNotFound = () => {
  return (
    <div className="container">
      <h1 className="title">Oops! Page Not Found</h1>
      <p className="message">Sorry, the page you're looking for does not exist.</p>
      <p className="suggestion">You can go back to our homepage or browse our properties:</p>
      <Link to="/" className="homeLink">Back to Homepage</Link>

      <div className="imageContainer">
        <img 
          src={oops}
          alt="404" 
          className="image"
        />
      </div>
    </div>
  );
}

export default PageNotFound;
