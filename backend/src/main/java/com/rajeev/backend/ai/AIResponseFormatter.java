package com.rajeev.backend.ai;

import com.rajeev.backend.entity.SkillEntity;
import com.rajeev.backend.model.Certification;
import com.rajeev.backend.model.Experience;
import com.rajeev.backend.model.Project;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AIResponseFormatter {

    /*
     * ==========================================================
     * PROJECT DETAILS
     * ==========================================================
     */
    public String formatProjectDetails(Project project) {

        if (project == null) {
            return "Project information is not available.";
        }

        StringBuilder builder = new StringBuilder();

        builder.append("\n");
        builder.append("══════════════════════════════════════════════\n");
        builder.append("              PROJECT DETAILS\n");
        builder.append("══════════════════════════════════════════════\n\n");

        builder.append("PROJECT\n");
        builder.append("► ")
                .append(safe(project.getName()))
                .append("\n\n");

        builder.append("ORGANIZATION\n");
        builder.append("► ")
                .append(safe(project.getOrganization()))
                .append("\n\n");

        builder.append("ROLE\n");
        builder.append("► ")
                .append(safe(project.getRole()))
                .append("\n\n");

        builder.append("DURATION\n");
        builder.append("► ")
                .append(safe(project.getDuration()))
                .append("\n\n");

        builder.append("DOMAIN\n");
        builder.append("► ")
                .append(safe(project.getDomain()))
                .append("\n\n");

        builder.append("TEAM SIZE\n");
        builder.append("► ")
                .append(safe(project.getTeamSize()))
                .append("\n\n");

        builder.append("TECHNOLOGIES\n");
        builder.append("► ")
                .append(safe(project.getTechnologies()))
                .append("\n\n");

        appendSection(
                builder,
                "PROJECT OVERVIEW",
                project.getOverview());

        appendSection(
                builder,
                "BUSINESS PROBLEM",
                project.getBusinessProblem());

        appendSection(
                builder,
                "RESPONSIBILITIES",
                project.getResponsibilities());

        appendSection(
                builder,
                "ARCHITECTURE",
                project.getArchitecture());

        appendSection(
                builder,
                "CHALLENGES",
                project.getChallenges());

        appendSection(
                builder,
                "SOLUTION",
                project.getSolution());

        appendSection(
                builder,
                "BUSINESS IMPACT",
                project.getBusinessImpact());

        appendSection(
                builder,
                "KEY ACHIEVEMENTS",
                project.getKeyAchievements());

        appendSection(
                builder,
                "KEY LEARNINGS",
                project.getKeyLearnings());

        builder.append("══════════════════════════════════════════════\n");

        return builder.toString();
    }


    /*
     * ==========================================================
     * PROJECT LIST
     * ==========================================================
     */
    public String formatProjectList(
            String personName,
            List<Project> projects) {

        if (projects == null || projects.isEmpty()) {
            return "No matching projects were found.";
        }

        StringBuilder builder = new StringBuilder();

        builder.append("\n");
        builder.append("══════════════════════════════════════════════\n");
        builder.append("              ENTERPRISE PROJECTS\n");
        builder.append("══════════════════════════════════════════════\n\n");

        builder.append(personName)
                .append(" has successfully contributed to the following ")
                .append(projects.size())
                .append(" enterprise project");

        if (projects.size() != 1) {
            builder.append("s");
        }

        builder.append(":\n\n");

        for (Project project : projects) {

            if (project == null) {
                continue;
            }

            builder.append("► ")
                    .append(safe(project.getName()))
                    .append("\n");

            builder.append("   Organization : ")
                    .append(safe(project.getOrganization()))
                    .append("\n");

            builder.append("   Domain       : ")
                    .append(safe(project.getDomain()))
                    .append("\n");

            builder.append("   Role         : ")
                    .append(safe(project.getRole()))
                    .append("\n");

            builder.append("   Duration     : ")
                    .append(safe(project.getDuration()))
                    .append("\n");

            builder.append("   Technologies : ")
                    .append(safe(project.getTechnologies()))
                    .append("\n\n");
        }

        builder.append("You can ask for details about any project.\n\n");

        builder.append("Examples:\n");
        builder.append("• Explain DTCC\n");
        builder.append("• Tell me about MetLife\n");
        builder.append("• Explain McKesson\n");
        builder.append("• Explain HCSC\n");
        builder.append("• Explain DaVita\n");
        builder.append("• Show Healthcare projects\n");
        builder.append("• Show Spring Boot projects\n");

        return builder.toString();
    }


    /*
     * ==========================================================
     * TECHNICAL SKILLS
     * ==========================================================
     */
    public String formatSkills(List<SkillEntity> skills) {

        if (skills == null || skills.isEmpty()) {
            return "No technical skills are currently available.";
        }

        StringBuilder builder = new StringBuilder();

        builder.append("\n");
        builder.append("══════════════════════════════════════════════\n");
        builder.append("             TECHNICAL EXPERTISE\n");
        builder.append("══════════════════════════════════════════════\n\n");

        builder.append(
                "Rajeev Kumar Kasturi's technical skills include:\n\n");

        for (SkillEntity skill : skills) {

            if (skill == null) {
                continue;
            }

            builder.append("► ")
                    .append(safe(skill.getSkillName()));

            if (skill.getSkillLevel() != null
                    && !skill.getSkillLevel().isBlank()) {

                builder.append(" — ")
                        .append(skill.getSkillLevel());
            }

            builder.append("\n");
        }

        return builder.toString();
    }


    /*
     * ==========================================================
     * CERTIFICATIONS
     * ==========================================================
     */
    public String formatCertifications(
            List<Certification> certifications) {

        if (certifications == null || certifications.isEmpty()) {
            return "No certifications are currently available.";
        }

        StringBuilder builder = new StringBuilder();

        builder.append("\n");
        builder.append("══════════════════════════════════════════════\n");
        builder.append("                 CERTIFICATIONS\n");
        builder.append("══════════════════════════════════════════════\n\n");

        builder.append(
                "Rajeev Kumar Kasturi has completed the following certifications:\n\n");

        for (Certification certification : certifications) {

            if (certification == null) {
                continue;
            }

            builder.append("► ")
                    .append(safe(certification.getName()))
                    .append("\n");

            builder.append("   Issued by : ")
                    .append(safe(certification.getIssuer()))
                    .append("\n\n");
        }

        return builder.toString();
    }


    /*
     * ==========================================================
     * PROFESSIONAL EXPERIENCE
     * ==========================================================
     *
     * IMPORTANT:
     *
     * Profile:
     *     getExperience()       -> String
     *     getExperienceDetails()-> List<Experience>
     *
     * Experience:
     *     getCompany()
     *     getClient()
     *     getDesignation()
     *     getDuration()
     *     getLocation()
     *     getEmploymentType()
     *     getTechnologies()
     *     getResponsibilities()
     *
     * ==========================================================
     */
    public String formatExperience(
            String overallExperience,
            List<Experience> experiences) {

        if (experiences == null || experiences.isEmpty()) {

            if (overallExperience != null
                    && !overallExperience.isBlank()) {

                return """
                        PROFESSIONAL EXPERIENCE
                        =======================

                        Rajeev Kumar Kasturi has %s of professional experience.
                        """.formatted(overallExperience);
            }

            return "Professional experience information is not available.";
        }

        StringBuilder builder = new StringBuilder();

        builder.append("\n");
        builder.append("══════════════════════════════════════════════\n");
        builder.append("          PROFESSIONAL EXPERIENCE\n");
        builder.append("══════════════════════════════════════════════\n\n");

        builder.append("Rajeev Kumar Kasturi has ")
                .append(safe(overallExperience))
                .append(".\n\n");

        for (Experience experience : experiences) {

            if (experience == null) {
                continue;
            }

            builder.append("► ")
                    .append(safe(experience.getCompany()))
                    .append("\n");

            builder.append("   Client       : ")
                    .append(safe(experience.getClient()))
                    .append("\n");

            builder.append("   Designation  : ")
                    .append(safe(experience.getDesignation()))
                    .append("\n");

            builder.append("   Duration     : ")
                    .append(safe(experience.getDuration()))
                    .append("\n");

            builder.append("   Location     : ")
                    .append(safe(experience.getLocation()))
                    .append("\n");

            builder.append("   Employment   : ")
                    .append(safe(experience.getEmploymentType()))
                    .append("\n");

            /*
             * --------------------------------------------------
             * Technologies
             * --------------------------------------------------
             */
            if (experience.getTechnologies() != null
                    && !experience.getTechnologies().isEmpty()) {

                builder.append("\n");
                builder.append("   Technologies:\n");

                for (String technology :
                        experience.getTechnologies()) {

                    if (technology != null
                            && !technology.isBlank()) {

                        builder.append("   • ")
                                .append(technology)
                                .append("\n");
                    }
                }
            }

            /*
             * --------------------------------------------------
             * Responsibilities
             * --------------------------------------------------
             */
            if (experience.getResponsibilities() != null
                    && !experience.getResponsibilities().isEmpty()) {

                builder.append("\n");
                builder.append("   Responsibilities:\n");

                for (String responsibility :
                        experience.getResponsibilities()) {

                    if (responsibility != null
                            && !responsibility.isBlank()) {

                        builder.append("   • ")
                                .append(responsibility)
                                .append("\n");
                    }
                }
            }

            builder.append("\n");
            builder.append(
                    "──────────────────────────────────────────────\n\n");
        }

        return builder.toString();
    }


    /*
     * ==========================================================
     * EXPERIENCE SUMMARY
     * ==========================================================
     */
    public String formatExperienceSummary(
            String overallExperience) {

        return """

                ══════════════════════════════════════════════
                     PROFESSIONAL EXPERIENCE SUMMARY
                ══════════════════════════════════════════════

                Rajeev Kumar Kasturi is a Senior Java Developer
                with %s of professional experience.

                His experience includes:

                • Java
                • Spring Boot
                • Microservices
                • REST API Development
                • Enterprise Applications
                • Docker
                • Kubernetes
                • AWS
                • Azure
                • CI/CD

                He has contributed to enterprise applications
                across Financial Services, Insurance and
                Healthcare domains.
                """.formatted(
                safe(overallExperience));
    }


    /*
     * ==========================================================
     * ROLE
     * ==========================================================
     */
    public String formatRole() {

        return """

                ══════════════════════════════════════════════
                         PROFESSIONAL ROLE
                ══════════════════════════════════════════════

                Rajeev Kumar Kasturi is a Senior Java Developer
                with 9+ years of professional experience.

                Primary roles include:

                • Senior Java Developer
                • Spring Boot Microservices Engineer
                • Cloud Backend Engineer

                His core focus is enterprise backend development,
                Microservices architecture, REST APIs and
                cloud-based application development.
                """;
    }


    /*
     * ==========================================================
     * PROFILE
     * ==========================================================
     */
    public String formatProfile() {

        return """

                ══════════════════════════════════════════════
                              PROFILE
                ══════════════════════════════════════════════

                Rajeev Kumar Kasturi is a Senior Java Developer
                with 9+ years of professional experience.

                He specializes in building scalable enterprise
                applications using Java, Spring Boot,
                Microservices, REST APIs, Docker, Kubernetes,
                AWS and Azure.

                His project experience spans:

                • Financial Services
                • Insurance
                • Healthcare

                He has worked extensively on backend services,
                enterprise integrations, API development,
                cloud technologies and production systems.
                """;
    }


    /*
     * ==========================================================
     * EDUCATION
     * ==========================================================
     */
    public String formatEducation() {

        return """

                ══════════════════════════════════════════════
                              EDUCATION
                ══════════════════════════════════════════════

                ► B.Tech
                  Information Technology

                Institution:
                JNTU University Kakinada

                Duration:
                2010 - 2014
                """;
    }


    /*
     * ==========================================================
     * COMPANIES
     * ==========================================================
     */
    public String formatCompanies() {

        return """

                ══════════════════════════════════════════════
                     PROFESSIONAL ORGANIZATION
                ══════════════════════════════════════════════

                Rajeev Kumar Kasturi has worked with:

                ► Tata Consultancy Services (TCS)

                His TCS project experience includes:

                • DTCC
                • MetLife Insurance
                • McKesson Healthcare
                • HCSC Healthcare
                • DaVita Healthcare
                """;
    }


    /*
     * ==========================================================
     * CONTACT
     * ==========================================================
     */
    public String formatContact() {

        return """

                ══════════════════════════════════════════════
                              CONTACT
                ══════════════════════════════════════════════

                You can connect with Rajeev Kumar Kasturi
                through his professional portfolio.

                LinkedIn:
                https://www.linkedin.com/in/rajeev-kumar-kasturi-5a036771/

                GitHub:
                Available through the portfolio.
                """;
    }


    /*
     * ==========================================================
     * HELP
     * ==========================================================
     */
    public String formatHelp() {

        return """

                ══════════════════════════════════════════════
                    RAJEEV'S AI PORTFOLIO ASSISTANT
                ══════════════════════════════════════════════

                You can ask me questions about Rajeev Kumar
                Kasturi's professional portfolio.

                PROJECTS
                • What projects has Rajeev worked on?
                • How many projects has Rajeev worked on?
                • Tell me about DTCC.
                • Explain the MetLife project.
                • Tell me about McKesson.
                • Explain HCSC.
                • Explain DaVita.

                TECHNICAL SKILLS
                • What are Rajeev's technical skills?
                • What technologies does Rajeev use?
                • What is Rajeev's tech stack?

                PROJECT TECHNOLOGIES
                • Which projects used Spring Boot?
                • Which projects used Docker?
                • Where did Rajeev use Azure?
                • Which projects used Kubernetes?
                • Which projects used Redis?

                DOMAINS
                • What healthcare projects did Rajeev work on?
                • Which projects were in insurance?
                • Which projects were in financial services?

                EXPERIENCE
                • How many years of experience does Rajeev have?
                • What is Rajeev's professional experience?
                • What roles has Rajeev worked in?

                CERTIFICATIONS
                • What certifications does Rajeev have?

                EDUCATION
                • What is Rajeev's educational background?
                • Where did Rajeev study?

                Ask a specific question and I will return
                the most relevant portfolio information.
                """;
    }


    /*
     * ==========================================================
     * GREETING
     * ==========================================================
     */
    public String formatGreeting() {

        return """

                Hello! I'm Rajeev Kumar Kasturi's AI Portfolio
                Assistant.

                I can help you explore his:

                • Professional experience
                • Technical skills
                • Enterprise projects
                • Technologies
                • Certifications
                • Education
                • Project domains
                • Project architecture and business impact

                What would you like to know?
                """;
    }


    /*
     * ==========================================================
     * GENERIC SECTION FORMATTER
     * ==========================================================
     */
    private void appendSection(
            StringBuilder builder,
            String title,
            String content) {

        if (content == null || content.isBlank()) {
            return;
        }

        builder.append(title)
                .append("\n");

        builder.append(
                "──────────────────────────────────────────────\n");

        builder.append(content.trim())
                .append("\n\n");
    }


    /*
     * ==========================================================
     * SAFE STRING
     * ==========================================================
     */
    private String safe(String value) {

        if (value == null || value.isBlank()) {
            return "Not specified";
        }

        return value;
    }
}