package com.example.vehiclereservationproject.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.vehiclereservationproject.model.Admin;
import com.example.vehiclereservationproject.util.JwtUtil;
import com.example.vehiclereservationproject.repository.AdminRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // Register Admin using email
    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        try {
            if (adminRepository.findByEmail(admin.getEmail()).isPresent())
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already taken. Please try again");

            admin.setPassword(passwordEncoder.encode(admin.getPassword()));
            Admin savedAdmin = adminRepository.save(admin);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    // Login Admin using email
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin admin) {
        try {
            Admin foundAdmin = adminRepository.findByEmail(admin.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("Admin not found"));

            // Use PasswordEncoder to match the password
            if (passwordEncoder.matches(admin.getPassword(), foundAdmin.getPassword())) {
                // Generate JWT token
                String token = jwtUtil.generateToken(foundAdmin.getEmail());

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("role", "admin");
                response.put("adminId", foundAdmin.getId());

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
