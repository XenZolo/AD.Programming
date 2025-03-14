import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data
    localStorage.removeItem("userToken"); 

    // Redirect to login page
    navigate("/adminLogin"); 
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#003366", fontFamily: "'Arial', sans-serif" }}>
      <div className="container">
        <Link className="navbar-brand" to="/adminDashboard" style={{ color: "#f0f8ff", fontSize: "1.8rem", fontWeight: "bold" }}>
          Admin Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ backgroundColor: "#f0f8ff" }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/adminbookings" 
                style={{ color: "#f0f8ff", fontSize: "1.2rem", fontWeight: "500" }} 
                onMouseEnter={(e) => e.currentTarget.style.color = "#E6C200"} 
                onMouseLeave={(e) => e.currentTarget.style.color = "#f0f8ff"}
              >
                Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/adminDrivers" 
                style={{ color: "#f0f8ff", fontSize: "1.2rem", fontWeight: "500" }} 
                onMouseEnter={(e) => e.currentTarget.style.color = "#E6C200"} 
                onMouseLeave={(e) => e.currentTarget.style.color = "#f0f8ff"}
              >
                Drivers
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/adminVehicles" 
                style={{ color: "#f0f8ff", fontSize: "1.2rem", fontWeight: "500" }} 
                onMouseEnter={(e) => e.currentTarget.style.color = "#E6C200"} 
                onMouseLeave={(e) => e.currentTarget.style.color = "#f0f8ff"}
              >
                Vehicles
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/adminPayments" 
                style={{ color: "#f0f8ff", fontSize: "1.2rem", fontWeight: "500" }} 
                onMouseEnter={(e) => e.currentTarget.style.color = "#E6C200"} 
                onMouseLeave={(e) => e.currentTarget.style.color = "#f0f8ff"}
              >
                Payments
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/adminLogin" 
                style={{ color: "#f0f8ff", fontSize: "1.2rem", fontWeight: "500" }} 
                onMouseEnter={(e) => e.currentTarget.style.color = "#E6C200"} 
                onMouseLeave={(e) => e.currentTarget.style.color = "#f0f8ff"}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={handleLogout} 
                style={{ color: "#f0f8ff", fontSize: "1.2rem", fontWeight: "500" }} 
                onMouseEnter={(e) => e.currentTarget.style.color = "#E6C200"} 
                onMouseLeave={(e) => e.currentTarget.style.color = "#f0f8ff"}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
