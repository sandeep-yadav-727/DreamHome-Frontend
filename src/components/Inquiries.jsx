import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Table from './Table'; // import your new table
import { ToastContainer } from 'react-toastify';
import '../styles/Inquiries.css'; // existing styling
import 'react-toastify/dist/ReactToastify.css';
import { UrlBackend } from '../utils/config';

const Inquiries = () => {
    const { property_id } = useParams();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const res = await axios.get(`${UrlBackend}/inquiries/${property_id}`, {
                    withCredentials: true,
                });
                setInquiries(res.data);
                console.log(res.data)
            } catch (err) {
                console.error('Error fetching inquiries:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInquiries();
    }, [property_id]);

    const columns = [
        { field: 'name', headerName: 'Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'phone', headerName: 'Phone' },
        { field: 'message', headerName: 'Message' },
        {
            field: 'send_at',
            headerName: 'Sent At',
            cellRenderer: ({ value }) => new Date(value).toLocaleString(),
        },
    ];

    return (
        <div className="inquiries-container">
            {/* <h2>Property ID: {property_id}</h2> */}
            {!loading && inquiries.length > 0 && (
                <h2><strong>Property ID:</strong>{property_id} <br></br><strong>Property Name:</strong>{inquiries[0].property_title}</h2>
            )}
            {loading ? (
                <p>Loading inquiries...</p>
            ) : inquiries.length === 0 ? (
                <p>No inquiries found.</p>
            ) : (
                <>
                    <Table columns={columns} data={inquiries} />
                    <ToastContainer />
                </>
            )}
            <button onClick={() => navigate(-1)} className="back-button">Back</button>
        </div>
    );
    
};

export default Inquiries;
