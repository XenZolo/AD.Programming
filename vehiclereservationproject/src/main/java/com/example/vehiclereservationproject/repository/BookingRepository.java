package com.example.vehiclereservationproject.repository;

import com.example.vehiclereservationproject.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByUserId(String userId);
    Optional<Booking> findByBookingId(String bookingId);
    List<Booking> findByAssignedDriverId(String assignedDriverId);

    
}
