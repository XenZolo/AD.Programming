package com.example.vehiclereservationproject.controller;

import com.example.vehiclereservationproject.model.User;
import com.example.vehiclereservationproject.repository.UserRepository;
import com.example.vehiclereservationproject.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(UserController.class) // Load only the web layer
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private AuthenticationManager authenticationManager;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        // Mock JWT token generation
        when(jwtUtil.generateToken(anyString())).thenReturn("mocked-jwt-token");
    }

    @Test
    public void testLoginSuccess() throws Exception {
        // Arrange
        String email = "testUser@example.com";
        String password = "usepassword123";
        User user = User.builder()
                .id("12345")
                .email(email)
                .password(passwordEncoder.encode(password))
                .userRole("USER")
                .build();

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(password, user.getPassword())).thenReturn(true);

        // Act & Assert
        mockMvc.perform(post("/api/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\", \"password\":\"" + password + "\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("mocked-jwt-token"))
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.userId").value("12345"));
    }

    @Test
    public void testLoginFailure_InvalidCredentials() throws Exception {
        // Arrange
        String email = "test@example.com";
        String password = "wrongpassword";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(post("/api/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\", \"password\":\"" + password + "\"}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testLoginFailure_IncorrectPassword() throws Exception {
        // Arrange
        String email = "testUser@example.com";
        String password = "incorrectpassword";
        User user = User.builder()
                .id("12345")
                .email(email)
                .password(passwordEncoder.encode("correctpassword"))
                .userRole("USER")
                .build();

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(password, user.getPassword())).thenReturn(false);

        // Act & Assert
        mockMvc.perform(post("/api/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\", \"password\":\"" + password + "\"}"))
                .andExpect(status().isUnauthorized());
    }
}
