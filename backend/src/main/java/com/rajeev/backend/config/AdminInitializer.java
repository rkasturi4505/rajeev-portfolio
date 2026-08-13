package com.rajeev.backend.config;

import com.rajeev.backend.model.Admin;
import com.rajeev.backend.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class AdminInitializer {


    @Bean
    CommandLineRunner createAdmin(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder
    ) {


        return args -> {


            if(adminRepository.count() == 0) {


                Admin admin = new Admin();


                admin.setUsername("rajeev");


                admin.setPassword(
                        passwordEncoder.encode("Rajeev@123")
                );


                admin.setRole("ADMIN");


                adminRepository.save(admin);


                System.out.println(
                        "Default admin created successfully"
                );


            }


        };


    }

}