package com.rajeev.backend.ai;

import com.rajeev.backend.entity.SkillEntity;
import com.rajeev.backend.model.Experience;
import com.rajeev.backend.model.Portfolio;
import com.rajeev.backend.model.Profile;
import com.rajeev.backend.model.Project;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PortfolioKnowledgeService {

    /*
     * ============================================================
     * PROFILE
     * ============================================================
     */
    public Profile getProfile(Portfolio portfolio) {

        if (portfolio == null) {
            return null;
        }

        return portfolio.getProfile();
    }

    /*
     * ============================================================
     * PROJECTS
     * ============================================================
     */
    public List<Project> getProjects(Portfolio portfolio) {

        if (portfolio == null
                || portfolio.getProjects() == null) {

            return new ArrayList<>();
        }

        return portfolio.getProjects();
    }

    /*
     * ============================================================
     * SKILLS
     * ============================================================
     */
    public List<SkillEntity> getSkills(Portfolio portfolio) {

        if (portfolio == null
                || portfolio.getProfile() == null
                || portfolio.getProfile().getSkills() == null) {

            return new ArrayList<>();
        }

        return portfolio.getProfile().getSkills();
    }

    /*
     * ============================================================
     * EXPERIENCE DETAILS
     * ============================================================
     *
     * IMPORTANT:
     *
     * Profile.getExperience()
     *      -> String
     *
     * Profile.getExperienceDetails()
     *      -> List<Experience>
     */
    public List<Experience> getExperienceDetails(
            Portfolio portfolio) {

        if (portfolio == null
                || portfolio.getProfile() == null
                || portfolio.getProfile()
                        .getExperienceDetails() == null) {

            return new ArrayList<>();
        }

        return portfolio.getProfile()
                .getExperienceDetails();
    }

    /*
     * ============================================================
     * FIND PROJECT BY EXACT NAME
     * ============================================================
     */
    public Project findProjectByName(
            Portfolio portfolio,
            String projectName) {

        if (portfolio == null
                || portfolio.getProjects() == null
                || projectName == null) {

            return null;
        }

        String search =
                projectName.toLowerCase().trim();

        for (Project project : portfolio.getProjects()) {

            if (project == null
                    || project.getName() == null) {
                continue;
            }

            if (project.getName()
                    .toLowerCase()
                    .equals(search)) {

                return project;
            }
        }

        return null;
    }

    /*
     * ============================================================
     * FIND PROJECT BY KEYWORD
     * ============================================================
     */
    public Project findProjectByKeyword(
            Portfolio portfolio,
            String keyword) {

        if (portfolio == null
                || portfolio.getProjects() == null
                || keyword == null) {

            return null;
        }

        String search =
                keyword.toLowerCase().trim();

        for (Project project : portfolio.getProjects()) {

            if (project == null) {
                continue;
            }

            if (contains(project.getName(), search)
                    || contains(project.getOrganization(), search)
                    || contains(project.getOverview(), search)
                    || contains(project.getDomain(), search)
                    || contains(project.getTechnologies(), search)
                    || contains(project.getResponsibilities(), search)
                    || contains(project.getArchitecture(), search)
                    || contains(project.getBusinessProblem(), search)
                    || contains(project.getChallenges(), search)
                    || contains(project.getSolution(), search)
                    || contains(project.getBusinessImpact(), search)
                    || contains(project.getKeyAchievements(), search)
                    || contains(project.getKeyLearnings(), search)) {

                return project;
            }
        }

        return null;
    }

    /*
     * ============================================================
     * FIND PROJECTS BY TECHNOLOGY
     * ============================================================
     */
    public List<Project> findProjectsByTechnology(
            Portfolio portfolio,
            String technology) {

        List<Project> result =
                new ArrayList<>();

        if (portfolio == null
                || portfolio.getProjects() == null
                || technology == null) {

            return result;
        }

        String search =
                technology.toLowerCase().trim();

        for (Project project :
                portfolio.getProjects()) {

            if (project == null) {
                continue;
            }

            if (contains(
                    project.getTechnologies(),
                    search)) {

                result.add(project);
            }
        }

        return result;
    }

    /*
     * ============================================================
     * FIND PROJECTS BY DOMAIN
     * ============================================================
     */
    public List<Project> findProjectsByDomain(
            Portfolio portfolio,
            String domain) {

        List<Project> result =
                new ArrayList<>();

        if (portfolio == null
                || portfolio.getProjects() == null
                || domain == null) {

            return result;
        }

        String search =
                domain.toLowerCase().trim();

        for (Project project :
                portfolio.getProjects()) {

            if (project == null) {
                continue;
            }

            if (contains(
                    project.getDomain(),
                    search)) {

                result.add(project);
            }
        }

        return result;
    }

    /*
     * ============================================================
     * FIND PROJECTS BY ORGANIZATION
     * ============================================================
     */
    public List<Project> findProjectsByOrganization(
            Portfolio portfolio,
            String organization) {

        List<Project> result =
                new ArrayList<>();

        if (portfolio == null
                || portfolio.getProjects() == null
                || organization == null) {

            return result;
        }

        String search =
                organization.toLowerCase().trim();

        for (Project project :
                portfolio.getProjects()) {

            if (project == null) {
                continue;
            }

            if (contains(
                    project.getOrganization(),
                    search)) {

                result.add(project);
            }
        }

        return result;
    }

    /*
     * ============================================================
     * FIND PROJECTS BY ROLE
     * ============================================================
     */
    public List<Project> findProjectsByRole(
            Portfolio portfolio,
            String role) {

        List<Project> result =
                new ArrayList<>();

        if (portfolio == null
                || portfolio.getProjects() == null
                || role == null) {

            return result;
        }

        String search =
                role.toLowerCase().trim();

        for (Project project :
                portfolio.getProjects()) {

            if (project == null) {
                continue;
            }

            if (contains(
                    project.getRole(),
                    search)) {

                result.add(project);
            }
        }

        return result;
    }

    /*
     * ============================================================
     * FIND EXPERIENCE BY COMPANY
     * ============================================================
     */
    public Experience findExperienceByCompany(
            Portfolio portfolio,
            String company) {

        if (portfolio == null
                || portfolio.getProfile() == null
                || portfolio.getProfile()
                        .getExperienceDetails() == null
                || company == null) {

            return null;
        }

        String search =
                company.toLowerCase().trim();

        for (Experience experience :
                portfolio.getProfile()
                        .getExperienceDetails()) {

            if (experience == null) {
                continue;
            }

            if (contains(
                    experience.getCompany(),
                    search)
                    || contains(
                    experience.getClient(),
                    search)) {

                return experience;
            }
        }

        return null;
    }

    /*
     * ============================================================
     * FIND EXPERIENCE BY TECHNOLOGY
     * ============================================================
     */
    public List<Experience> findExperienceByTechnology(
            Portfolio portfolio,
            String technology) {

        List<Experience> result =
                new ArrayList<>();

        if (portfolio == null
                || portfolio.getProfile() == null
                || portfolio.getProfile()
                        .getExperienceDetails() == null
                || technology == null) {

            return result;
        }

        String search =
                technology.toLowerCase().trim();

        for (Experience experience :
                portfolio.getProfile()
                        .getExperienceDetails()) {

            if (experience == null
                    || experience.getTechnologies() == null) {

                continue;
            }

            for (String tech :
                    experience.getTechnologies()) {

                if (contains(tech, search)) {

                    result.add(experience);
                    break;
                }
            }
        }

        return result;
    }

    /*
     * ============================================================
     * FIND EXPERIENCE BY CLIENT
     * ============================================================
     */
    public Experience findExperienceByClient(
            Portfolio portfolio,
            String client) {

        if (portfolio == null
                || portfolio.getProfile() == null
                || portfolio.getProfile()
                        .getExperienceDetails() == null
                || client == null) {

            return null;
        }

        String search =
                client.toLowerCase().trim();

        for (Experience experience :
                portfolio.getProfile()
                        .getExperienceDetails()) {

            if (experience == null) {
                continue;
            }

            if (contains(
                    experience.getClient(),
                    search)) {

                return experience;
            }
        }

        return null;
    }

    /*
     * ============================================================
     * GENERIC PROJECT SEARCH
     * ============================================================
     */
    public Project searchProject(
            Portfolio portfolio,
            String keyword) {

        if (portfolio == null
                || portfolio.getProjects() == null
                || keyword == null) {

            return null;
        }

        String search =
                keyword.toLowerCase().trim();

        for (Project project :
                portfolio.getProjects()) {

            if (project == null) {
                continue;
            }

            if (contains(project.getName(), search)
                    || contains(project.getOrganization(), search)
                    || contains(project.getRole(), search)
                    || contains(project.getDomain(), search)
                    || contains(project.getTechnologies(), search)
                    || contains(project.getOverview(), search)
                    || contains(project.getArchitecture(), search)
                    || contains(project.getBusinessProblem(), search)
                    || contains(project.getResponsibilities(), search)
                    || contains(project.getChallenges(), search)
                    || contains(project.getSolution(), search)
                    || contains(project.getBusinessImpact(), search)
                    || contains(project.getKeyAchievements(), search)
                    || contains(project.getKeyLearnings(), search)) {

                return project;
            }
        }

        return null;
    }

    /*
     * ============================================================
     * TOTAL PROJECTS
     * ============================================================
     */
    public int totalProjects(
            Portfolio portfolio) {

        if (portfolio == null
                || portfolio.getProjects() == null) {

            return 0;
        }

        return portfolio.getProjects().size();
    }

    /*
     * ============================================================
     * TOTAL SKILLS
     * ============================================================
     */
    public int totalSkills(
            Portfolio portfolio) {

        if (portfolio == null
                || portfolio.getProfile() == null
                || portfolio.getProfile()
                        .getSkills() == null) {

            return 0;
        }

        return portfolio.getProfile()
                .getSkills()
                .size();
    }

    /*
     * ============================================================
     * TOTAL EXPERIENCE RECORDS
     * ============================================================
     */
    public int totalExperienceRecords(
            Portfolio portfolio) {

        if (portfolio == null
                || portfolio.getProfile() == null
                || portfolio.getProfile()
                        .getExperienceDetails() == null) {

            return 0;
        }

        return portfolio.getProfile()
                .getExperienceDetails()
                .size();
    }

    /*
     * ============================================================
     * TOTAL COMPANIES
     * ============================================================
     *
     * Currently each Experience record represents a project/client
     * engagement. This returns the number of experience records.
     */
    public int totalCompanies(
            Portfolio portfolio) {

        return totalExperienceRecords(portfolio);
    }

    /*
     * ============================================================
     * TOTAL CERTIFICATIONS
     * ============================================================
     */
    public int totalCertifications(
            Portfolio portfolio) {

        if (portfolio == null
                || portfolio.getProfile() == null
                || portfolio.getProfile()
                        .getCertifications() == null) {

            return 0;
        }

        return portfolio.getProfile()
                .getCertifications()
                .size();
    }

    /*
     * ============================================================
     * CONTAINS
     * ============================================================
     */
    private boolean contains(
            String value,
            String keyword) {

        return value != null
                && keyword != null
                && value.toLowerCase()
                        .contains(keyword.toLowerCase());
    }
}