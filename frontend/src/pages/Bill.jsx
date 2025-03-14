import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Bill = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingId, token } = location.state || {};

    const [booking, setBooking] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/booking/${bookingId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBooking(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching booking:", error.response ? error.response.data : error.message);
                setError("Failed to fetch booking details.");
                setLoading(false);
            }
        };

        if (token && bookingId) {
            fetchBooking();
        } else {
            alert("No token or booking ID available.");
            navigate('/login');
        }
    }, [token, bookingId]);

    const generatePDF = () => {
        const input = document.getElementById('invoice');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save('invoice.pdf');
        });
    };

    if (loading) return <div style={styles.loadingContainer}>Loading...</div>;
    if (error) return <div style={styles.errorContainer}>{error}</div>;

    return (
        <div style={styles.billPage}>
            <div id="invoice" style={styles.billCard}>
                <h2 style={styles.invoiceTitle}>🧾 Invoice</h2>
                <div style={styles.invoiceDetails}>
                    <p><strong>📌 Booking ID:</strong> {booking.id}</p>
                    <p><strong>🚕 Pickup:</strong> {booking.pickupLocation}</p>
                    <p><strong>📍 Destination:</strong> {booking.destinationLocation}</p>
                    <p><strong>📆 Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
                    <p><strong>💰 Cost:</strong> <span style={styles.cost}>${booking.cost.toFixed(2)}</span></p>
                    <p><strong>🚗 Vehicle:</strong> {booking.vehicle}</p>
                    <p><strong>🔢 Number:</strong> {booking.vehicleNumber}</p>
                    <p><strong>👨‍✈️ Driver:</strong> {booking.assignedDriverId}</p>
                </div>
                <button onClick={generatePDF} style={styles.downloadBtn}>
                    📄 Download Invoice
                </button>
            </div>
        </div>
    );
};

// **  Styles**
const styles = {
    billPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#fff',
        padding: '20px',
    },
    billCard: {
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        color: '#fff',
        backgroundImage: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    },
    invoiceTitle: {
        color: '#f9c74f',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        marginBottom: '20px',
    },
    invoiceDetails: {
        fontSize: '1rem',
        textAlign: 'left',
        marginBottom: '20px',
    },
    cost: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#ff6b6b',
    },
    downloadBtn: {
        backgroundColor: '#f9c74f',
        color: '#000',
        fontSize: '1rem',
        padding: '12px 24px',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: '0.3s ease-in-out',
        border: 'none',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        marginTop: '10px',
    },
    downloadBtnHover: {
        backgroundColor: '#f9844a',
        transform: 'scale(1.05)',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: '#fff',
    },
    errorContainer: {
        textAlign: 'center',
        color: 'red',
        fontSize: '1.2rem',
        marginTop: '20px',
    },
};

export default Bill;
