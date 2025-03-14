import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap"; 
import { useLocation, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

const Dashboard = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  const { role, userId, token } = location.state || {}; 

  useEffect(() => {
    if (!role || !userId || !token) {
      console.log("Error: Role, User ID, or Token not available.");
      alert("Please login to the System");
      navigate('/login');
    } else {
      console.log("User Role:", role);
      console.log("User ID:", userId);
      console.log("User token:", token);
    }
  }, [role, userId, token]);

  useEffect(() => {
    const fetchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/bookings/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (Array.isArray(response.data)) {
                // Filter bookings based on status
                const filteredBookings = response.data.filter(booking => 
                    booking.status === 'assigned' || 
                    booking.status === 'pending' || 
                    booking.status === 'ongoing'
                );
                setBookings(filteredBookings);
            } else {
                console.error("Expected an array, but got:", typeof response.data);
                setError("Unexpected response format. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setError("Error fetching bookings: " + (error.response?.data?.message || error.message));
        }
    };

    if (token) {
        fetchBookings();
    } else {
        console.error("No token available.");
    }
}, [userId, token]);

  // Handle Update Button
  const handleUpdate = (bookingId) => {
    console.log("Updating booking with ID:", bookingId);
    navigate("/updatebooking", { state: { role: role, userId: userId ,token:token,bookingId:bookingId} });
  };

  const handleDelete = (bookingId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this booking?");
    if (isConfirmed) {
      console.log("Deleting booking with ID:", bookingId);

      // Send delete request to the API
      axios
        .delete("http://localhost:8080/api/bookings/deleteByBookingId", {
          data: { bookingId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Booking deleted:", response.data);
          // After deletion, remove the booking from the local state
          setBookings(bookings.filter((booking) => booking.bookingId !== bookingId));
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
        });
    } else {
      console.log("Booking deletion canceled.");
    }
  };


  return (
    <div className="container-fluid bg-light min-vh-100">
      {/* Header Section */}
      <div className="bg-white text-white py-4">
  <div className="container flex flex-col items-center">
    {/* Centered Heading */}
    <h1 className="text-black text-center font-bold" style={{ fontSize: "1.8rem" }}>
      PENDING BOOKINGS
    </h1>

    {/* Button Container */}
    <div className="w-full flex justify-between mt-4">
      {/* Left Button */}
      <Link to="/customerCompletedBookings" state={{ userId, token }}>
        <Button style={{ backgroundColor: "#4070B0", color: "#fff" }}>Completed Bookings</Button>
      </Link>

      {/* Right Button */}
      <Link to="/newbooking" state={{ role, userId, token }}>
        <Button style={{ backgroundColor: "#4070B0", color: "#fff" ,marginRight:"10px" }} className="mr-2">Add New Booking</Button>
      </Link>
    </div>
  </div>
</div>



      {/* Booking Table Section */}
      <div className="container py-5">
        <Table
          striped
          bordered
          hover
          responsive
          variant="light"
          className="shadow-sm"
        >
          <thead className="table-primary">
            <tr>
              <th>Booking ID</th>
              <th>Pickup Location</th>
              <th>Destination Location</th>
              <th>Order Status</th>
              <th>Assigned Driver</th>
              <th>Booking Date</th>
              <th>Distance</th>
              <th>Cost</th>
              <th>Vehicle type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(bookings) ? (
    bookings.map((booking) => (
      <tr key={booking.bookingId}>
        <td>{booking.bookingId}</td>
        <td>{booking.pickupLocation}</td>
        <td>{booking.destinationLocation}</td>
        <td>{booking.status}</td>
        <td>{booking.assignedDriverId || "N/A"}</td>
        <td>{new Date(booking.bookingDate).toLocaleString()}</td>
        <td>{booking.distance ? parseFloat(booking.distance).toFixed(2) : "N/A"}</td>
        <td>{booking.cost ? parseFloat(booking.cost).toFixed(2) : "N/A"}</td>
        <td>{booking.vehicle}</td>
        <td>
          <div className="d-flex justify-content-start">
            <Button
              onClick={() => handleUpdate(booking.bookingId)}
              variant="success"
              className="me-2"
            >
              Update
            </Button>
            <Button
              onClick={() => handleDelete(booking.bookingId)}
              variant="danger"
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="10">No bookings available.</td>
    </tr>
  )}
</tbody>

        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
