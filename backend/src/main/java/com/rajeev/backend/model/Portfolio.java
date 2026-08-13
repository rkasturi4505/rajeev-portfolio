package com.rajeev.backend.model;

import java.util.List;

public class Portfolio {

    private Profile profile;
    private List<Project> projects;

    public Portfolio() {
    }

    public Portfolio(Profile profile, List<Project> projects) {
        this.profile = profile;
        this.projects = projects;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    @Override
    public String toString() {
        return "Portfolio{" +
                "profile=" + profile +
                ", projects=" + projects +
                '}';
    }
}