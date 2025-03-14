import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // React Router v6
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling

const districtLocations = {
  Colombo: [6.9271, 79.8612],
  Gampaha: [7.084, 80.0098],
  Kandy: [7.2906, 80.6337],
  Galle: [6.0535, 80.221],
  Jaffna: [9.6615, 80.0255],
  Matara: [5.9549, 80.5549],
  Kurunegala: [7.4863, 80.3658],
  Anuradhapura: [8.3114, 80.4037],
  Badulla: [6.9934, 81.055],
  Ratnapura: [6.7056, 80.3847],
};

const AddNewBooking = () => {
  const location = useLocation();
  const { role, userId, token } = location.state || {};
  const navigate = useNavigate(); // Use useNavigate for navigation

  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [cost, setCost] = useState(0); // State to hold the calculated cost
  const [vehicle, setVehicle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  useEffect(() => {
    if (!role || !userId || !token) {
      console.log("Error: Role, User ID, or Token not available.");
      navigate("/login");
    } else {
      //
    }
  }, [role, userId, token]);

  const calculateDistance = (pickupCoords, destinationCoords) => {
    const R = 6371; // Radius of the Earth in km
    const toRad = (angle) => (angle * Math.PI) / 180;

    const lat1 = pickupCoords[0];
    const lon1 = pickupCoords[1];
    const lat2 = destinationCoords[0];
    const lon2 = destinationCoords[1];

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Function to calculate cost
  const calculateCost = (pickupLocation, destinationLocation, vehicle) => {
    if (!pickupLocation || !destinationLocation || !vehicle) return;

    const pickupCoords = districtLocations[pickupLocation];
    const destinationCoords = districtLocations[destinationLocation];
    const distance = calculateDistance(pickupCoords, destinationCoords);

    let costPerKm;

    if (vehicle.toLowerCase() === "car") {
      costPerKm = 300; // Rs. 300 per km for car
    } else if (vehicle.toLowerCase() === "van") {
      costPerKm = 500; // Rs. 500 per km for van
    } else {
      throw new Error("Invalid vehicle type");
    }

    const calculatedCost = distance * costPerKm;
    setCost(calculatedCost); // Update the state with the calculated cost
  };

  // Handle change in Pickup Location
  const handlePickupChange = (event) => {
    const value = event.target.value;
    setPickupLocation(value);
    calculateCost(value, destinationLocation, vehicle); // Recalculate cost
  };

  // Handle change in Destination Location
  const handleDestinationChange = (event) => {
    const value = event.target.value;
    setDestinationLocation(value);
    calculateCost(pickupLocation, value, vehicle); // Recalculate cost
  };

  // Handle change in Vehicle Type
  const handleVehicleChange = (event) => {
    const value = event.target.value;
    setVehicle(value);
    calculateCost(pickupLocation, destinationLocation, value); // Recalculate cost
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get coordinates of selected locations
    const pickupCoords = districtLocations[pickupLocation];
    const destinationCoords = districtLocations[destinationLocation];

    // Calculate distance
    const distance = calculateDistance(pickupCoords, destinationCoords);

    // Calculate cost based on selected vehicle
    let costPerKm;
    if (vehicle.toLowerCase() === "car") {
      costPerKm = 300;
    } else if (vehicle.toLowerCase() === "van") {
      costPerKm = 500;
    } else {
      throw new Error("Invalid vehicle type");
    }
    const calculatedCost = distance * costPerKm;

    // Booking data payload
    const bookingData = {
      phoneNumber,
      pickupLocation,
      destinationLocation,
      status: "pending",
      assignedDriverId: "",
      bookingDate: bookingDate.toString(),
      userId,
      distance: distance.toFixed(2),
      cost: calculatedCost.toFixed(2),
      vehicle,
    };

    try {
      console.log("Sending booking data:", bookingData);

      const response = await fetch("http://localhost:8080/api/bookings/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Booking added successfully!");
        navigate("/customerDashboard", { state: { role, userId, token } });
      } else {
        alert(data.message || "Failed to add booking.");
      }
    } catch (error) {
      console.error("Error adding booking:", error);
      alert("An error occurred while adding the booking.");
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div
        className="container bg-white p-4 p-md-5 rounded shadow-lg"
        style={{ maxWidth: "600px" }}
      >
        {/* Title */}
        <h2 className="text-center mb-4 fw-bold text-dark">Add New Booking</h2>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="row g-3">
          {/* Phone Number */}
          <div className="col-12">
            <label htmlFor="phoneNumber" className="form-label fw-semibold">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="form-control"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Pickup Location */}
          <div className="col-12">
            <label htmlFor="pickupLocation" className="form-label fw-semibold">
              Pickup Location
            </label>
            <select
              id="pickupLocation"
              className="form-select"
              value={pickupLocation}
              onChange={handlePickupChange}
              required
            >
              <option value="">Select Pickup Location</option>
              {Object.keys(districtLocations).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Destination Location */}
          <div className="col-12">
            <label
              htmlFor="destinationLocation"
              className="form-label fw-semibold"
            >
              Destination Location
            </label>
            <select
              id="destinationLocation"
              className="form-select"
              value={destinationLocation}
              onChange={handleDestinationChange}
              required
            >
              <option value="">Select Destination Location</option>
              {Object.keys(districtLocations).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Booking Date */}
          <div className="col-12">
            <label htmlFor="bookingDate" className="form-label fw-semibold">
              Booking Date
            </label>
            <input
              type="datetime-local"
              id="bookingDate"
              className="form-control"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>

          {/* Vehicle Selection */}
          <div className="col-12">
            <label htmlFor="vehicle" className="form-label fw-semibold">
              Vehicle
            </label>
            <select
              id="vehicle"
              className="form-select"
              value={vehicle}
              onChange={handleVehicleChange}
              required
            >
              <option value="">Select Vehicle</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="bus">Truck</option>
            </select>
          </div>

          {/* Estimated Cost */}
          <div className="col-12 text-center">
            <p className="fs-5 fw-bold" style={{ color: "#336699" }}>
              Estimated Cost: Rs. {cost.toFixed(2)}
            </p>
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "#4070B0",
                color: "#fff",
                transition: "0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#305a8d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#4070B0")}
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBooking;
