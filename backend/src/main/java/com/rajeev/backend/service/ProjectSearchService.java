package com.rajeev.backend.service;

import com.rajeev.backend.model.Project;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectSearchService {

    /**
     * Search projects using natural-language queries.
     *
     * Examples:
     * - Tell me about DTCC
     * - Explain MetLife Insurance
     * - Show healthcare projects
     * - Show Spring Boot projects
     * - Projects from Tata Consultancy Services
     */
    public List<Project> searchProjects(
            String query,
            List<Project> projects) {

        if (query == null || query.isBlank() || projects == null) {
            return List.of();
        }

        String search = normalize(query);

        List<Project> result = new ArrayList<>();

        for (Project project : projects) {

            if (matchesProject(project, search)) {
                result.add(project);
            }
        }

        return result;
    }

    /**
     * Determine whether a project matches the user's query.
     */
    private boolean matchesProject(
            Project project,
            String search) {

        if (project == null) {
            return false;
        }

        /*
         * Exact project-name matching.
         *
         * Example:
         * "Tell me about DTCC"
         * -> DTCC
         */
        if (contains(project.getName(), search)) {
            return true;
        }

        /*
         * Check individual meaningful words from the query.
         *
         * This allows:
         *
         * "Tell me about DTCC"
         * "Explain DTCC project"
         * "Details of DTCC"
         */
        String[] words = search.split("\\s+");

        for (String word : words) {

            if (isIgnoredWord(word)) {
                continue;
            }

            if (contains(project.getName(), word)
                    || contains(project.getOrganization(), word)
                    || contains(project.getRole(), word)
                    || contains(project.getDomain(), word)
                    || contains(project.getTechnologies(), word)) {

                return true;
            }
        }

        /*
         * Domain search.
         *
         * Example:
         * "Show healthcare projects"
         */
        if (search.contains("healthcare")
                && contains(project.getDomain(), "healthcare")) {

            return true;
        }

        /*
         * Technology search.
         *
         * Example:
         * "Show Spring Boot projects"
         */
        if (search.contains("spring boot")
                && contains(project.getTechnologies(), "spring boot")) {

            return true;
        }

        if (search.contains("java")
                && contains(project.getTechnologies(), "java")) {

            return true;
        }

        if (search.contains("docker")
                && contains(project.getTechnologies(), "docker")) {

            return true;
        }

        if (search.contains("kubernetes")
                && contains(project.getTechnologies(), "kubernetes")) {

            return true;
        }

        if (search.contains("azure")
                && contains(project.getTechnologies(), "azure")) {

            return true;
        }

        if (search.contains("microservices")
                && contains(project.getTechnologies(), "microservices")) {

            return true;
        }

        return false;
    }

    /**
     * Search projects by domain.
     */
    public List<Project> searchByDomain(
            String domain,
            List<Project> projects) {

        if (domain == null
                || domain.isBlank()
                || projects == null) {

            return List.of();
        }

        List<Project> result = new ArrayList<>();

        for (Project project : projects) {

            if (contains(
                    project.getDomain(),
                    domain)) {

                result.add(project);
            }
        }

        return result;
    }

    /**
     * Search projects by technology.
     */
    public List<Project> searchByTechnology(
            String technology,
            List<Project> projects) {

        if (technology == null
                || technology.isBlank()
                || projects == null) {

            return List.of();
        }

        List<Project> result = new ArrayList<>();

        for (Project project : projects) {

            if (contains(
                    project.getTechnologies(),
                    technology)) {

                result.add(project);
            }
        }

        return result;
    }

    /**
     * Search projects by organization.
     */
    public List<Project> searchByOrganization(
            String organization,
            List<Project> projects) {

        if (organization == null
                || organization.isBlank()
                || projects == null) {

            return List.of();
        }

        List<Project> result = new ArrayList<>();

        for (Project project : projects) {

            if (contains(
                    project.getOrganization(),
                    organization)) {

                result.add(project);
            }
        }

        return result;
    }

    /**
     * Search projects by role.
     */
    public List<Project> searchByRole(
            String role,
            List<Project> projects) {

        if (role == null
                || role.isBlank()
                || projects == null) {

            return List.of();
        }

        List<Project> result = new ArrayList<>();

        for (Project project : projects) {

            if (contains(
                    project.getRole(),
                    role)) {

                result.add(project);
            }
        }

        return result;
    }

    /**
     * Get current/latest project.
     */
    public Project getLatestProject(
            List<Project> projects) {

        if (projects == null || projects.isEmpty()) {
            return null;
        }

        return projects.get(0);
    }

    /**
     * Get oldest project.
     */
    public Project getOldestProject(
            List<Project> projects) {

        if (projects == null || projects.isEmpty()) {
            return null;
        }

        return projects.get(projects.size() - 1);
    }

    /**
     * Normalize user query.
     */
    private String normalize(String value) {

        return value
                .toLowerCase()
                .replaceAll("[^a-z0-9+.#\\- ]", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }

    /**
     * Ignore common conversational words.
     *
     * These words should not be treated as project-search keywords.
     */
    private boolean isIgnoredWord(String word) {

        return switch (word) {

            case "tell",
                    "me",
                    "about",
                    "the",
                    "project",
                    "projects",
                    "explain",
                    "show",
                    "give",
                    "details",
                    "detail",
                    "information",
                    "of",
                    "for",
                    "what",
                    "which",
                    "are",
                    "is",
                    "has",
                    "have",
                    "worked",
                    "work",
                    "on",
                    "my",
                    "your",
                    "please",
                    "can",
                    "you",
                    "could",
                    "describe" ->
                true;

            default -> false;
        };
    }

    /**
     * Safe case-insensitive contains.
     */
    private boolean contains(
            String value,
            String search) {

        return value != null
                && search != null
                && !search.isBlank()
                && value.toLowerCase().contains(
                        search.toLowerCase());
    }
}