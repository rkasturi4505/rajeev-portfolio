package com.rajeev.backend.config;

import com.rajeev.backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

                // =========================================================
                // CSRF
                // =========================================================
                .csrf(csrf -> csrf.disable())

                // =========================================================
                // CORS
                // =========================================================
                .cors(cors -> {
                })

                // =========================================================
                // STATELESS JWT SESSION
                // =========================================================
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS))

                // =========================================================
                // AUTHORIZATION RULES
                // =========================================================
                .authorizeHttpRequests(auth -> auth

                        // =================================================
                        // PUBLIC ENDPOINTS
                        // =================================================
                        .requestMatchers(

                                "/api/auth/**",

                                "/api/portfolio/**",

                                "/api/projects/**",

                                "/api/experience/**",

                                "/api/education/**",

                                "/api/skills",

                                "/api/resume",

                                "/api/messages",

                                "/api/analytics/portfolio-view",

                                "/api/analytics/resume-download",

                                "/api/visitor-sessions",

                                "/api/ai/chat",

                                "/api/images/**",

                                "/images/**",

                                "/resume/**",

                                "/certificates/**",

                                "/error"

                        ).permitAll()

                        // =================================================
                        // PROTECTED ADMIN ENDPOINTS
                        // =================================================
                        .requestMatchers(
                                "/api/admin/**",
                                "/api/activity-logs/**"
                        ).authenticated()

                        // =================================================
                        // EVERYTHING ELSE
                        // =================================================
                        .anyRequest().authenticated()

                )

                // =========================================================
                // JWT FILTER
                // =========================================================
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // =============================================================
    // AUTHENTICATION MANAGER
    // =============================================================
    @Bean
    AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }
}