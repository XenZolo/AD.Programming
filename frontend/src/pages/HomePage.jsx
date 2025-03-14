import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import taxiImage from "../../public/images/taxi.jpg";
import { useAuth } from "../utils/AuthContext";

const HomePage = () => {
  const { auth } = useAuth();

  // Destructure role, userId, and token from auth
  const { role, userId, token } = auth;

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div className="position-relative">
        <img
          src={taxiImage}
          alt="Taxi Service"
          className="img-fluid w-100"
          style={{
            height: "90vh",
            objectFit: "cover",
            filter: "brightness(60%)",
          }} // added filter for a darker overlay
        />

        {/* Text Overlay */}
        <div
          className="position-absolute text-white text-center fw-bold"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "3rem",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "15px 30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.7)", // added shadow for depth
          }}
        >
          Mega City Cabs - Your Reliable Travel Partner
        </div>

        {/* Call to Action Button */}
        <div
          className="position-absolute text-center"
          style={{
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Link
            to="/newbooking"
            state={{ role: role, userId: userId, token: token }}
          >
            <button
              className="btn fw-bold"
              style={{
                backgroundColor: "#E6C200",
                color: "#222",
                fontSize: "1.2rem",
                padding: "12px 30px",
                borderRadius: "50px", // added rounded button
                transition: "all 0.3s ease-in-out", // smooth hover effect
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Book a Ride
            </button>
          </Link>
        </div>
      </div>

      {/* About Mega Cabs */}
      <div className="container text-center py-5">
        <h2
          className="fw-bold mb-4 text-primary"
          style={{ fontSize: "2.5rem" }}
        >
          Why Choose Mega City Cabs?
        </h2>
        <p className="lead text-muted" style={{ fontSize: "1.1rem" }}>
          At <b>Mega City Cabs</b>, we are committed to providing safe,
          reliable, and comfortable rides at affordable prices. Whether you need
          a quick ride around the city or a long-distance trip, our professional
          drivers and well-maintained vehicles are ready to serve you 24/7.
        </p>
      </div>

      {/* Services Section */}
      <div className="container text-center py-5">
        <h2
          className="fw-bold mb-5 text-primary"
          style={{ fontSize: "2.5rem" }}
        >
          Our Services
        </h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {[
            { title: "Airport Transfers", icon: "✈️" },
            { title: "City Rides", icon: "🚗" },
            { title: "Luxury Cabs", icon: "🚙" },
            { title: "Corporate Travel", icon: "💼" },
            { title: "Outstation Rides", icon: "🌍" },
            { title: "24/7 Availability", icon: "🕒" },
          ].map((service, index) => (
            <div className="col mb-4" key={index}>
              <div
                className="card shadow-lg p-4 border-0 rounded-4"
                style={{
                  backgroundColor: "#4A90E2",
                  color: "#fff",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <div className="text-center mb-3">
                  <div style={{ fontSize: "3rem" }}>{service.icon}</div>
                  <h4 className="fw-bold">{service.title}</h4>
                </div>
                <p className="text-light">
                  Experience smooth and comfortable rides with Mega Cabs.
                  Reliable, safe, and affordable transport for every need.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center py-3"
        style={{ backgroundColor: "#003366", color: "#E6C200" }}
      >
        <p className="m-0">
          📞 Contact Us: 123-456-7890 | ✉️ Email: support@megacitycabs.com
        </p>
      </footer>
    </div>
  );
};

export default HomePage;

// About Us Page
export const AboutUs = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary mb-4" style={{ fontSize: "2rem" }}>
          About Mega City Cabs
        </h2>
        <p className="text-muted">
          Your trusted partner in safe, reliable, and affordable transportation
          since 2010.
        </p>
      </div>

      <div className="row mb-5">
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="fw-bold text-primary mb-3">Why Choose Us?</h4>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-3">
                  <i
                    className="bi bi-check-circle-fill text-success me-3"
                    style={{ fontSize: "1.25rem" }}
                  ></i>
                  <strong>Reliable & Punctual Service</strong> – On-time pickups
                  and drop-offs.
                </li>
                <li className="d-flex align-items-center mb-3">
                  <i
                    className="bi bi-check-circle-fill text-success me-3"
                    style={{ fontSize: "1.25rem" }}
                  ></i>
                  <strong>Wide Range of Vehicles</strong> – From economy to
                  luxury options.
                </li>
                <li className="d-flex align-items-center mb-3">
                  <i
                    className="bi bi-check-circle-fill text-success me-3"
                    style={{ fontSize: "1.25rem" }}
                  ></i>
                  <strong>Professional Drivers</strong> – Ensuring your safety
                  and comfort.
                </li>
                <li className="d-flex align-items-center mb-3">
                  <i
                    className="bi bi-check-circle-fill text-success me-3"
                    style={{ fontSize: "1.25rem" }}
                  ></i>
                  <strong>Affordable Pricing</strong> – No hidden costs,
                  transparent fares.
                </li>
                <li className="d-flex align-items-center mb-3">
                  <i
                    className="bi bi-check-circle-fill text-success me-3"
                    style={{ fontSize: "1.25rem" }}
                  ></i>
                  <strong>24/7 Availability</strong> – We're here whenever you
                  need us.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="fw-bold text-primary mb-3">
                How to Place a Booking Order?
              </h4>
              <ol className="list-decimal ps-4">
                <li>
                  <strong>Register an Account:</strong> Click on the "Sign Up"
                  button and fill in the required details.
                </li>
                <li>
                  <strong>Login to Your Account:</strong> After registration,
                  log in using your credentials.
                </li>
                <li>
                  <strong>Navigate to 'Place a Booking':</strong> Click on the
                  'Place a Booking' option in the navigation bar.
                </li>
                <li>
                  <strong>Fill in Your Booking Details:</strong>
                  <ul className="ms-3">
                    <li>Select your pickup location.</li>
                    <li>Choose your destination.</li>
                    <li>Pick a suitable date and time.</li>
                    <li>Select the vehicle type.</li>
                  </ul>
                </li>
                <li>
                  <strong>Submit Your Booking:</strong> Click the "Submit
                  Booking" button to confirm your ride.
                </li>
                <li>
                  <strong>Update Your Booking (If Needed):</strong> Click the
                  "Update" button to modify your booking details.
                </li>
                <li>
                  <strong>View Completed Bookings:</strong> On your dashboard,
                  click "Completed Bookings" to check your ride history.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h4 className="fw-bold text-primary mb-4">Contact Us</h4>
        <p className="text-muted">
          Have questions? We’re here to assist you 24/7.
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:support@megacitycabs.com"
            className="text-decoration-none text-primary"
          >
            support@megacitycabs.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a
            href="tel:+1234567890"
            className="text-decoration-none text-primary"
          >
            +1 234 567 890
          </a>
        </p>
      </div>
    </div>
  );
};

// Contact Us Page
export const ContactUs = () => {
  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-4">Contact Us</h2>
      <p className="text-center">
        Have a question or need help? Get in touch with us!
      </p>
      <div className="text-center">
        <p>📍 Location: 123 Main Street, Your City</p>
        <p>📞 Phone: 123-456-7890</p>
        <p>✉️ Email: support@megacitycabs.com</p>
      </div>
    </div>
  );
};
