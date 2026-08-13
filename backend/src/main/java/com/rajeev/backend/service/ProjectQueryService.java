package com.rajeev.backend.service;

import com.rajeev.backend.model.Project;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectQueryService {

    private final ProjectSearchService projectSearchService;

    public ProjectQueryService(
            ProjectSearchService projectSearchService
    ) {
        this.projectSearchService = projectSearchService;
    }

    /**
     * Find projects relevant to the user's natural-language query.
     */
    public List<Project> findRelevantProjects(
            String query,
            List<Project> projects
    ) {

        if (query == null
                || query.isBlank()
                || projects == null
                || projects.isEmpty()) {

            return List.of();
        }

        String search = query.toLowerCase();

        /*
         * Healthcare projects
         */
        if (containsAny(
                search,
                "healthcare",
                "health care",
                "healthcare projects",
                "health projects"
        )) {

            return projectSearchService.searchByDomain(
                    "Healthcare",
                    projects
            );
        }

        /*
         * Insurance projects
         */
        if (containsAny(
                search,
                "insurance",
                "insurance projects"
        )) {

            return projectSearchService.searchByDomain(
                    "Insurance",
                    projects
            );
        }

        /*
         * Financial Services projects
         */
        if (containsAny(
                search,
                "financial services",
                "finance projects",
                "financial projects"
        )) {

            return projectSearchService.searchByDomain(
                    "Financial Services",
                    projects
            );
        }

        /*
         * Spring Boot projects
         */
        if (containsAny(
                search,
                "spring boot",
                "springboot"
        )) {

            return projectSearchService.searchByTechnology(
                    "Spring Boot",
                    projects
            );
        }

        /*
         * Java projects
         */
        if (containsAny(
                search,
                "java projects",
                "projects using java",
                "projects with java"
        )) {

            return projectSearchService.searchByTechnology(
                    "Java",
                    projects
            );
        }

        /*
         * Docker projects
         */
        if (containsAny(
                search,
                "docker projects",
                "projects using docker",
                "projects with docker"
        )) {

            return projectSearchService.searchByTechnology(
                    "Docker",
                    projects
            );
        }

        /*
         * Azure projects
         */
        if (containsAny(
                search,
                "azure projects",
                "projects using azure",
                "projects with azure"
        )) {

            return projectSearchService.searchByTechnology(
                    "Azure",
                    projects
            );
        }

        /*
         * Microservices projects
         */
        if (containsAny(
                search,
                "microservices projects",
                "projects using microservices",
                "projects with microservices"
        )) {

            return projectSearchService.searchByTechnology(
                    "Microservices",
                    projects
            );
        }

        /*
         * Direct project-name search.
         *
         * Example:
         * "Tell me about DTCC"
         */
        return projectSearchService.searchProjects(
                query,
                projects
        );
    }


    /**
     * Check whether query contains any supplied phrase.
     */
    private boolean containsAny(
            String query,
            String... values
    ) {

        for (String value : values) {

            if (query.contains(value)) {
                return true;
            }
        }

        return false;
    }
}