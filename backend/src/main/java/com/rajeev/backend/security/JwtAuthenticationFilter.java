package com.rajeev.backend.security;

import com.rajeev.backend.service.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

        private final JwtService jwtService;

        private final CustomUserDetailsService userDetailsService;

        public JwtAuthenticationFilter(
                        JwtService jwtService,
                        CustomUserDetailsService userDetailsService) {

                this.jwtService = jwtService;
                this.userDetailsService = userDetailsService;

        }

        @Override
        protected void doFilterInternal(

                        @NonNull HttpServletRequest request,

                        @NonNull HttpServletResponse response,

                        @NonNull FilterChain filterChain

        ) throws ServletException, IOException {

                System.out.println("\n======================================");

                System.out.println(
                                "Request URI : "
                                                + request.getRequestURI());

                String authHeader = request.getHeader("Authorization");

                System.out.println(
                                "Authorization Header : "
                                                + authHeader);

                String username = null;

                String token = "";

                try {

                        if (authHeader != null &&
                                        authHeader.startsWith("Bearer ")) {

                                String extractedToken = authHeader.substring(7);

                                if (!extractedToken.isEmpty()) {

                                        token = extractedToken;

                                        System.out.println(
                                                        "JWT Token : "
                                                                        + token);

                                        username = jwtService.extractUsername(
                                                        token);

                                        System.out.println(
                                                        "JWT Username : "
                                                                        + username);

                                }

                        }

                        if (username != null &&

                                        SecurityContextHolder
                                                        .getContext()
                                                        .getAuthentication() == null) {

                                UserDetails userDetails =

                                                userDetailsService
                                                                .loadUserByUsername(username);

                                System.out.println(
                                                "Loaded User : "
                                                                + userDetails.getUsername());

                                System.out.println(
                                                "Authorities : "
                                                                + userDetails.getAuthorities());

                                boolean valid =

                                                !token.isEmpty()
                                                                && jwtService.isTokenValid(
                                                                                token,
                                                                                userDetails);

                                System.out.println(
                                                "JWT Valid : "
                                                                + valid);

                                if (valid) {

                                        UsernamePasswordAuthenticationToken authentication =

                                                        new UsernamePasswordAuthenticationToken(

                                                                        userDetails,

                                                                        null,

                                                                        userDetails.getAuthorities()

                                                        );

                                        authentication.setDetails(

                                                        new WebAuthenticationDetailsSource()

                                                                        .buildDetails(request)

                                        );

                                        SecurityContextHolder

                                                        .getContext()

                                                        .setAuthentication(authentication);

                                        System.out.println(
                                                        "Authentication stored in SecurityContext.");

                                }

                        }

                } catch (Exception e) {

                        System.out.println(
                                        "JWT ERROR:");

                        e.printStackTrace();

                }

                System.out.println(
                                "======================================\n");

                filterChain.doFilter(
                                request,
                                response);

        }

}