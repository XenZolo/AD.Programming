import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Alert, Table, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from "../utils/AuthContext";

const Payments = () => {
  const [completedBookings, setCompletedBookings] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [error, setError] = useState(null);
  const { auth } = useAuth(); // Get the auth object from context
  const { token } = auth;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/bookings/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(response.data)) {
          const completedBookings = response.data.filter(booking => booking.status === 'completed');
          setCompletedBookings(completedBookings);
        } else {
          console.error("Unexpected response format", response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings.");
      }
    };
    if (token) fetchBookings();
  }, [token]);

  useEffect(() => {
    const calculateTotalCost = () => {
      const total = completedBookings.reduce((acc, booking) => {
        const bookingDate = new Date(booking.bookingDate);
        if (bookingDate.getMonth() + 1 === selectedMonth) {
          return acc + booking.cost;
        }
        return acc;
      }, 0);
      setTotalCost(total);
    };

    calculateTotalCost();
  }, [completedBookings, selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
  };

  return (
    <Container fluid className="py-5">
      <Row>
        <Col md={12} className="text-center mb-4">
          <h2>Payments for Completed Bookings</h2>
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group controlId="monthSelect" className="mb-4">
            <Form.Label>Select Month</Form.Label>
            <Form.Control 
              as="select" 
              value={selectedMonth} 
              onChange={handleMonthChange} 
              className="form-control-lg"
            >
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index} value={index + 1}>
                  {new Date(0, index).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-center">
          <h4 className="text-primary">Total Income for {new Date(0, selectedMonth - 1).toLocaleString('default', { month: 'long' })}: ${totalCost.toFixed(2)}</h4>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <div className="bg-light p-4 rounded shadow-sm">
            <Table striped bordered hover responsive variant="light" className="mb-4">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Booking ID</th>
                  <th>Booking Date</th>
                  <th>Distance</th>
                  <th>Cost</th>
                  <th>Vehicle Type</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(completedBookings) && completedBookings.length > 0 ? (
                  completedBookings.map((booking) => (
                    <tr key={booking.bookingId}>
                      <td>{booking.bookingId}</td>
                      <td>{new Date(booking.bookingDate).toLocaleString()}</td>
                      <td>{booking.distance ? parseFloat(booking.distance).toFixed(2) : "N/A"}</td>
                      <td>{booking.cost ? parseFloat(booking.cost).toFixed(2) : "N/A"}</td>
                      <td>{booking.vehicle || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No completed bookings for this month.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Payments;
