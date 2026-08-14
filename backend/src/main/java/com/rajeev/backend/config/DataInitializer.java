package com.rajeev.backend.config;

import com.rajeev.backend.entity.User;
import com.rajeev.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Value("${portfolio.admin.username}")
    private String username;

    @Value("${portfolio.admin.email}")
    private String email;

    @Value("${portfolio.admin.password}")
    private String password;

    @Value("${portfolio.admin.role}")
    private String role;

    @Bean
    public CommandLineRunner initAdminUser(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            User admin = userRepository.findByUsername(username)
                    .orElse(null);

            if (admin == null) {

                admin = new User();

                admin.setUsername(username);
                admin.setEmail(email);
                admin.setPassword(passwordEncoder.encode(password));
                admin.setRole(role);
                admin.setEnabled(true);

                userRepository.save(admin);

                System.out.println("========================================");
                System.out.println("Admin user created successfully");
                System.out.println("Username : " + username);
                System.out.println("Role     : " + role);
                System.out.println("========================================");

            } else {

                System.out.println("Admin user already exists");

                /*
                 * Update password from ADMIN_PASSWORD.
                 * This allows the Render environment variable
                 * to control the admin password.
                 */
                if (!passwordEncoder.matches(password, admin.getPassword())) {

                    admin.setPassword(passwordEncoder.encode(password));
                    admin.setEmail(email);
                    admin.setRole(role);
                    admin.setEnabled(true);

                    userRepository.save(admin);

                    System.out.println("========================================");
                    System.out.println("Admin password updated successfully");
                    System.out.println("Username : " + username);
                    System.out.println("========================================");

                } else {

                    System.out.println("Admin password is already up to date");
                }
            }
        };
    }
}