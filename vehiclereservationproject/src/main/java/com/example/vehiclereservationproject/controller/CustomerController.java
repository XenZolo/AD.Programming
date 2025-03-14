package com.example.vehiclereservationproject.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.vehiclereservationproject.model.Customer;
import com.example.vehiclereservationproject.util.JwtUtil;
import com.example.vehiclereservationproject.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Optional;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@AllArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;  // Inject JwtUtil

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Customer user) {
        try {
            if (customerRepository.findByUsername(user.getUsername()).isPresent())
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken. Please try again");

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            Customer savedCustomer = customerRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomer);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Customer user) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
    
            SecurityContextHolder.getContext().setAuthentication(authentication);
    
            // Retrieve the authenticated user from the database
            Customer authenticatedUser = customerRepository.findByUsername(user.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
    
            System.out.println("Authenticated user: " + authenticatedUser);
    
            // Now, we can get the correct userId
            String userId = authenticatedUser.getId();
    
            // Generate JWT token
            String token = jwtUtil.generateToken(user.getUsername());
    
            // Define user role as "customer"
            String userRole = "customer";
    
            // Create response object
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", userRole);
            response.put("userId", userId);
    
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
    
}
