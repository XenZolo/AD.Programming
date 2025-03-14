package com.example.vehiclereservationproject.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.UUID;

@Document(collection = "drivers")
public class Driver {
    @Id
    private String id;
    private String driverId;
    private String name;
    private String phoneNumber;
    private String licenseNumber;
    private String status; // "available", "assigned", "inactive"
    private String email;

    public Driver() {
        this.driverId = "DRV-" + UUID.randomUUID().toString().substring(0, 8);
        this.status = "available"; // Default status
    }

    public Driver(String name, String phoneNumber, String licenseNumber,String email) {
        this();
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.licenseNumber = licenseNumber;
        this.email = email;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDriverId() { return driverId; }
    public void setDriverId(String driverId) { this.driverId = driverId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    
}
