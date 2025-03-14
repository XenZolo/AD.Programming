import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import taxiImage from '../../public/images/taxi.jpg'; 
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert('Registration successful!');
        setFormData({ username: '', email: '', phoneNumber: '', password: '', confirmPassword: '' });
        navigate("/login");

      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to register. Please try again.');
    }
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
            <h3 className="text-center mb-4 fw-bold">Create an Account</h3>

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control bg-light text-dark border-primary"
                  placeholder="Enter your username"
                  required
                />
              </div>

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

              {/* Phone Number */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-control bg-light text-dark border-primary"
                  placeholder="Enter phone number"
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

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control bg-light text-dark border-primary"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {/* Register Button */}
              <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#003366", color: "#ffffff" }} disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="text-center mt-3">
              <small>Already have an account? <Link to="/login" className="fw-bold" style={{ color: "#003366" }}>Login</Link></small>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


export default Register;
