package com.rajeev.backend.dto;

import com.rajeev.backend.entity.EducationEntity;
import com.rajeev.backend.model.Certification;
import com.rajeev.backend.model.Experience;
import com.rajeev.backend.model.Portfolio;
import com.rajeev.backend.model.Project;

import java.util.List;

public class AIContextResponse {

    private Portfolio profile;

    private List<Project> projects;

    private List<Experience> experiences;

    private List<EducationEntity> education;

    private List<Certification> certifications;

    public Portfolio getProfile() {
        return profile;
    }

    public void setProfile(Portfolio profile) {
        this.profile = profile;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Experience> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<Experience> experiences) {
        this.experiences = experiences;
    }

    public List<EducationEntity> getEducation() {
        return education;
    }

    public void setEducation(List<EducationEntity> education) {
        this.education = education;
    }

    public List<Certification> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<Certification> certifications) {
        this.certifications = certifications;
    }
}