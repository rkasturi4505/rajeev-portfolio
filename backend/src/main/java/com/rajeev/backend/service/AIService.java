package com.rajeev.backend.service;

import com.rajeev.backend.ai.AIResponseFormatter;
import com.rajeev.backend.model.Portfolio;
import com.rajeev.backend.model.Project;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AIService {

    private final PortfolioDataService portfolioDataService;
    private final ProjectStatisticsService projectStatisticsService;
    private final ProjectComparisonService projectComparisonService;
    private final AIResponseFormatter responseFormatter;

    /*
     * ==========================================================
     * CONSTRUCTOR
     * ==========================================================
     */
    public AIService(
            PortfolioDataService portfolioDataService,
            ProjectStatisticsService projectStatisticsService,
            ProjectComparisonService projectComparisonService,
            AIResponseFormatter responseFormatter) {

        this.portfolioDataService = portfolioDataService;
        this.projectStatisticsService = projectStatisticsService;
        this.projectComparisonService = projectComparisonService;
        this.responseFormatter = responseFormatter;
    }

    /*
     * ==========================================================
     * MAIN AI RESPONSE METHOD
     * ==========================================================
     */
    public String generateResponse(String query) {

        if (query == null || query.trim().isEmpty()) {

            return "Please enter a valid question.";
        }

        String q = query.toLowerCase().trim();

        Portfolio portfolio =
                portfolioDataService.getPortfolio();

        if (portfolio == null ||
                portfolio.getProfile() == null) {

            return "Portfolio information is currently unavailable.";
        }

        /*
         * ======================================================
         * GREETING
         * ======================================================
         */
        if (containsAny(
                q,
                "hi",
                "hello",
                "hey",
                "good morning",
                "good afternoon",
                "good evening")) {

            return """
                    Hello! I'm Rajeev AI Assistant.

                    I can help you explore Rajeev Kumar Kasturi's:

                    • Professional profile
                    • Technical skills
                    • Professional experience
                    • Enterprise projects
                    • Technologies
                    • Project architecture
                    • Business problems
                    • Solutions
                    • Challenges
                    • Achievements
                    • Certifications
                    • Education
                    • Professional roles

                    What would you like to know?
                    """;
        }

        /*
         * ======================================================
         * HELP
         * ======================================================
         */
        if (containsAny(
                q,
                "what can you do",
                "how can you help",
                "help me",
                "help")) {

            return """
                    I can answer questions about Rajeev Kumar Kasturi's professional portfolio.

                    TECHNICAL SKILLS
                    • What are Rajeev's technical skills?
                    • What technologies does Rajeev know?
                    • What is Rajeev's tech stack?

                    EXPERIENCE
                    • How many years of experience does Rajeev have?
                    • Tell me about Rajeev's experience.
                    • Where has Rajeev worked?

                    PROJECTS
                    • What projects has Rajeev worked on?
                    • How many projects has Rajeev worked on?
                    • Tell me about DTCC.
                    • Explain the MetLife project.

                    TECHNOLOGIES
                    • Which projects used Spring Boot?
                    • Which projects used Docker?
                    • Where did Rajeev use Azure?

                    DOMAINS
                    • Which healthcare projects did Rajeev work on?
                    • Which projects were in insurance?
                    • Which projects were in financial services?

                    CERTIFICATIONS
                    • What certifications does Rajeev have?

                    EDUCATION
                    • What is Rajeev's educational background?
                    """;
        }

        /*
         * ======================================================
         * CERTIFICATIONS
         * ======================================================
         */
        if (containsAny(
                q,
                "certification",
                "certifications",
                "certificate",
                "certificates")) {

            return responseFormatter.formatCertifications(
                    portfolio.getProfile().getCertifications());
        }

        /*
         * ======================================================
         * EDUCATION
         * ======================================================
         */
        if (containsAny(
                q,
                "education",
                "educational background",
                "degree",
                "btech",
                "b.tech",
                "college",
                "university")) {

            return formatEducation(
                    portfolio.getProfile().getEducation());
        }

        /*
         * ======================================================
         * TECHNICAL SKILLS
         * ======================================================
         */
        if (isSkillsQuestion(q)) {

            return responseFormatter.formatSkills(
                    portfolio.getProfile().getSkills());
        }

        /*
         * ======================================================
         * PROFESSIONAL EXPERIENCE
         * ======================================================
         *
         * Profile contains:
         *
         * getExperience()
         *     -> String
         *
         * getExperienceDetails()
         *     -> List<Experience>
         *
         * Detailed experience must use:
         *
         * getExperienceDetails()
         */
        if (isExperienceQuestion(q)) {

            return responseFormatter.formatExperience(
                    portfolio.getProfile().getExperience(),
                    portfolio.getProfile().getExperienceDetails());
        }

        /*
         * ======================================================
         * PROJECT COUNT
         * ======================================================
         */
        if (containsAny(
                q,
                "how many projects",
                "number of projects",
                "total projects",
                "project count")) {

            List<Project> projects =
                    portfolio.getProjects();

            int count =
                    projectStatisticsService
                            .getTotalProjects(projects);

            return """
                    PROJECT EXPERIENCE
                    ==================

                    Rajeev Kumar Kasturi has worked on %d enterprise projects.

                    The projects span the following domains:

                    • Financial Services
                    • Insurance
                    • Healthcare

                    Projects include:

                    • DTCC
                    • MetLife Insurance
                    • McKesson Healthcare
                    • HCSC Healthcare
                    • DaVita Healthcare
                    """.formatted(count);
        }

        /*
         * ======================================================
         * PROJECT DATA
         * ======================================================
         */
        List<Project> projects =
                portfolio.getProjects();

        /*
         * ======================================================
         * SPECIFIC PROJECT
         * ======================================================
         */
        if (projects != null) {

            for (Project project : projects) {

                if (project == null ||
                        project.getName() == null) {

                    continue;
                }

                String projectName =
                        project.getName().toLowerCase();

                /*
                 * Exact project name
                 */
                if (q.contains(projectName)) {

                    return formatCompleteProject(project);
                }

                /*
                 * DTCC
                 */
                if (projectName.contains("dtcc")
                        && q.contains("dtcc")) {

                    return formatCompleteProject(project);
                }

                /*
                 * MetLife
                 */
                if (projectName.contains("metlife")
                        && q.contains("metlife")) {

                    return formatCompleteProject(project);
                }

                /*
                 * McKesson
                 */
                if (projectName.contains("mckesson")
                        && q.contains("mckesson")) {

                    return formatCompleteProject(project);
                }

                /*
                 * HCSC
                 */
                if (projectName.contains("hcsc")
                        && q.contains("hcsc")) {

                    return formatCompleteProject(project);
                }

                /*
                 * DaVita
                 */
                if (projectName.contains("davita")
                        && q.contains("davita")) {

                    return formatCompleteProject(project);
                }
            }
        }

        /*
         * ======================================================
         * DOMAIN + TECHNOLOGY
         * ======================================================
         */
        String domain =
                extractDomain(q);

        String technology =
                extractTechnology(q);

        if (domain != null &&
                technology != null) {

            List<Project> matchedProjects =
                    projectComparisonService
                            .findByDomainAndTechnology(
                                    domain,
                                    technology,
                                    projects);

            if (!matchedProjects.isEmpty()) {

                return formatProjectList(
                        "Rajeev Kumar Kasturi",
                        matchedProjects,
                        "PROJECTS MATCHING DOMAIN + TECHNOLOGY");
            }

            return """
                    No matching projects were found.

                    Domain     : %s
                    Technology : %s
                    """.formatted(
                    capitalize(domain),
                    capitalize(technology));
        }

        /*
         * ======================================================
         * DOMAIN ONLY
         * ======================================================
         */
        if (domain != null) {

            List<Project> domainProjects =
                    projectComparisonService
                            .findByDomain(
                                    domain,
                                    projects);

            if (!domainProjects.isEmpty()) {

                return formatProjectList(
                        "Rajeev Kumar Kasturi",
                        domainProjects,
                        capitalize(domain) + " PROJECTS");
            }

            return "No projects were found for the "
                    + domain
                    + " domain.";
        }

        /*
         * ======================================================
         * TECHNOLOGY PROJECT SEARCH
         * ======================================================
         */
        if (technology != null
                && isTechnologyProjectQuestion(q)) {

            List<Project> technologyProjects =
                    projectComparisonService
                            .findByTechnology(
                                    technology,
                                    projects);

            if (!technologyProjects.isEmpty()) {

                return formatProjectList(
                        "Rajeev Kumar Kasturi",
                        technologyProjects,
                        capitalize(technology) + " PROJECTS");
            }

            return "No projects were found using "
                    + technology
                    + ".";
        }

        /*
         * ======================================================
         * GENERAL PROJECT LIST
         * ======================================================
         */
        if (isProjectListQuestion(q)) {

            if (projects == null ||
                    projects.isEmpty()) {

                return "No projects are currently available.";
            }

            return formatProjectList(
                    "Rajeev Kumar Kasturi",
                    projects,
                    "ENTERPRISE PROJECTS");
        }

        /*
         * ======================================================
         * PROJECT DEEP DIVE
         * ======================================================
         */
        if (containsAny(
                q,
                "architecture",
                "design",
                "business problem",
                "problem statement",
                "responsibilities",
                "responsibility",
                "solution",
                "implemented",
                "challenges",
                "challenge",
                "business impact",
                "impact",
                "achievements",
                "achievement",
                "learnings",
                "learning")) {

            return handleProjectDeepDive(
                    q,
                    projects);
        }

        /*
         * ======================================================
         * ROLE
         * ======================================================
         */
        if (containsAny(
                q,
                "role",
                "designation",
                "job title",
                "position")) {

            return formatRoles(
                    portfolio.getProfile());
        }

        /*
         * ======================================================
         * PROFILE / ABOUT
         * ======================================================
         */
        if (containsAny(
                q,
                "who is rajeev",
                "tell me about rajeev",
                "about rajeev",
                "introduce rajeev",
                "profile")) {

            return formatProfile(portfolio);
        }

        /*
         * ======================================================
         * CONTACT
         * ======================================================
         */
        if (containsAny(
                q,
                "contact",
                "linkedin",
                "github",
                "email",
                "phone")) {

            return """
                    CONTACT & PROFESSIONAL LINKS
                    ============================

                    Rajeev Kumar Kasturi is available through
                    his professional portfolio and networking profiles.

                    LinkedIn:
                    https://www.linkedin.com/in/rajeev-kumar-kasturi-5a036771/
                    """;
        }

        /*
         * ======================================================
         * DEFAULT RESPONSE
         * ======================================================
         */
        return """
                I can answer questions about Rajeev Kumar Kasturi's professional portfolio.

                Try asking:

                • What are Rajeev's technical skills?
                • What technologies does Rajeev know?
                • What is Rajeev's tech stack?
                • How many years of experience does Rajeev have?
                • Tell me about Rajeev's experience.
                • What projects has Rajeev worked on?
                • How many projects has Rajeev worked on?
                • Tell me about DTCC.
                • Explain the MetLife project.
                • Which healthcare projects did Rajeev work on?
                • Which projects used Spring Boot?
                • Which projects used Docker?
                • What certifications does Rajeev have?
                • What is Rajeev's educational background?
                """;
    }

    /*
     * ==========================================================
     * SKILLS QUESTION
     * ==========================================================
     */
    private boolean isSkillsQuestion(String q) {

        return containsAny(
                q,
                "technical skills",
                "technical skill",
                "tech skills",
                "tech skill",
                "technical expertise",
                "technical knowledge",
                "tech stack",
                "technology stack",
                "technologies does rajeev know",
                "technologies does rajeev use",
                "what technologies does rajeev",
                "what technologies do i use",
                "what skills does rajeev have",
                "what skills does rajeev know",
                "what are rajeev's skills",
                "what are rajeev's technical skills",
                "what is rajeev's technical skills",
                "rajeev technical skills",
                "rajeev's technical skills",
                "rajeev skills",
                "skills",
                "skill",
                "technologies",
                "technology");
    }

    /*
     * ==========================================================
     * EXPERIENCE QUESTION
     * ==========================================================
     */
    private boolean isExperienceQuestion(String q) {

        return containsAny(
                q,
                "experience",
                "years of experience",
                "how many years",
                "professional experience",
                "career experience",
                "work experience",
                "where has rajeev worked",
                "where did rajeev work",
                "companies has rajeev worked",
                "work history",
                "career history");
    }

    /*
     * ==========================================================
     * ROLE FORMATTER
     * ==========================================================
     */
    private String formatRoles(
            com.rajeev.backend.model.Profile profile) {

        StringBuilder response =
                new StringBuilder();

        response.append("""
                PROFESSIONAL ROLES
                ==================

                Rajeev Kumar Kasturi's professional roles include:

                """);

        if (profile.getRoles() != null
                && !profile.getRoles().isEmpty()) {

            for (String role :
                    profile.getRoles()) {

                if (role == null ||
                        role.isBlank()) {

                    continue;
                }

                response.append("• ")
                        .append(role)
                        .append("\n");
            }

        } else {

            response.append(
                    "• Senior Java Developer\n");

            response.append(
                    "• Spring Boot Microservices Engineer\n");

            response.append(
                    "• Cloud Backend Engineer\n");
        }

        return response.toString();
    }

    /*
     * ==========================================================
     * EDUCATION
     * ==========================================================
     */
    private String formatEducation(
            List<?> educationList) {

        if (educationList == null
                || educationList.isEmpty()) {

            return """
                    EDUCATION
                    =========

                    Rajeev Kumar Kasturi's educational information
                    is currently unavailable.
                    """;
        }

        StringBuilder response =
                new StringBuilder();

        response.append("""
                EDUCATION
                =========

                Rajeev Kumar Kasturi's educational background:

                """);

        for (Object education :
                educationList) {

            if (education == null) {
                continue;
            }

            response.append("• ")
                    .append(education)
                    .append("\n");
        }

        return response.toString();
    }

    /*
     * ==========================================================
     * COMPLETE PROJECT
     * ==========================================================
     */
    private String formatCompleteProject(
            Project project) {

        if (project == null) {

            return "Project information is not available.";
        }

        StringBuilder response =
                new StringBuilder();

        response.append("PROJECT: ")
                .append(safe(project.getName()))
                .append("\n");

        response.append(
                "==============================\n\n");

        response.append("Organization : ")
                .append(safe(project.getOrganization()))
                .append("\n");

        response.append("Role         : ")
                .append(safe(project.getRole()))
                .append("\n");

        response.append("Duration     : ")
                .append(safe(project.getDuration()))
                .append("\n");

        response.append("Domain       : ")
                .append(safe(project.getDomain()))
                .append("\n");

        response.append("Team Size    : ")
                .append(safe(project.getTeamSize()))
                .append("\n");

        response.append("Technologies : ")
                .append(safe(project.getTechnologies()))
                .append("\n\n");

        appendSection(
                response,
                "OVERVIEW",
                project.getOverview());

        appendSection(
                response,
                "BUSINESS PROBLEM",
                project.getBusinessProblem());

        appendSection(
                response,
                "RESPONSIBILITIES",
                project.getResponsibilities());

        appendSection(
                response,
                "ARCHITECTURE",
                project.getArchitecture());

        appendSection(
                response,
                "CHALLENGES",
                project.getChallenges());

        appendSection(
                response,
                "SOLUTION",
                project.getSolution());

        appendSection(
                response,
                "BUSINESS IMPACT",
                project.getBusinessImpact());

        appendSection(
                response,
                "KEY ACHIEVEMENTS",
                project.getKeyAchievements());

        appendSection(
                response,
                "KEY LEARNINGS",
                project.getKeyLearnings());

        return response.toString();
    }

    /*
     * ==========================================================
     * PROJECT LIST
     * ==========================================================
     */
    private String formatProjectList(
            String name,
            List<Project> projects,
            String heading) {

        if (projects == null ||
                projects.isEmpty()) {

            return "No matching projects were found.";
        }

        StringBuilder response =
                new StringBuilder();

        response.append(heading)
                .append("\n");

        response.append(
                "==============================\n\n");

        response.append(name)
                .append(" has worked on ")
                .append(projects.size())
                .append(" matching enterprise project");

        if (projects.size() != 1) {

            response.append("s");
        }

        response.append(":\n\n");

        for (Project project :
                projects) {

            if (project == null) {
                continue;
            }

            response.append("► ")
                    .append(safe(project.getName()))
                    .append("\n");

            response.append("  Organization : ")
                    .append(safe(project.getOrganization()))
                    .append("\n");

            response.append("  Domain       : ")
                    .append(safe(project.getDomain()))
                    .append("\n");

            response.append("  Role         : ")
                    .append(safe(project.getRole()))
                    .append("\n");

            response.append("  Technologies : ")
                    .append(safe(project.getTechnologies()))
                    .append("\n\n");
        }

        return response.toString();
    }

    /*
     * ==========================================================
     * PROJECT DEEP DIVE
     * ==========================================================
     */
    private String handleProjectDeepDive(
            String q,
            List<Project> projects) {

        if (projects == null ||
                projects.isEmpty()) {

            return "No project information is currently available.";
        }

        Project selectedProject = null;

        for (Project project :
                projects) {

            if (project == null ||
                    project.getName() == null) {

                continue;
            }

            String name =
                    project.getName().toLowerCase();

            /*
             * Exact project name
             */
            if (q.contains(name)) {

                selectedProject = project;
                break;
            }

            /*
             * DTCC
             */
            if (name.contains("dtcc")
                    && q.contains("dtcc")) {

                selectedProject = project;
                break;
            }

            /*
             * MetLife
             */
            if (name.contains("metlife")
                    && q.contains("metlife")) {

                selectedProject = project;
                break;
            }

            /*
             * McKesson
             */
            if (name.contains("mckesson")
                    && q.contains("mckesson")) {

                selectedProject = project;
                break;
            }

            /*
             * HCSC
             */
            if (name.contains("hcsc")
                    && q.contains("hcsc")) {

                selectedProject = project;
                break;
            }

            /*
             * DaVita
             */
            if (name.contains("davita")
                    && q.contains("davita")) {

                selectedProject = project;
                break;
            }
        }

        if (selectedProject == null) {

            return """
                    Please specify the project name.

                    Available projects:
                    • DTCC
                    • MetLife Insurance
                    • McKesson Healthcare
                    • HCSC Healthcare
                    • DaVita Healthcare
                    """;
        }

        StringBuilder response =
                new StringBuilder();

        response.append("PROJECT: ")
                .append(safe(selectedProject.getName()))
                .append("\n");

        response.append(
                "==============================\n\n");

        boolean matched = false;

        /*
         * Architecture
         */
        if (containsAny(
                q,
                "architecture",
                "design")) {

            appendSection(
                    response,
                    "ARCHITECTURE",
                    selectedProject.getArchitecture());

            matched = true;
        }

        /*
         * Business Problem
         */
        if (containsAny(
                q,
                "business problem",
                "problem statement")) {

            appendSection(
                    response,
                    "BUSINESS PROBLEM",
                    selectedProject.getBusinessProblem());

            matched = true;
        }

        /*
         * Responsibilities
         */
        if (containsAny(
                q,
                "responsibilities",
                "responsibility")) {

            appendSection(
                    response,
                    "RESPONSIBILITIES",
                    selectedProject.getResponsibilities());

            matched = true;
        }

        /*
         * Solution
         */
        if (containsAny(
                q,
                "solution",
                "implemented")) {

            appendSection(
                    response,
                    "SOLUTION",
                    selectedProject.getSolution());

            matched = true;
        }

        /*
         * Challenges
         */
        if (containsAny(
                q,
                "challenge",
                "challenges")) {

            appendSection(
                    response,
                    "CHALLENGES",
                    selectedProject.getChallenges());

            matched = true;
        }

        /*
         * Business Impact
         */
        if (containsAny(
                q,
                "impact",
                "business impact")) {

            appendSection(
                    response,
                    "BUSINESS IMPACT",
                    selectedProject.getBusinessImpact());

            matched = true;
        }

        /*
         * Achievements
         */
        if (containsAny(
                q,
                "achievement",
                "achievements")) {

            appendSection(
                    response,
                    "KEY ACHIEVEMENTS",
                    selectedProject.getKeyAchievements());

            matched = true;
        }

        /*
         * Learnings
         */
        if (containsAny(
                q,
                "learning",
                "learnings")) {

            appendSection(
                    response,
                    "KEY LEARNINGS",
                    selectedProject.getKeyLearnings());

            matched = true;
        }

        /*
         * If no specific deep-dive section was requested,
         * return the complete project.
         */
        if (!matched) {

            return formatCompleteProject(
                    selectedProject);
        }

        return response.toString();
    }

    /*
     * ==========================================================
     * PROFILE
     * ==========================================================
     */
    private String formatProfile(
            Portfolio portfolio) {

        var profile =
                portfolio.getProfile();

        return """
                RAJEEV KUMAR KASTURI
                ====================

                Role:
                %s

                Experience:
                %s

                Summary:
                %s

                Professional roles:

                • Senior Java Developer
                • Spring Boot Microservices Engineer
                • Cloud Backend Engineer
                """.formatted(
                safe(profile.getTitle()),
                safe(profile.getExperience()),
                safe(profile.getSummary()));
    }

    /*
     * ==========================================================
     * DOMAIN EXTRACTION
     * ==========================================================
     */
    private String extractDomain(
            String q) {

        if (q.contains("healthcare")
                || q.contains("health care")) {

            return "healthcare";
        }

        if (q.contains("insurance")) {

            return "insurance";
        }

        if (q.contains("financial services")
                || q.contains("financial")) {

            return "financial services";
        }

        return null;
    }

    /*
     * ==========================================================
     * TECHNOLOGY EXTRACTION
     * ==========================================================
     */
    private String extractTechnology(
            String q) {

        if (q.contains("spring boot")) {

            return "spring boot";
        }

        if (q.contains("microservices")
                || q.contains("microservice")) {

            return "microservices";
        }

        if (q.contains("docker")) {

            return "docker";
        }

        if (q.contains("kubernetes")
                || q.contains("k8s")) {

            return "kubernetes";
        }

        if (q.contains("azure")) {

            return "azure";
        }

        if (q.contains("aws")) {

            return "aws";
        }

        if (q.contains("jenkins")) {

            return "jenkins";
        }

        if (q.contains("redis")) {

            return "redis";
        }

        if (q.contains("cassandra")) {

            return "cassandra";
        }

        if (q.contains("oracle")) {

            return "oracle";
        }

        if (q.contains("mysql")) {

            return "mysql";
        }

        if (q.contains("java")) {

            return "java";
        }

        if (q.contains("react")) {

            return "react";
        }

        if (q.contains("angular")) {

            return "angular";
        }

        if (q.contains("swagger")) {

            return "swagger";
        }

        if (q.contains("pcf")) {

            return "pcf";
        }

        if (q.contains("rest api")
                || q.contains("rest apis")) {

            return "rest api";
        }

        return null;
    }

    /*
     * ==========================================================
     * TECHNOLOGY PROJECT QUESTION
     * ==========================================================
     */
    private boolean isTechnologyProjectQuestion(
            String q) {

        return containsAny(
                q,
                "which projects",
                "what projects",
                "projects used",
                "projects use",
                "where did i use",
                "where did rajeev use",
                "where have i used",
                "used in which projects",
                "which project used",
                "which project uses",
                "where was",
                "where were");
    }

    /*
     * ==========================================================
     * PROJECT LIST QUESTION
     * ==========================================================
     */
    private boolean isProjectListQuestion(
            String q) {

        return containsAny(
                q,
                "what projects",
                "which projects",
                "show projects",
                "show me projects",
                "list projects",
                "projects has rajeev worked",
                "projects have i worked",
                "projects did rajeev work",
                "projects worked on",
                "enterprise projects",
                "my projects",
                "all projects");
    }

    /*
     * ==========================================================
     * APPEND SECTION
     * ==========================================================
     */
    private void appendSection(
            StringBuilder builder,
            String title,
            String value) {

        if (value == null
                || value.isBlank()) {

            return;
        }

        builder.append(title)
                .append("\n");

        builder.append(
                "--------------------------------\n");

        builder.append(value)
                .append("\n\n");
    }

    /*
     * ==========================================================
     * CONTAINS ANY
     * ==========================================================
     */
    private boolean containsAny(
            String query,
            String... values) {

        if (query == null) {
            return false;
        }

        for (String value :
                values) {

            if (value != null &&
                    query.contains(
                            value.toLowerCase())) {

                return true;
            }
        }

        return false;
    }

    /*
     * ==========================================================
     * CAPITALIZE
     * ==========================================================
     */
    private String capitalize(
            String value) {

        if (value == null ||
                value.isBlank()) {

            return value;
        }

        return Character.toUpperCase(
                    value.charAt(0))
                + value.substring(1);
    }

    /*
     * ==========================================================
     * SAFE STRING
     * ==========================================================
     */
    private String safe(
            String value) {

        if (value == null ||
                value.isBlank()) {

            return "Not specified";
        }

        return value;
    }
}