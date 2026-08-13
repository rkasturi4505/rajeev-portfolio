package com.rajeev.backend.ai;

/**
 * Represents the user's intent detected from the question.
 * This enum is used by the AI engine to determine which
 * type of professional response should be generated.
 */
public enum AIIntent {

    /*
     * Greetings
     */
    GREETING,

    /*
     * General Profile
     */
    PROFILE,
    SUMMARY,
    EXPERIENCE,
    ROLE,

    /*
     * Skills & Technologies
     */
    SKILLS,
    TECHNOLOGY,

    /*
     * Projects
     */
    PROJECT_LIST,
    PROJECT_DETAILS,

    /*
     * Project Deep Dive
     */
    ARCHITECTURE,
    RESPONSIBILITIES,
    BUSINESS_PROBLEM,
    SOLUTION,
    CHALLENGES,
    BUSINESS_IMPACT,
    ACHIEVEMENTS,
    LEARNINGS,

    /*
     * Career
     */
    COMPANIES,
    EDUCATION,
    CERTIFICATIONS,

    /*
     * Contact
     */
    CONTACT,

    /*
     * AI Help
     */
    HELP,

    /*
     * Unable to identify intent
     */
    UNKNOWN
}