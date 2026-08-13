package com.rajeev.backend.model;

public class Project {

    private String name;
    private String organization;
    private String role;
    private String duration;
    private String domain;
    private String teamSize;
    private String technologies;

    private String overview;
    private String businessProblem;
    private String responsibilities;
    private String architecture;
    private String challenges;
    private String solution;
    private String businessImpact;
    private String keyAchievements;
    private String keyLearnings;

    public Project() {
    }

    public Project(
            String name,
            String organization,
            String role,
            String duration,
            String domain,
            String teamSize,
            String technologies,
            String overview,
            String businessProblem,
            String responsibilities,
            String architecture,
            String challenges,
            String solution,
            String businessImpact,
            String keyAchievements,
            String keyLearnings
    ) {

        this.name = name;
        this.organization = organization;
        this.role = role;
        this.duration = duration;
        this.domain = domain;
        this.teamSize = teamSize;
        this.technologies = technologies;

        this.overview = overview;
        this.businessProblem = businessProblem;
        this.responsibilities = responsibilities;
        this.architecture = architecture;
        this.challenges = challenges;
        this.solution = solution;
        this.businessImpact = businessImpact;
        this.keyAchievements = keyAchievements;
        this.keyLearnings = keyLearnings;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getBusinessProblem() {
        return businessProblem;
    }

    public void setBusinessProblem(String businessProblem) {
        this.businessProblem = businessProblem;
    }

    public String getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(String responsibilities) {
        this.responsibilities = responsibilities;
    }

    public String getArchitecture() {
        return architecture;
    }

    public void setArchitecture(String architecture) {
        this.architecture = architecture;
    }

    public String getChallenges() {
        return challenges;
    }

    public void setChallenges(String challenges) {
        this.challenges = challenges;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getKeyAchievements() {
    return keyAchievements;
    }

    public void setKeyAchievements(String keyAchievements) {
    this.keyAchievements = keyAchievements;
    }

    public String getBusinessImpact() {
        return businessImpact;
    }

    public void setBusinessImpact(String businessImpact) {
        this.businessImpact = businessImpact;
    }

    public String getKeyLearnings() {
        return keyLearnings;
    }

    public void setKeyLearnings(String keyLearnings) {
        this.keyLearnings = keyLearnings;
    }

    @Override
    public String toString() {
        return "Project{" +
                "name='" + name + '\'' +
                ", organization='" + organization + '\'' +
                ", role='" + role + '\'' +
                ", duration='" + duration + '\'' +
                ", domain='" + domain + '\'' +
                ", teamSize='" + teamSize + '\'' +
                ", technologies='" + technologies + '\'' +
                '}';
    }
}