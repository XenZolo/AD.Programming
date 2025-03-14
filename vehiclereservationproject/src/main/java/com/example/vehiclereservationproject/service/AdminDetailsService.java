package com.example.vehiclereservationproject.service;

import com.example.vehiclereservationproject.model.Admin;
import com.example.vehiclereservationproject.repository.AdminRepository;
import lombok.AllArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Here, "email" is used as the unique identifier
        String lowerCaseEmail = email.toLowerCase();
        return adminRepository.findByEmail(lowerCaseEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found with email: " + lowerCaseEmail));
    }
}
