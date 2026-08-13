package com.rajeev.backend.config;

import com.rajeev.backend.model.ChatbotKnowledge;
import com.rajeev.backend.repository.ChatbotKnowledgeRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class ChatbotDataLoader {


    @Bean
    CommandLineRunner loadChatbotData(
            ChatbotKnowledgeRepository repository
    ) {

        return args -> {


            if (repository.count() == 0) {


                repository.save(
                    new ChatbotKnowledge(
                        "Skills",
                        "skills",
                        "Rajeev has experience in Java, Spring Boot, Microservices, REST APIs, Docker, Kubernetes, AWS, Azure, Jenkins, Git and React.",
                        "PUBLIC",
                        true,
                        "skills,skill,technology,technologies,tech,stack,tools,frameworks,java,spring,spring boot,microservices"
                    )
                );



                repository.save(
                    new ChatbotKnowledge(
                        "Experience",
                        "experience",
                        "Rajeev is a Senior Java Developer with 9+ years of experience working on enterprise applications using Java, Spring Boot, Microservices and cloud technologies.",
                        "PUBLIC",
                        true,
                        "experience,career,work,company,job,professional,years,background"
                    )
                );



                repository.save(
                    new ChatbotKnowledge(
                        "Projects",
                        "projects",
                        "Rajeev has worked on enterprise projects in insurance and financial domains using Java, Spring Boot, Microservices, REST APIs and cloud technologies.",
                        "PUBLIC",
                        true,
                        "project,projects,application,client,domain,product,system"
                    )
                );



                repository.save(
                    new ChatbotKnowledge(
                        "Education",
                        "education",
                        "Rajeev completed his B.Tech in Information Technology from JNTU University.",
                        "PUBLIC",
                        true,
                        "education,degree,college,university,qualification,study"
                    )
                );



                repository.save(
                    new ChatbotKnowledge(
                        "Contact",
                        "contact",
                        "For professional communication, please connect with Rajeev through LinkedIn.",
                        "PUBLIC",
                        true,
                        "contact,email,phone,mobile,number,linkedin,reach"
                    )
                );



                repository.save(
                    new ChatbotKnowledge(
                        "Certification",
                        "certifications",
                        "Rajeev has certifications related to Cloud Computing and DevOps training.",
                        "PUBLIC",
                        true,
                        "certificate,certification,certifications,course,training,cloud,devops"
                    )
                );


            }

        };

    }

}