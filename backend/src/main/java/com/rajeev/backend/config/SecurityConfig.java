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

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {

                http

                                .csrf(csrf -> csrf.disable())

                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))

                                .authorizeHttpRequests(auth -> auth

                                                // ============================
                                                // PUBLIC ENDPOINTS
                                                // ============================
                                                .requestMatchers(

                                                                "/api/auth/**",

                                                                "/api/portfolio/**",

                                                                "/api/projects/**",

                                                                "/api/experience/**",

                                                                "/api/education/**",

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

                                                // ============================
                                                // ADMIN ENDPOINTS
                                                // ============================
                                                .requestMatchers("/api/admin/**")
                                                .authenticated()

                                                // ============================
                                                // EVERYTHING ELSE
                                                // ============================
                                                .anyRequest()
                                                .authenticated()

                                )

                                .addFilterBefore(
                                                jwtAuthenticationFilter,
                                                UsernamePasswordAuthenticationFilter.class);

                return http.build();

        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(List.of(
                                "https://rajeev-kumar-portfolio-omega.vercel.app",
                                "http://localhost:5173" // adjust to match your local dev port if different
                ));
                configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(List.of("*"));
                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }

        @Bean
        AuthenticationManager authenticationManager(
                        AuthenticationConfiguration configuration) throws Exception {

                return configuration.getAuthenticationManager();

        }

}