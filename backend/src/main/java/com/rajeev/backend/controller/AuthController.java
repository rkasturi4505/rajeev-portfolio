package com.rajeev.backend.controller;

import com.rajeev.backend.dto.LoginRequest;
import com.rajeev.backend.dto.LoginResponse;
import com.rajeev.backend.security.JwtService;
import com.rajeev.backend.service.AnalyticsService;
import com.rajeev.backend.service.CustomUserDetailsService;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

        private final AuthenticationManager authenticationManager;

        private final JwtService jwtService;

        private final AnalyticsService analyticsService;

        private final CustomUserDetailsService customUserDetailsService;

        public AuthController(

                        AuthenticationManager authenticationManager,

                        JwtService jwtService,

                        AnalyticsService analyticsService,

                        CustomUserDetailsService customUserDetailsService

        ) {

                this.authenticationManager = authenticationManager;

                this.jwtService = jwtService;

                this.analyticsService = analyticsService;

                this.customUserDetailsService = customUserDetailsService;

        }

        // ==========================================================
        // ADMIN LOGIN
        // ==========================================================

        @PostMapping("/login")
        public LoginResponse login(
                        @RequestBody @NonNull LoginRequest request) {

                authenticationManager.authenticate(

                                new UsernamePasswordAuthenticationToken(

                                                request.getUsername(),

                                                request.getPassword()

                                )

                );

                UserDetails userDetails = customUserDetailsService
                                .loadUserByUsername(
                                                request.getUsername());

                if (userDetails == null) {

                        throw new RuntimeException(
                                        "User details not found");

                }

                String token = jwtService.generateToken(
                                userDetails);

                analyticsService.incrementMetric(
                                "admin_logins");

                return new LoginResponse(
                                token,
                                "Login Successful");

        }
}
