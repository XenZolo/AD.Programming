import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Card, Row, Col, Form } from 'react-bootstrap'; 
import { useAuth } from '../utils/AuthContext'; 

const AdminDashboard = () => {
  const { auth } = useAuth(); // Get the auth object from context
  const { token } = auth; // Destructure token from auth

  const [pendingCount, setPendingCount] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState(null);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month

  // Fetch counts of bookings
  useEffect(() => {
    const fetchBookingsCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/bookings/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(response.data)) {
          setPendingCount(response.data.filter(booking => booking.status === 'pending').length);
          setOngoingCount(response.data.filter(booking => booking.status === 'ongoing').length);
          setCompletedCount(response.data.filter(booking => booking.status === 'completed').length);
        } else {
          console.error("Unexpected response format", response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings.");
      }
    };

    if (token) fetchBookingsCount();
  }, [token]);

  // Fetch count of drivers
  useEffect(() => {
    const fetchDriversCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const driverList = response.data.filter(user => user.userRole === "DRIVER");
        setDriverCount(driverList.length);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        setError("Failed to fetch drivers.");
      }
    };

    if (token) fetchDriversCount();
  }, [token]);

  // Fetch count of vehicles
  useEffect(() => {
    const fetchVehiclesCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/vehicles`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicleCount(response.data.length); // Set the count of vehicles
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Failed to fetch vehicles.");
      }
    };

    if (token) fetchVehiclesCount();
  }, [token]);

  // Fetch count of users
  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userList = response.data.filter(user => user.userRole === "USER");
        setUserCount(userList.length);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      }
    };

    if (token) fetchUsersCount();
  }, [token]);

  // Fetch completed bookings and calculate total cost for the current month
  useEffect(() => {
    const fetchCompletedBookings = async () => {
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

    if (token) fetchCompletedBookings();
  }, [token]);

  useEffect(() => {
    // Calculate total cost based on the selected month
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

  return (
    <div
      className="container"
      style={{
        padding: "40px",
        backgroundColor: "#f9f9fb",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",            
        flexDirection: "column",   
        justifyContent: "center",  
        alignItems: "center",       
        minHeight: "100vh",         
      }}
    >
      {/* Centered Title */}
      <h1 className="h3 mb-5 " style={{ color: "#333", textAlign: "center" }}>
         DASHBOARD
      </h1>
  
      {error && <Alert variant="danger">{error}</Alert>}
  
      {/* Row 1: Pending, Ongoing, Completed Bookings */}
      <Row className="mb-4" style={{ width: "100%" }}>
        <Col md={4}>
          <Card
            className="shadow-sm"
            style={{
              backgroundColor: "#dfe6e9",
              border: "none",
              borderRadius: "10px",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <Card.Body>
              <Card.Title className="text-center text-dark">
                Pending Bookings
              </Card.Title>
              <Card.Text
                className="text-center"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#e74c3c",
                }}
              >
                {pendingCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="shadow-sm"
            style={{
              backgroundColor: "#f9e79f",
              border: "none",
              borderRadius: "10px",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <Card.Body>
              <Card.Title className="text-center text-dark">
                Ongoing Bookings
              </Card.Title>
              <Card.Text
                className="text-center"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#f39c12",
                }}
              >
                {ongoingCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="shadow-sm"
            style={{
              backgroundColor: "#a9dfbf",
              border: "none",
              borderRadius: "10px",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <Card.Body>
              <Card.Title className="text-center text-dark">
                Completed Bookings
              </Card.Title>
              <Card.Text
                className="text-center"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#2ecc71",
                }}
              >
                {completedCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  
      {/* Row 2: Driver, Vehicle, and User Count */}
      <Row className="mb-4" style={{ width: "100%" }}>
        <Col md={4}>
          <Card
            className="shadow-sm"
            style={{
              backgroundColor: "#f5f6fa",
              border: "none",
              borderRadius: "10px",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <Card.Body>
              <Card.Title className="text-center text-dark">Driver Count</Card.Title>
              <Card.Text
                className="text-center"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#3498db",
                }}
              >
                {driverCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="shadow-sm"
            style={{
              backgroundColor: "#ffbb33",
              border: "none",
              borderRadius: "10px",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <Card.Body>
              <Card.Title className="text-center text-dark">Vehicle Count</Card.Title>
              <Card.Text
                className="text-center"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#9b59b6",
                }}
              >
                {vehicleCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="shadow-sm"
            style={{
              backgroundColor: "#f3a683",
              border: "none",
              borderRadius: "10px",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <Card.Body>
              <Card.Title className="text-center text-dark">User Count</Card.Title>
              <Card.Text
                className="text-center"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#e67e22",
                }}
              >
                {userCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
  
};

export default AdminDashboard;