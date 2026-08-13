package com.rajeev.backend.service;

import com.rajeev.backend.model.Project;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectComparisonService {

    /**
     * Find projects matching a domain.
     */
    public List<Project> findByDomain(
            String domain,
            List<Project> projects) {

        if (domain == null || domain.isBlank()) {
            return List.of();
        }

        return projects.stream()
                .filter(project -> project.getDomain() != null
                        && project.getDomain()
                                .toLowerCase()
                                .contains(domain.toLowerCase()))
                .toList();
    }

    /**
     * Find projects using a technology.
     */
    public List<Project> findByTechnology(
            String technology,
            List<Project> projects) {

        if (technology == null || technology.isBlank()) {
            return List.of();
        }

        return projects.stream()
                .filter(project -> project.getTechnologies() != null
                        && project.getTechnologies()
                                .toLowerCase()
                                .contains(technology.toLowerCase()))
                .toList();
    }

    /**
     * Find projects matching both domain and technology.
     */
    public List<Project> findByDomainAndTechnology(
            String domain,
            String technology,
            List<Project> projects) {

        if (domain == null || domain.isBlank()
                || technology == null || technology.isBlank()) {

            return List.of();
        }

        return projects.stream()
                .filter(project -> project.getDomain() != null
                        && project.getTechnologies() != null
                        && project.getDomain()
                                .toLowerCase()
                                .contains(domain.toLowerCase())
                        && project.getTechnologies()
                                .toLowerCase()
                                .contains(technology.toLowerCase()))
                .toList();
    }
}