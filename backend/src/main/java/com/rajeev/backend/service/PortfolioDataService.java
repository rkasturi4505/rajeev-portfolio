package com.rajeev.backend.service;

import com.rajeev.backend.entity.EducationEntity;
import com.rajeev.backend.entity.SkillEntity;
import com.rajeev.backend.model.Certification;
import com.rajeev.backend.model.Experience;
import com.rajeev.backend.model.Portfolio;
import com.rajeev.backend.model.Profile;
import com.rajeev.backend.model.Project;
import com.rajeev.backend.repository.EducationRepository;
import com.rajeev.backend.repository.SkillRepository;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class PortfolioDataService {

        private final SkillRepository skillRepository;
        private final EducationRepository educationRepository;

        public PortfolioDataService(
                        SkillRepository skillRepository,
                        EducationRepository educationRepository) {

                this.skillRepository = skillRepository;
                this.educationRepository = educationRepository;
        }

        /**
         * =========================================================
         * GET ALL PROJECTS
         * =========================================================
         */
        public List<Project> getProjects() {

                List<Project> projects = Arrays.asList(

                                /*
                                 * =====================================================
                                 * DTCC
                                 * =====================================================
                                 */
                                new Project(
                                                "DTCC",
                                                "Tata Consultancy Services",
                                                "Senior Java Developer",
                                                "Jun 2025 - Present",
                                                "Financial Services",
                                                "30",
                                                "Java 17, Spring Boot, Spring Data JPA, Microservices, Bitbucket",

                                                "Enterprise backend platform supporting financial market infrastructure and mission-critical services.",

                                                "Modernize enterprise backend services to improve scalability, maintainability and API performance while supporting secure financial workflows.",

                                                "Designed and developed REST APIs using Spring Boot. Implemented Microservices, optimized SQL queries, participated in code reviews, resolved production issues and collaborated with Agile teams.",

                                                "React → Spring Boot → MySQL → Azure",

                                                "Managing enterprise integrations, maintaining backward compatibility, improving API performance and ensuring secure communication.",

                                                "Implemented scalable Spring Boot Microservices, optimized backend processing and improved service modularity using enterprise best practices.",

                                                "Improved application maintainability, enhanced API reliability and supported stable enterprise service delivery.",

                                                "Reduced backend complexity, improved API performance, implemented scalable Microservices architecture and enhanced enterprise service reliability.",

                                                "Enterprise API Design, Microservices Architecture, Cloud Native Development, Performance Optimization and Agile Collaboration."),

                                /*
                                 * =====================================================
                                 * METLIFE INSURANCE
                                 * =====================================================
                                 */
                                new Project(
                                                "MetLife Insurance",
                                                "Tata Consultancy Services",
                                                "Senior Java Developer",
                                                "Jun 2024 - Jun 2025",
                                                "Insurance",
                                                "30",
                                                "Java 8, Spring Boot, Microservices, Azure APIM",

                                                "Developed enterprise insurance applications supporting policy management and digital services.",

                                                "Improve customer experience through secure, scalable and highly available backend services.",

                                                "Developed REST APIs, implemented business logic, integrated enterprise services, fixed production defects and participated in Agile ceremonies.",

                                                "Angular → Spring Boot → Oracle → Azure",

                                                "Handling large-scale integrations, maintaining secure APIs and ensuring high application availability.",

                                                "Enhanced backend services using Spring Boot Microservices and implemented optimized integration patterns.",

                                                "Improved service reliability, reduced issue resolution time and contributed to stable production releases.",

                                                "Developed scalable insurance APIs, improved backend integration efficiency and supported successful production deployments.",

                                                "Insurance Domain Knowledge, Enterprise API Integration, Cloud Services, Secure API Design and Team Collaboration."),

                                /*
                                 * =====================================================
                                 * MCKESSON HEALTHCARE
                                 * =====================================================
                                 */
                                new Project(
                                                "McKesson Healthcare",
                                                "Tata Consultancy Services",
                                                "Senior Java Developer",
                                                "Jan 2023 - Apr 2024",
                                                "Healthcare",
                                                "30",
                                                "Java 8, Spring Boot, Microservices, ServiceNow, Oracle",

                                                "Developed enterprise healthcare backend services supporting clinical and operational workflows.",

                                                "Improve application scalability, maintainability and integration across healthcare systems.",

                                                "Designed REST APIs, developed Microservices, integrated ServiceNow workflows, resolved production issues and participated in Agile development.",

                                                "Angular → Spring Boot → Oracle → Azure",

                                                "Maintaining enterprise integrations, handling secure healthcare data and improving backend performance.",

                                                "Implemented scalable Microservices, optimized service communication and enhanced backend reliability.",

                                                "Improved application stability, reduced operational issues and supported continuous delivery.",

                                                "Implemented caching strategies, automated deployments and improved application performance using Docker and CI/CD practices.",

                                                "Healthcare Domain Knowledge, Microservices, Enterprise Integration, Production Support and Agile Development."),

                                /*
                                 * =====================================================
                                 * HCSC HEALTHCARE
                                 * =====================================================
                                 */
                                new Project(
                                                "HCSC Healthcare",
                                                "Tata Consultancy Services",
                                                "Java Developer",
                                                "Sep 2021 - Dec 2022",
                                                "Healthcare",
                                                "50",
                                                "Java 8, Spring Boot, PCF, Swagger",

                                                "Developed cloud-ready healthcare applications supporting insurance and member services.",

                                                "Modernize backend applications for improved scalability and cloud deployment.",

                                                "Developed REST APIs, implemented business features, prepared Swagger documentation, supported cloud deployments and fixed production defects.",

                                                "Angular → Spring Boot → PCF → Oracle",

                                                "Cloud migration, secure API development and maintaining high application availability.",

                                                "Enhanced backend services using Spring Boot and successfully supported cloud deployment activities.",

                                                "Improved deployment efficiency, application reliability and service availability.",

                                                "Successfully supported cloud migration activities, improved API documentation quality and enhanced deployment efficiency.",

                                                "Cloud Foundry, REST API Design, Enterprise Development, Swagger Documentation and Agile Practices."),

                                /*
                                 * =====================================================
                                 * DAVITA HEALTHCARE
                                 * =====================================================
                                 */
                                new Project(
                                                "DaVita Healthcare",
                                                "Tata Consultancy Services",
                                                "Java Developer",
                                                "Dec 2020 - Aug 2021",
                                                "Healthcare",
                                                "100",
                                                "Spring Boot, Redis, Cassandra, Jenkins, Docker",

                                                "Built enterprise healthcare backend services supporting patient care and operational platforms.",

                                                "Improve backend performance, scalability and deployment automation for healthcare services.",

                                                "Developed backend modules, implemented Spring Boot services, worked with Redis caching, Cassandra database, Jenkins pipelines and Docker containers.",

                                                "React → Spring Boot → Cassandra → Docker → Jenkins",

                                                "Performance optimization, distributed caching and CI/CD implementation.",

                                                "Improved application response time through caching, containerization and deployment automation.",

                                                "Enhanced deployment reliability, improved backend performance and strengthened DevOps practices.",

                                                "Implemented caching strategies, automated CI/CD pipelines and improved application scalability using Docker and Jenkins.",

                                                "Docker, Jenkins CI/CD, Distributed Caching, NoSQL Database, Enterprise Development.")

                );

                System.out.println(
                                "PORTFOLIO PROJECT COUNT = " + projects.size());

                return projects;
        }

        /**
         * =========================================================
         * GET CERTIFICATIONS
         * =========================================================
         */
        public List<Certification> getCertifications() {

                return Arrays.asList(

                                new Certification(
                                                "Advanced Cloud Computing",
                                                "E&ICT Academy IIT Guwahati",
                                                "/certificates/advanced-cloud-computing.pdf"),

                                new Certification(
                                                "Linux Certification",
                                                "Linux Foundation",
                                                "/certificates/linux-certification.pdf"),

                                new Certification(
                                                "DevOps Practitioner Training",
                                                "Simplilearn",
                                                "/certificates/devops-practitioner.pdf")

                );
        }

        /**
         * =========================================================
         * GET COMPLETE PORTFOLIO
         * =========================================================
         */
        public Portfolio getPortfolio() {

                /*
                 * =====================================================
                 * LOAD PERSISTED SKILLS
                 * =====================================================
                 *
                 * IMPORTANT:
                 * Previously, new SkillEntity(...) objects were created
                 * here. Because those objects were not persisted, their
                 * generated database IDs were null.
                 *
                 * We now load the actual records from MySQL so the
                 * response contains their real database IDs.
                 */
                List<SkillEntity> skills =
                                skillRepository.findAllByOrderByDisplayOrderAsc();

                /*
                 * =====================================================
                 * LOAD PERSISTED EDUCATION
                 * =====================================================
                 *
                 * Load education directly from the database so the
                 * generated IDs are included in the API response.
                 */
                List<EducationEntity> education =
                                educationRepository.findAll();

                /*
                 * =====================================================
                 * PROFILE
                 * =====================================================
                 */
                Profile profile = new Profile(

                                "Rajeev Kumar Kasturi",

                                "Senior Java Developer",

                                "9+ Years of Professional Experience",

                                "Senior Java Developer with 9+ years of experience building scalable enterprise applications using Java, Spring Boot, Microservices, Docker, Kubernetes, and AWS. Passionate about designing secure, high-performance backend systems.",

                                "/images/rajeev-profile.png",

                                /*
                                 * Roles
                                 */
                                Arrays.asList(
                                                "Senior Java Developer",
                                                "Spring Boot Microservices Engineer",
                                                "Cloud Backend Engineer"),

                                /*
                                 * Skills
                                 *
                                 * Loaded from the database.
                                 */
                                skills,

                                /*
                                 * =================================================
                                 * EXPERIENCE
                                 * =================================================
                                 */
                                Arrays.asList(

                                                new Experience(

                                                                "Tata Consultancy Services",
                                                                "DTCC",
                                                                "Senior Java Developer",
                                                                "Jun 2025 - Present",
                                                                "India",
                                                                "Full Time",

                                                                Arrays.asList(
                                                                                "Java 17",
                                                                                "Spring Boot",
                                                                                "Spring Data JPA",
                                                                                "Microservices",
                                                                                "REST APIs",
                                                                                "Azure",
                                                                                "Bitbucket"),

                                                                Arrays.asList(
                                                                                "Designed and developed REST APIs using Spring Boot",
                                                                                "Implemented Microservices architecture",
                                                                                "Optimized SQL queries and backend performance",
                                                                                "Participated in Agile development and code reviews")

                                                ),

                                                new Experience(

                                                                "Tata Consultancy Services",
                                                                "MetLife Insurance",
                                                                "Senior Java Developer",
                                                                "Jun 2024 - Jun 2025",
                                                                "India",
                                                                "Full Time",

                                                                Arrays.asList(
                                                                                "Java 8",
                                                                                "Spring Boot",
                                                                                "Microservices",
                                                                                "Azure APIM",
                                                                                "Oracle"),

                                                                Arrays.asList(
                                                                                "Developed enterprise insurance applications",
                                                                                "Created REST APIs and backend services",
                                                                                "Resolved production issues",
                                                                                "Collaborated with Agile teams")

                                                ),

                                                new Experience(

                                                                "Tata Consultancy Services",
                                                                "McKesson Healthcare",
                                                                "Senior Java Developer",
                                                                "Jan 2023 - Apr 2024",
                                                                "India",
                                                                "Full Time",

                                                                Arrays.asList(
                                                                                "Java 8",
                                                                                "Spring Boot",
                                                                                "Microservices",
                                                                                "ServiceNow",
                                                                                "Oracle"),

                                                                Arrays.asList(
                                                                                "Designed REST APIs",
                                                                                "Developed backend Microservices",
                                                                                "Integrated enterprise workflows",
                                                                                "Provided production support")

                                                ),

                                                new Experience(

                                                                "Tata Consultancy Services",
                                                                "HCSC Healthcare",
                                                                "Java Developer",
                                                                "Sep 2021 - Dec 2022",
                                                                "India",
                                                                "Full Time",

                                                                Arrays.asList(
                                                                                "Java 8",
                                                                                "Spring Boot",
                                                                                "PCF",
                                                                                "Swagger"),

                                                                Arrays.asList(
                                                                                "Developed cloud-ready applications",
                                                                                "Implemented backend features",
                                                                                "Prepared API documentation",
                                                                                "Supported cloud deployments")

                                                ),

                                                new Experience(

                                                                "Tata Consultancy Services",
                                                                "DaVita Healthcare",
                                                                "Java Developer",
                                                                "Dec 2020 - Aug 2021",
                                                                "India",
                                                                "Full Time",

                                                                Arrays.asList(
                                                                                "Spring Boot",
                                                                                "Redis",
                                                                                "Cassandra",
                                                                                "Jenkins",
                                                                                "Docker"),

                                                                Arrays.asList(
                                                                                "Developed backend modules",
                                                                                "Implemented caching solutions",
                                                                                "Worked on CI/CD pipelines",
                                                                                "Improved application performance")

                                                )

                                ),

                                /*
                                 * =================================================
                                 * CERTIFICATIONS
                                 * =================================================
                                 */
                                Arrays.asList(

                                                new Certification(
                                                                "Advanced Cloud Computing",
                                                                "E&ICT Academy IIT Guwahati",
                                                                "/certificates/advanced-cloud-computing.pdf"),

                                                new Certification(
                                                                "Linux Certification",
                                                                "Linux Foundation",
                                                                "/certificates/linux-certification.pdf"),

                                                new Certification(
                                                                "DevOps Practitioner Training",
                                                                "Simplilearn",
                                                                "/certificates/devops-practitioner.pdf")

                                ),

                                /*
                                 * =================================================
                                 * EDUCATION
                                 * =================================================
                                 *
                                 * Loaded from the database.
                                 */
                                education

                );

                /*
                 * =========================================================
                 * CREATE COMPLETE PORTFOLIO
                 * =========================================================
                 */
                List<Project> projects = getProjects();

                Portfolio portfolio = new Portfolio(
                                profile,
                                projects);

                /*
                 * =========================================================
                 * DEBUG INFORMATION
                 * =========================================================
                 */
                System.out.println(
                                "PORTFOLIO PROFILE = "
                                                + portfolio.getProfile());

                System.out.println(
                                "PORTFOLIO PROJECT COUNT = "
                                                + portfolio.getProjects().size());

                System.out.println(
                                "PORTFOLIO SKILL COUNT = "
                                                + skills.size());

                System.out.println(
                                "PORTFOLIO EDUCATION COUNT = "
                                                + education.size());

                return portfolio;
        }

}