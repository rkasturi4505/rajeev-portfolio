package com.rajeev.backend.service;

import com.rajeev.backend.model.Project;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectStatisticsService {

    /**
     * Get total number of projects.
     */
    public int getTotalProjects(List<Project> projects) {

        return projects == null ? 0 : projects.size();
    }

    /**
     * Count projects by domain.
     */
    public Map<String, Integer> getProjectsByDomain(
            List<Project> projects) {

        Map<String, Integer> domainCounts = new LinkedHashMap<>();

        if (projects == null) {
            return domainCounts;
        }

        for (Project project : projects) {

            String domain = project.getDomain();

            if (domain == null || domain.isBlank()) {
                continue;
            }

            domainCounts.put(
                    domain,
                    domainCounts.getOrDefault(domain, 0) + 1);
        }

        return domainCounts;
    }

    /**
     * Count projects by technology.
     */
    public Map<String, Integer> getProjectsByTechnology(
            List<Project> projects) {

        Map<String, Integer> technologyCounts = new LinkedHashMap<>();

        if (projects == null) {
            return technologyCounts;
        }

        for (Project project : projects) {

            String technologies = project.getTechnologies();

            if (technologies == null || technologies.isBlank()) {
                continue;
            }

            String[] technologyList = technologies.split(",");

            for (String technology : technologyList) {

                String cleanTechnology = technology.trim();

                if (!cleanTechnology.isBlank()) {

                    technologyCounts.put(
                            cleanTechnology,
                            technologyCounts.getOrDefault(
                                    cleanTechnology,
                                    0) + 1);
                }
            }
        }

        return technologyCounts;
    }

    /**
     * Count projects by organization.
     */
    public Map<String, Integer> getProjectsByOrganization(
            List<Project> projects) {

        Map<String, Integer> organizationCounts = new LinkedHashMap<>();

        if (projects == null) {
            return organizationCounts;
        }

        for (Project project : projects) {

            String organization = project.getOrganization();

            if (organization == null
                    || organization.isBlank()) {
                continue;
            }

            organizationCounts.put(
                    organization,
                    organizationCounts.getOrDefault(
                            organization,
                            0) + 1);
        }

        return organizationCounts;
    }

    /**
     * Find the project using the specified technology.
     */
    public List<Project> getProjectsUsingTechnology(
            String technology,
            List<Project> projects) {

        if (technology == null
                || technology.isBlank()
                || projects == null) {

            return List.of();
        }

        return projects.stream()
                .filter(project -> project.getTechnologies() != null
                        && project.getTechnologies()
                                .toLowerCase()
                                .contains(
                                        technology.toLowerCase()))
                .toList();
    }

    /**
     * Find projects belonging to a domain.
     */
    public List<Project> getProjectsByDomain(
            String domain,
            List<Project> projects) {

        if (domain == null
                || domain.isBlank()
                || projects == null) {

            return List.of();
        }

        return projects.stream()
                .filter(project -> project.getDomain() != null
                        && project.getDomain()
                                .toLowerCase()
                                .contains(
                                        domain.toLowerCase()))
                .toList();
    }

}