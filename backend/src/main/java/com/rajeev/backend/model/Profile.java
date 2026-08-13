package com.rajeev.backend.model;

import com.rajeev.backend.entity.EducationEntity;
import com.rajeev.backend.entity.SkillEntity;

import java.util.List;

public class Profile {

    private String name;
    private String title;
    private String experience;
    private String summary;
    private String image;

    private List<String> roles;

    private List<SkillEntity> skills;

    private List<Experience> experienceDetails;

    private List<Certification> certifications;

    private List<EducationEntity> education;


    /*
     * ==========================================================
     * DEFAULT CONSTRUCTOR
     * ==========================================================
     */
    public Profile() {
    }


    /*
     * ==========================================================
     * FULL CONSTRUCTOR
     * ==========================================================
     */
    public Profile(
            String name,
            String title,
            String experience,
            String summary,
            String image,
            List<String> roles,
            List<SkillEntity> skills,
            List<Experience> experienceDetails,
            List<Certification> certifications,
            List<EducationEntity> education) {

        this.name = name;
        this.title = title;
        this.experience = experience;
        this.summary = summary;
        this.image = image;
        this.roles = roles;
        this.skills = skills;
        this.experienceDetails = experienceDetails;
        this.certifications = certifications;
        this.education = education;
    }


    /*
     * ==========================================================
     * NAME
     * ==========================================================
     */
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    /*
     * ==========================================================
     * TITLE
     * ==========================================================
     */
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    /*
     * ==========================================================
     * EXPERIENCE
     * ==========================================================
     *
     * This is the overall experience text.
     *
     * Example:
     * "9+ Years of Professional Experience"
     */
    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }


    /*
     * ==========================================================
     * SUMMARY
     * ==========================================================
     */
    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }


    /*
     * ==========================================================
     * PROFILE IMAGE
     * ==========================================================
     */
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    /*
     * ==========================================================
     * ROLES
     * ==========================================================
     */
    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }


    /*
     * ==========================================================
     * SKILLS
     * ==========================================================
     */
    public List<SkillEntity> getSkills() {
        return skills;
    }

    public void setSkills(List<SkillEntity> skills) {
        this.skills = skills;
    }


    /*
     * ==========================================================
     * PROFESSIONAL EXPERIENCE DETAILS
     * ==========================================================
     *
     * This contains:
     *
     * TCS
     * DTCC
     * MetLife
     * McKesson
     * HCSC
     * DaVita
     *
     */
    public List<Experience> getExperienceDetails() {
        return experienceDetails;
    }

    public void setExperienceDetails(
            List<Experience> experienceDetails) {

        this.experienceDetails = experienceDetails;
    }


    /*
     * ==========================================================
     * CERTIFICATIONS
     * ==========================================================
     */
    public List<Certification> getCertifications() {
        return certifications;
    }

    public void setCertifications(
            List<Certification> certifications) {

        this.certifications = certifications;
    }


    /*
     * ==========================================================
     * EDUCATION
     * ==========================================================
     */
    public List<EducationEntity> getEducation() {
        return education;
    }

    public void setEducation(
            List<EducationEntity> education) {

        this.education = education;
    }


    /*
     * ==========================================================
     * TO STRING
     * ==========================================================
     */
    @Override
    public String toString() {

        return "Profile{" +
                "name='" + name + '\'' +
                ", title='" + title + '\'' +
                ", experience='" + experience + '\'' +
                ", summary='" + summary + '\'' +
                ", image='" + image + '\'' +
                ", roles=" + roles +
                ", skills=" + skills +
                ", experienceDetails=" + experienceDetails +
                ", certifications=" + certifications +
                ", education=" + education +
                '}';
    }
}