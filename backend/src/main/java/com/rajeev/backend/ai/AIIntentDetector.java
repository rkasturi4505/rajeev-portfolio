package com.rajeev.backend.ai;

import org.springframework.stereotype.Component;

/**
 * ============================================================
 * AI INTENT DETECTOR
 * ============================================================
 *
 * Detects the primary intent of a user's portfolio question.
 *
 * The detector intentionally checks more specific intents before
 * broader intents such as PROJECT_LIST or TECHNOLOGY.
 */
@Component
public class AIIntentDetector {

    public AIIntent detect(String question) {

        if (question == null || question.isBlank()) {
            return AIIntent.UNKNOWN;
        }

        String q = question.toLowerCase().trim();

        /*
         * ========================================================
         * GREETING
         * ========================================================
         */
        if (containsAny(
                q,
                "hi",
                "hello",
                "hey",
                "good morning",
                "good afternoon",
                "good evening")) {

            return AIIntent.GREETING;
        }

        /*
         * ========================================================
         * HELP
         * ========================================================
         */
        if (containsAny(
                q,
                "what can you do",
                "how can you help",
                "what can i ask",
                "help me",
                "help")) {

            return AIIntent.HELP;
        }

        /*
         * ========================================================
         * CERTIFICATIONS
         * ========================================================
         *
         * Must be checked before generic PROFILE / TECHNOLOGY.
         */
        if (containsAny(
                q,
                "certification",
                "certifications",
                "certificate",
                "certificates")) {

            return AIIntent.CERTIFICATIONS;
        }

        /*
         * ========================================================
         * EDUCATION
         * ========================================================
         */
        if (containsAny(
                q,
                "education",
                "educational background",
                "degree",
                "college",
                "university",
                "btech",
                "b.tech",
                "study",
                "studied")) {

            return AIIntent.EDUCATION;
        }

        /*
         * ========================================================
         * CONTACT
         * ========================================================
         */
        if (containsAny(
                q,
                "contact",
                "email",
                "linkedin",
                "github",
                "phone",
                "reach rajeev",
                "connect with rajeev")) {

            return AIIntent.CONTACT;
        }

        /*
         * ========================================================
         * COMPANIES
         * ========================================================
         */
        if (containsAny(
                q,
                "companies",
                "company",
                "worked for",
                "worked at",
                "organizations",
                "employers",
                "employer")) {

            return AIIntent.COMPANIES;
        }

        /*
         * ========================================================
         * EXPERIENCE
         * ========================================================
         */
        if (containsAny(
                q,
                "years of experience",
                "how many years",
                "professional experience",
                "work experience",
                "career experience",
                "experience",
                "career")) {

            return AIIntent.EXPERIENCE;
        }

        /*
         * ========================================================
         * ROLE
         * ========================================================
         */
        if (containsAny(
                q,
                "role",
                "designation",
                "job title",
                "title",
                "position",
                "what does rajeev do",
                "what is rajeev's role")) {

            return AIIntent.ROLE;
        }

        /*
         * ========================================================
         * SUMMARY
         * ========================================================
         */
        if (containsAny(
                q,
                "professional summary",
                "career summary",
                "summary",
                "overview of rajeev")) {

            return AIIntent.SUMMARY;
        }

        /*
         * ========================================================
         * PROFILE
         * ========================================================
         */
        if (containsAny(
                q,
                "who is rajeev",
                "tell me about rajeev",
                "about rajeev",
                "introduce rajeev",
                "rajiv profile",
                "rajeev profile",
                "profile")) {

            return AIIntent.PROFILE;
        }

        /*
         * ========================================================
         * SKILLS
         * ========================================================
         *
         * IMPORTANT:
         * "technical skills" must resolve to SKILLS.
         */
        if (containsAny(
                q,
                "technical skills",
                "technical skill",
                "technical expertise",
                "skills",
                "skill set",
                "skillset",
                "tech stack",
                "technology stack",
                "technologies does rajeev use",
                "what technologies does rajeev use",
                "what technologies do i use")) {

            return AIIntent.SKILLS;
        }

        /*
         * ========================================================
         * PROJECT DETAILS
         * ========================================================
         *
         * Specific project names should resolve here.
         */
        if (containsAny(
                q,
                "dtcc",
                "metlife",
                "metlife insurance",
                "mckesson",
                "mckesson healthcare",
                "hcsc",
                "hcsc healthcare",
                "davita",
                "davita healthcare")) {

            return AIIntent.PROJECT_DETAILS;
        }

        /*
         * ========================================================
         * PROJECT LIST
         * ========================================================
         */
        if (containsAny(
                q,
                "what projects",
                "which projects",
                "show projects",
                "list projects",
                "my projects",
                "rajeev projects",
                "projects have i worked on",
                "projects has rajeev worked on",
                "how many projects",
                "total projects",
                "project count",
                "number of projects")) {

            return AIIntent.PROJECT_LIST;
        }

        /*
         * ========================================================
         * TECHNOLOGY
         * ========================================================
         *
         * Project + technology questions can also be processed
         * by AIService using the actual query.
         */
        if (containsAny(
                q,
                "java",
                "spring",
                "spring boot",
                "microservices",
                "microservice",
                "docker",
                "kubernetes",
                "k8s",
                "aws",
                "azure",
                "azure apim",
                "redis",
                "kafka",
                "jenkins",
                "maven",
                "rest api",
                "rest apis",
                "cassandra",
                "oracle",
                "mysql",
                "swagger",
                "pcf")) {

            return AIIntent.TECHNOLOGY;
        }

        /*
         * ========================================================
         * ARCHITECTURE
         * ========================================================
         */
        if (containsAny(
                q,
                "architecture",
                "system architecture",
                "application architecture",
                "design",
                "system design")) {

            return AIIntent.ARCHITECTURE;
        }

        /*
         * ========================================================
         * RESPONSIBILITIES
         * ========================================================
         */
        if (containsAny(
                q,
                "responsibilities",
                "responsibility",
                "what did rajeev do",
                "what was rajeev responsible for")) {

            return AIIntent.RESPONSIBILITIES;
        }

        /*
         * ========================================================
         * BUSINESS PROBLEM
         * ========================================================
         */
        if (containsAny(
                q,
                "business problem",
                "business problems",
                "problem statement",
                "business challenge")) {

            return AIIntent.BUSINESS_PROBLEM;
        }

        /*
         * ========================================================
         * SOLUTION
         * ========================================================
         */
        if (containsAny(
                q,
                "solution",
                "solutions",
                "implemented",
                "implementation")) {

            return AIIntent.SOLUTION;
        }

        /*
         * ========================================================
         * CHALLENGES
         * ========================================================
         */
        if (containsAny(
                q,
                "challenge",
                "challenges",
                "technical challenge")) {

            return AIIntent.CHALLENGES;
        }

        /*
         * ========================================================
         * BUSINESS IMPACT
         * ========================================================
         */
        if (containsAny(
                q,
                "business impact",
                "impact",
                "results",
                "business results")) {

            return AIIntent.BUSINESS_IMPACT;
        }

        /*
         * ========================================================
         * ACHIEVEMENTS
         * ========================================================
         */
        if (containsAny(
                q,
                "achievement",
                "achievements",
                "accomplishments")) {

            return AIIntent.ACHIEVEMENTS;
        }

        /*
         * ========================================================
         * LEARNINGS
         * ========================================================
         */
        if (containsAny(
                q,
                "learning",
                "learnings",
                "what did rajeev learn")) {

            return AIIntent.LEARNINGS;
        }

        /*
         * ========================================================
         * UNKNOWN
         * ========================================================
         */
        return AIIntent.UNKNOWN;
    }

    private boolean containsAny(
            String text,
            String... keywords) {

        for (String keyword : keywords) {

            if (text.contains(keyword.toLowerCase())) {
                return true;
            }
        }

        return false;
    }
}