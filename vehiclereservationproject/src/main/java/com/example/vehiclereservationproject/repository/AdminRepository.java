package com.example.vehiclereservationproject.repository;

import com.example.vehiclereservationproject.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findByEmail(String email);  // Finding by email instead of username
}
