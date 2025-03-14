package com.example.vehiclereservationproject.controller;

import com.example.vehiclereservationproject.model.Driver;
import com.example.vehiclereservationproject.model.DriverLogin;
import com.example.vehiclereservationproject.service.DriverService;
import com.example.vehiclereservationproject.service.DriverLoginService;
import com.example.vehiclereservationproject.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @Autowired
    private DriverLoginService driverLoginService;

    @Autowired
    private JwtUtil jwtUtil;

    // Add a new driver
    @PostMapping("/add")
    public ResponseEntity<?> addDriver(@RequestBody Driver driver) {
        return ResponseEntity.ok(driverService.addDriver(driver));
    }

    // Get all drivers
    @GetMapping("/all")
    public ResponseEntity<?> getAllDrivers() {
        return ResponseEntity.ok(driverService.getAllDrivers());
    }

    // Get driver by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getDriverById(@PathVariable String id) {
        Optional<Driver> driver = driverService.getDriverById(id);
        return driver.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get available drivers
    @GetMapping("/available")
    public ResponseEntity<?> getAvailableDrivers() {
        return ResponseEntity.ok(driverService.getAvailableDrivers());
    }

    // Update a driver's information
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDriver(@PathVariable String id, @RequestBody Driver driver) {
        Driver updatedDriver = driverService.updateDriver(id, driver);
        return updatedDriver != null ? ResponseEntity.ok(updatedDriver) : ResponseEntity.notFound().build();
    }

    // Delete a driver
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDriver(@PathVariable String id) {
        return driverService.deleteDriver(id) ? ResponseEntity.ok("Driver deleted") : ResponseEntity.notFound().build();
    }

//     @PostMapping("/login")
// public ResponseEntity<?> loginDriver(@RequestBody DriverLogin loginRequest) {
//     // Log the login request for debugging
//     System.out.println("Login attempt for driverId: " + loginRequest.getDriverId());

//     String driverId = loginRequest.getDriverId();
//     // Authenticate the driver
//     boolean isAuthenticated = driverLoginService.authenticateDriver(loginRequest.getDriverId(), loginRequest.getPassword());

//     if (!isAuthenticated) {
//         return ResponseEntity.status(401).body("Invalid driverId or password");
//     }

//     // If authentication is successful, generate a JWT token
//     String token = jwtUtil.generateToken(loginRequest.getDriverId());

//     // Define user role as "driver"
//     String userRole = "driver";

//     // Create response object with token and role
//     Map<String, Object> response = new HashMap<>();
//     response.put("token", token);
//     response.put("role", userRole);
//     response.put("driverId", driverId);

//     return ResponseEntity.ok(response);
// }

}
