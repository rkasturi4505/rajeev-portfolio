package com.rajeev.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private SecretKey signingKey;

    @PostConstruct
    public void init() {

        signingKey = Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(secret));

    }

    public String extractUsername(
            @NonNull String token) {

        return extractClaim(
                token,
                claims -> claims.getSubject());

    }

    public <T> T extractClaim(
            @NonNull String token,
            @NonNull Function<Claims, T> claimsResolver) {

        Claims claims = extractAllClaims(token);

        return claimsResolver.apply(
                claims);

    }

    public String generateToken(
            @NonNull UserDetails userDetails) {

        return Jwts.builder()

                .subject(
                        userDetails.getUsername())

                .issuedAt(
                        new Date())

                .expiration(

                        new Date(

                                System.currentTimeMillis()
                                        + jwtExpiration

                        )

                )

                .signWith(
                        signingKey)

                .compact();

    }

    public boolean isTokenValid(

            @NonNull String token,

            @NonNull UserDetails userDetails

    ) {

        String username = extractUsername(token);

        return username.equals(
                userDetails.getUsername())

                && !isTokenExpired(token);

    }

    private boolean isTokenExpired(
            @NonNull String token) {

        return extractExpiration(token)
                .before(new Date());

    }

    private Date extractExpiration(
            @NonNull String token) {

        return extractClaim(
                token,
                claims -> claims.getExpiration());

    }

    private Claims extractAllClaims(
            @NonNull String token) {

        return Jwts.parser()

                .verifyWith(
                        signingKey)

                .build()

                .parseSignedClaims(token)

                .getPayload();

    }

}