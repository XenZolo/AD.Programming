package com.example.vehiclereservationproject.repository;

import com.example.vehiclereservationproject.model.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface DriverRepository extends MongoRepository<Driver, String> {
    List<Driver> findByStatus(String status);
    Optional<Driver> findByEmail(String email);
}
