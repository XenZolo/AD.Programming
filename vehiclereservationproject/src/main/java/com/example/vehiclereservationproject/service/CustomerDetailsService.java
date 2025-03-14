// package com.example.vehiclereservationproject.service;

// import com.example.vehiclereservationproject.model.Customer;
// import com.example.vehiclereservationproject.repository.CustomerRepository;
// import lombok.AllArgsConstructor;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// @Service
// @AllArgsConstructor
// public class CustomerDetailsService implements UserDetailsService {

//     private final CustomerRepository customerRepository;
//     private static final Logger logger = LoggerFactory.getLogger(CustomerDetailsService.class);

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         String lowerCaseUsername = username.toLowerCase();  // Convert to lowercase
//         logger.debug("Attempting to load user with username: {}", lowerCaseUsername);  // Log the input username

//         try {
//             // Log the query execution
//             logger.debug("Searching for customer in the repository with username: {}", lowerCaseUsername);
//             return customerRepository.findByUsername(lowerCaseUsername)
//                     .orElseThrow(() -> {
//                         logger.error("User not found with username: {}", lowerCaseUsername); // Log error
//                         return new UsernameNotFoundException("User not found with username: " + lowerCaseUsername);
//                     });
//         } catch (Exception e) {
//             // Log any exception that occurs during the query
//             logger.error("An error occurred while loading the user with username: {}", lowerCaseUsername, e);
//             throw e;
//         }
//     }
// }
