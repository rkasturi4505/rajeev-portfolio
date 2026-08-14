package com.rajeev.backend.config;

import com.rajeev.backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {

                http

                                // ==========================================================
                                // CSRF
                                // ==========================================================

                                .csrf(csrf -> csrf.disable())

                                // ==========================================================
                                // CORS
                                // ==========================================================

                                .cors(cors -> {
                                })

                                // ==========================================================
                                // STATELESS JWT SESSION
                                // ==========================================================

                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))

                                // ==========================================================
                                // AUTHORIZATION
                                // ==========================================================

                                .authorizeHttpRequests(auth -> auth

                                                // ==================================================
                                                // PUBLIC AUTHENTICATION
                                                // ==================================================

                                                .requestMatchers(
                                                                "/api/auth/**")
                                                .permitAll()

                                                // ==================================================
                                                // PUBLIC PORTFOLIO APIs
                                                // ==================================================

                                                .requestMatchers(
                                                                "/api/portfolio/**",
                                                                "/api/projects/**",
                                                                "/api/experience/**",
                                                                "/api/education/**",
                                                                "/api/skills",
                                                                "/api/resume",
                                                                "/api/messages",
                                                                "/api/ai/chat")
                                                .permitAll()

                                                // ==================================================
                                                // PUBLIC STATIC RESOURCES
                                                // ==================================================

                                                .requestMatchers(
                                                                "/api/images/**",
                                                                "/images/**",
                                                                "/resume/**",
                                                                "/certificates/**",
                                                                "/error")
                                                .permitAll()

                                                // ==================================================
                                                // PUBLIC ANALYTICS TRACKING
                                                //
                                                // These are called by PUBLIC visitors.
                                                // ==================================================

                                                .requestMatchers(
                                                                HttpMethod.POST,
                                                                "/api/analytics/portfolio-view")
                                                .permitAll()

                                                .requestMatchers(
                                                                HttpMethod.POST,
                                                                "/api/analytics/resume-download")
                                                .permitAll()

                                                .requestMatchers(
                                                                HttpMethod.POST,
                                                                "/api/portfolio-views")
                                                .permitAll()

                                                .requestMatchers(
                                                                HttpMethod.POST,
                                                                "/api/resume-downloads")
                                                .permitAll()

                                                .requestMatchers(
                                                                HttpMethod.POST,
                                                                "/api/visitor-sessions")
                                                .permitAll()

                                                // ==================================================
                                                // ADMIN ANALYTICS
                                                // ==================================================

                                                .requestMatchers(
                                                                "/api/admin/**")
                                                .authenticated()

                                                .requestMatchers(
                                                                HttpMethod.GET,
                                                                "/api/analytics/**")
                                                .authenticated()

                                                .requestMatchers(
                                                                HttpMethod.GET,
                                                                "/api/portfolio-views")
                                                .authenticated()

                                                .requestMatchers(
                                                                HttpMethod.GET,
                                                                "/api/resume-downloads")
                                                .authenticated()

                                                // ==================================================
                                                // VISITOR SESSIONS
                                                //
                                                // Creating a session is public.
                                                // Reading/searching/deleting is ADMIN ONLY.
                                                // ==================================================

                                                .requestMatchers(
                                                                HttpMethod.GET,
                                                                "/api/visitor-sessions",
                                                                "/api/visitor-sessions/**")
                                                .authenticated()

                                                .requestMatchers(
                                                                HttpMethod.DELETE,
                                                                "/api/visitor-sessions/**")
                                                .authenticated()

                                                // ==================================================
                                                // VISITOR ANALYTICS
                                                // ==================================================

                                                .requestMatchers(
                                                                "/api/visitor-sessions/analytics",
                                                                "/api/visitor-trends/**")
                                                .authenticated()

                                                // ==================================================
                                                // ANALYTICS CHARTS
                                                // ==================================================

                                                .requestMatchers(
                                                                "/api/analytics/charts/**")
                                                .authenticated()

                                                // ==================================================
                                                // ACTIVITY LOGS
                                                // ==================================================

                                                .requestMatchers(
                                                                "/api/activity-logs/**")
                                                .authenticated()

                                                // ==================================================
                                                // ADMIN / MANAGEMENT APIs
                                                // ==================================================

                                                .requestMatchers(
                                                                "/api/admin/**")
                                                .authenticated()

                                                // ==================================================
                                                // EVERYTHING ELSE
                                                // ==================================================

                                                .anyRequest().authenticated())

                                // ==========================================================
                                // JWT FILTER
                                // ==========================================================

                                .addFilterBefore(
                                                jwtAuthenticationFilter,
                                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        // ==============================================================
        // AUTHENTICATION MANAGER
        // ==============================================================

        @Bean
        public AuthenticationManager authenticationManager(
                        AuthenticationConfiguration configuration)
                        throws Exception {

                return configuration.getAuthenticationManager();
        }


        @Bean
public CorsConfigurationSource corsConfigurationSource() {

    CorsConfiguration configuration = new CorsConfiguration();

    configuration.setAllowedOrigins(List.of(
            "http://localhost:5173",
            "https://YOUR-VERCEL-DOMAIN.vercel.app"
    ));

    configuration.setAllowedMethods(List.of(
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "OPTIONS"
    ));

    configuration.setAllowedHeaders(List.of(
            "Authorization",
            "Content-Type",
            "Accept",
            "Origin"
    ));

    configuration.setExposedHeaders(List.of(
            "Authorization"
    ));

    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/**", configuration);

    return source;
}
}