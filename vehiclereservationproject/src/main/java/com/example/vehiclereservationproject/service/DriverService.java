package com.example.vehiclereservationproject.service;

import com.example.vehiclereservationproject.model.Driver;
import com.example.vehiclereservationproject.model.DriverLogin;
import com.example.vehiclereservationproject.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private DriverLoginService driverLoginService;

    public Driver addDriver(Driver driver) {
        // Check if an email already exists
        Optional<Driver> existingDriver = driverRepository.findByEmail(driver.getEmail());
        if (existingDriver.isPresent()) {
            throw new RuntimeException("A driver with this email already exists!");
        }

        // Save the driver first
        Driver savedDriver = driverRepository.save(driver);

        // Create a driver login with driverId and licenseNumber as the password
        DriverLogin driverLogin = driverLoginService.createDriverLogin(savedDriver.getDriverId(), savedDriver.getLicenseNumber());

        // Optional: You can return the saved driver with its login or just the driver itself
        return savedDriver;
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Optional<Driver> getDriverById(String id) {
        return driverRepository.findById(id);
    }

    public List<Driver> getAvailableDrivers() {
        return driverRepository.findByStatus("available");
    }

    public Driver updateDriver(String id, Driver updatedDriver) {
        return driverRepository.findById(id).map(existingDriver -> {
            existingDriver.setName(updatedDriver.getName());
            existingDriver.setPhoneNumber(updatedDriver.getPhoneNumber());
            existingDriver.setLicenseNumber(updatedDriver.getLicenseNumber());
            existingDriver.setStatus(updatedDriver.getStatus());
            return driverRepository.save(existingDriver);
        }).orElse(null);
    }

    public boolean deleteDriver(String id) {
        if (driverRepository.existsById(id)) {
            driverRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
