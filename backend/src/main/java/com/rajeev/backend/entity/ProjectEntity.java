package com.rajeev.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String projectName;

    @Column(nullable = false)
    private String organization;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String duration;

    private String domain;

    private String teamSize;

    @Column(length = 1000)
    private String technologies;

    @Column(length = 3000)
    private String description;

    public ProjectEntity() {
    }

    public ProjectEntity(
            String projectName,
            String organization,
            String role,
            String duration,
            String domain,
            String teamSize,
            String technologies,
            String description
    ) {
        this.projectName = projectName;
        this.organization = organization;
        this.role = role;
        this.duration = duration;
        this.domain = domain;
        this.teamSize = teamSize;
        this.technologies = technologies;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getTeamSize() {
        return teamSize;
    }

    public void setTeamSize(String teamSize) {
        this.teamSize = teamSize;
    }

    public String getTechnologies() {
        return technologies;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}