import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import taxiImage from "../../public/images/taxi.jpg"; 

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const text = await response.text(); 
      let data;
  
      try {
        data = JSON.parse(text); 
      } catch (error) {
        console.error("Response is not valid JSON:", text);
        throw new Error("Invalid response from server.");
      }
  
      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
  
        if (data.role === "USER") {
          navigate("/customerDashboard", {
            state: { role: data.role, userId: data.userId, token: data.token },
          });
        } else if (data.role === "DRIVER") {
          navigate("/driverDashboard", {
            state: { role: data.role, userId: data.userId, token: data.token },
          });
        } else {
          alert("You do not have access to the customer dashboard.");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  
    setLoading(false);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        {/* Left Side (Image - 60%) */}
        <div className="col-md-7 d-flex align-items-center justify-content-center position-relative p-0">
          <img 
            src={taxiImage} 
            alt="Taxi" 
            className="img-fluid w-100 h-100" 
            style={{ objectFit: "cover", filter: "brightness(0.7)" }}
          />
          {/* Overlay text */}
          <div className="position-absolute text-white fw-bold" style={{
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "3rem",
            padding: "10px 20px",
            borderRadius: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }}>
            Mega City Cabs
          </div>
        </div>

        {/* Right Side (Form - 40%) */}
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <div className="card shadow-lg p-4 border-0 w-75" style={{ backgroundColor: "#f0f8ff", color: "#003366" }}>
            <h3 className="text-center mb-4 fw-bold">Login to Your Account</h3>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control bg-light text-dark border-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control bg-light text-dark border-primary"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Login Button */}
              <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#003366", color: "#ffffff" }} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="text-center mt-3">
              <small>Don't have an account? <Link to="/register" className="fw-bold" style={{ color: "#003366" }}>Register</Link></small>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;