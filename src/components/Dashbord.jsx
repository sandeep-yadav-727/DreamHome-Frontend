import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaEdit, FaEye, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { MdPersonSearch } from "react-icons/md";
import '../styles/Dashboard.css'; // optional styling
import { UrlBackend } from '../utils/config';

const Dashboard = () => {
    const [properties, setProperties] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Fetch current user
    const fetchUser = async () => {
        try {
            const res = await axios.get(`${UrlBackend}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsername(res.data.username);
        } catch (err) {
            console.error('Failed to fetch user', err);
        }
    };

    // Fetch all properties
    const fetchProperties = async () => {
        try {
            const res = await axios.get(`${UrlBackend}/properties`);
            setProperties(res.data);
        } catch (err) {
            console.error('Failed to fetch properties', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await axios.delete(`${UrlBackend}/properties/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                fetchProperties();
            } catch (err) {
                console.error('Delete error', err);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-property/${id}`);
    };
    const handleViewInquiries = (propertyId) => {
        navigate(`/inquiries/${propertyId}`);
    };


    const handleView = (id) => {
        navigate(`/properties-details/${id}`);
    };

    const handleAddProperty = () => {
        navigate('/add-property');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    useEffect(() => {
        fetchUser();
        fetchProperties();
    }, []);

    // Helper function to clean image string
    const getImageUrls = (imageString) => {
        const cleaned = imageString.replace(/{|}/g, '');
        return cleaned.split(',').map((url) => url.trim());
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <div className="username-box">Welcome, {username}</div>
                <button className="add-button" onClick={handleAddProperty}>
                    <FaPlus /> Add Property
                </button>
                <button className="logout-btn" onClick={handleLogout} title="Logout">
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            <div className="property-list">
                {properties.length === 0 ? (
                    <p>Loading ...</p>
                ) : (
                    properties.map((property) => {
                        const imageUrls =
                            Array.isArray(property.image) && property.image.length > 0
                                ? getImageUrls(property.image[0])
                                : [];

                        return (
                            <div key={property.id} className="property-card">
                                <img
                                    src={imageUrls[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                                    alt={property.title}
                                    className="property-img"
                                />
                                <div className="property-info">
                                    <h3>{property.title}</h3>
                                    <p>₹{property.price}</p>
                                    <p>{property.location}</p>
                                </div>
                                <div className="property-actions">
                                    <button onClick={() => handleView(property.id)} className="button-view" title="View">
                                        <FaEye /> View
                                    </button>
                                    <button onClick={() => handleViewInquiries(property.id)} className="button-inquiries" title="View Inquiries">
                                        <MdPersonSearch /> Inquiries
                                    </button>
                                    <button onClick={() => handleEdit(property.id)} className="button-edit" title="Edit">
                                        <FaEdit /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(property.id)} className="button-delete" title="Delete">
                                        <FaTrash /> Delete
                                    </button>
                                </div>

                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Dashboard;
