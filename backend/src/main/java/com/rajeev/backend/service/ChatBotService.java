package com.rajeev.backend.service;

import org.springframework.stereotype.Service;

@Service
public class ChatBotService {

    public String getReply(String question) {

        String q = question.toLowerCase();

        if (q.contains("skill")) {
            return "Rajeev has 9+ years of experience in Java, Spring Boot, Microservices, REST APIs, Docker, Kubernetes, AWS, Azure, Jenkins, Git, Maven and React.";
        }

        if (q.contains("experience")) {
            return "Rajeev is a Senior Java Developer with over 9 years of experience building enterprise applications using Java, Spring Boot and Microservices.";
        }

        if (q.contains("project")) {
            return "Rajeev has worked on enterprise projects including MetLife Insurance and DTCC, focusing on backend development and cloud technologies.";
        }

        if (q.contains("education")) {
            return "Rajeev completed his B.Tech in Information Technology from JNTU University.";
        }

        if (q.contains("contact")) {
            return "You can contact Rajeev through the Contact section of this portfolio or LinkedIn.";
        }

        return "I can answer questions about Rajeev's experience, skills, projects, certifications, education and contact information.";
    }
}