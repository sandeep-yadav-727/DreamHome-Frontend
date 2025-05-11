import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import PropertyList from './components/PropertyList';
import AddProperty from './components/AddProperty';
import EditProperty from './components/EditProperty';
import PrivateRoute from './components/PrivateRoute';
import About from './components/About';
import Contact from './components/Contact';
import PropertyDetails from './components/PropertyDetails';
import PageNotFound from './components/PageNotFound';
import Dashbord from './components/Dashbord';
import Inquiries from './components/Inquiries';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties-details/:propertyId" element={<PropertyDetails />} />
        <Route path="/dashbord" element={<PrivateRoute><Dashbord /></PrivateRoute>} />
        <Route path="/add-property" element={<PrivateRoute><AddProperty /></PrivateRoute>} />
        <Route path="/edit-property/:id" element={<PrivateRoute><EditProperty /></PrivateRoute>} />
        <Route path="/inquiries/:property_id" element={<PrivateRoute><Inquiries /></PrivateRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
