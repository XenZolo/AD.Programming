package com.example.vehiclereservationproject.repository;

import com.example.vehiclereservationproject.model.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VehicleRepository extends MongoRepository<Vehicle, String> {
    Optional<Vehicle> findByVehicleNumber(String vehicleNumber);
}
