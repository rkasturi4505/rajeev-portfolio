package com.rajeev.backend.model;

import java.util.List;

/**
 * ==========================================================
 * EXPERIENCE MODEL
 * ==========================================================
 *
 * Represents Rajeev Kumar Kasturi's professional experience.
 *
 * Each experience entry contains:
 *
 * • Company
 * • Client / Project
 * • Designation
 * • Duration
 * • Location
 * • Employment Type
 * • Technologies
 * • Responsibilities
 *
 * ==========================================================
 */
public class Experience {

    /*
     * ==========================================================
     * COMPANY
     * ==========================================================
     */
    private String company;

    /*
     * ==========================================================
     * CLIENT / PROJECT
     * ==========================================================
     */
    private String client;

    /*
     * ==========================================================
     * DESIGNATION
     * ==========================================================
     */
    private String designation;

    /*
     * ==========================================================
     * DURATION
     * ==========================================================
     */
    private String duration;

    /*
     * ==========================================================
     * LOCATION
     * ==========================================================
     */
    private String location;

    /*
     * ==========================================================
     * EMPLOYMENT TYPE
     * ==========================================================
     */
    private String employmentType;

    /*
     * ==========================================================
     * TECHNOLOGIES
     * ==========================================================
     */
    private List<String> technologies;

    /*
     * ==========================================================
     * RESPONSIBILITIES
     * ==========================================================
     */
    private List<String> responsibilities;


    /*
     * ==========================================================
     * DEFAULT CONSTRUCTOR
     * ==========================================================
     */
    public Experience() {
    }


    /*
     * ==========================================================
     * FULL CONSTRUCTOR
     * ==========================================================
     */
    public Experience(
            String company,
            String client,
            String designation,
            String duration,
            String location,
            String employmentType,
            List<String> technologies,
            List<String> responsibilities) {

        this.company = company;
        this.client = client;
        this.designation = designation;
        this.duration = duration;
        this.location = location;
        this.employmentType = employmentType;
        this.technologies = technologies;
        this.responsibilities = responsibilities;
    }


    /*
     * ==========================================================
     * COMPANY
     * ==========================================================
     */
    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }


    /*
     * ==========================================================
     * CLIENT / PROJECT
     * ==========================================================
     */
    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }


    /*
     * ==========================================================
     * DESIGNATION
     * ==========================================================
     */
    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }


    /*
     * ==========================================================
     * DURATION
     * ==========================================================
     */
    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }


    /*
     * ==========================================================
     * LOCATION
     * ==========================================================
     */
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    /*
     * ==========================================================
     * EMPLOYMENT TYPE
     * ==========================================================
     */
    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }


    /*
     * ==========================================================
     * TECHNOLOGIES
     * ==========================================================
     */
    public List<String> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(List<String> technologies) {
        this.technologies = technologies;
    }


    /*
     * ==========================================================
     * RESPONSIBILITIES
     * ==========================================================
     */
    public List<String> getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(
            List<String> responsibilities) {

        this.responsibilities = responsibilities;
    }


    /*
     * ==========================================================
     * TO STRING
     * ==========================================================
     */
    @Override
    public String toString() {

        return "Experience{" +
                "company='" + company + '\'' +
                ", client='" + client + '\'' +
                ", designation='" + designation + '\'' +
                ", duration='" + duration + '\'' +
                ", location='" + location + '\'' +
                ", employmentType='" + employmentType + '\'' +
                ", technologies=" + technologies +
                ", responsibilities=" + responsibilities +
                '}';
    }
}