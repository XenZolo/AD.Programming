import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Card, ListGroup, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useLocation,Link  } from "react-router-dom";

const DriverDashboard = () => {
    const location = useLocation();
    const { token, userId } = location.state || {};

    const [driver, setDriver] = useState(null);
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isstatusChanged,setIsStatusChanged] = useState(false)

    useEffect(() => {
        const fetchDriverDetails = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/user/getDriver`, { id: userId }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDriver(response.data);
            } catch (error) {
                setError("Failed to fetch driver details.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchDriverDetails();
    }, [userId, token]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/user/getUser`, { id: userId }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                setError("Failed to fetch user details.");
            }
        };

        if (userId) fetchUserDetails();
    }, [userId, token]);

    useEffect(() => {
        const fetchDriverBookings = async () => {
            if (driver) {
                try {
                    const response = await axios.post(`http://localhost:8080/api/bookings/driver`, { assignedDriverId: driver.username }, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setBookings(response.data.filter(booking => booking.status === 'assigned'));
                } catch (error) {
                    setError("No any Bookings assigned for you.");
                }
            }
        };

        fetchDriverBookings();
    }, [driver, token,isstatusChanged]);

    const handlePickup = async (bookingId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/bookings/updateStatus/${bookingId}`, {
                status: "ongoing" // Set the status to "ongoing"
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
    
            if (response.status === 200) {

                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking.bookingId === bookingId ? { ...booking, status: "ongoing" } : booking
                    )
                );
                setIsStatusChanged(true)
                console.log("Booking status updated to ongoing:", response.data);
            }
        } catch (error) {
            console.error("Error updating booking status:", error);
            setError("Failed to update booking status.");
        }
    };


    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading...</p>
        </Container>
    );

    if (error) return <Alert variant="danger" className="text-center mt-3">{error}</Alert>;


    return (
        <Container className="mt-5">
            <h1 className="h3 mb-4 text-center text-light fw-bold">Driver Dashboard</h1>
            <div className="d-flex justify-content-center gap-3 mb-4">
                <Link 
                    to="/driverOngoingBookings" 
                    state={{ userId, token }} 
                    className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
                >
                    Ongoing Bookings
                </Link>
                <Link 
                    to="/driverCompletedBookings" 
                    state={{ userId, token }} 
                    className="btn btn-secondary px-4 py-2 rounded-pill shadow-sm"
                >
                    Booking History
                </Link>
            </div>
            {bookings?.length > 0 ? (
                <ListGroup>
                    {bookings?.map((booking) => (
                        <ListGroup.Item key={booking.id} className="mb-4 border-0">
                            <Card className="shadow-lg rounded-4 border-0" style={{ backgroundColor: "#002B5B", color: "#f0f8ff" }}>
                                <Card.Body>
                                    <Card.Title className="text-warning fw-bold text-center mb-3">Assigned Booking Order</Card.Title>
                                    <Row className="border-bottom pb-3">
                                        <Col md={6} className="mb-3">
                                            <h5 className="fw-bold text-light">User Details</h5>
                                            <p><strong>User Id:</strong> {booking?.userId}</p>
                                            <p><strong>Email:</strong> {user?.email}</p>
                                            <p><strong>Phone:</strong> {user?.phoneNumber}</p>
                                        </Col>
                                        <Col md={6}>
                                            <h5 className="fw-bold text-light">Booking Details</h5>
                                            <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                                            <p><strong>Pickup:</strong> {booking.pickupLocation}</p>
                                            <p><strong>Destination:</strong> {booking.destinationLocation}</p>
                                            <p><strong>Status:</strong> <span className="badge bg-warning text-dark">{booking.status}</span></p>
                                            <p><strong>Cost:</strong> <span className="text-success fw-bold">Rs.{booking.cost.toFixed(2)}</span></p>
                                            <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
                                            <p><strong>Distance:</strong> {booking.distance.toFixed(2)} km</p>
                                            <p><strong>Vehicle:</strong> {booking.vehicle} ({booking.vehicleNumber})</p>
                                        </Col>
                                    </Row>
                                    <div className="mt-4 text-center">
                                        <Button 
                                            variant="success" 
                                            size="lg" 
                                            className="rounded-pill px-5 py-2 shadow-sm" 
                                            onClick={() => handlePickup(booking.bookingId)}
                                        >
                                            Pickup
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p className="text-center text-muted">No bookings assigned to this driver.</p>
            )}
        </Container>
    );
};

export default DriverDashboard;
