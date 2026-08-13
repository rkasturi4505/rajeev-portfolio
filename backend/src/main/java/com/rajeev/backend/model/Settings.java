package com.rajeev.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "settings")
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String adminName;

    private String adminEmail;

    private String role;

    private String applicationName;

    private String backendTechnology;

    private String frontendTechnology;


    public Settings() {
    }


    public Settings(
            String adminName,
            String adminEmail,
            String role,
            String applicationName,
            String backendTechnology,
            String frontendTechnology
    ) {
        this.adminName = adminName;
        this.adminEmail = adminEmail;
        this.role = role;
        this.applicationName = applicationName;
        this.backendTechnology = backendTechnology;
        this.frontendTechnology = frontendTechnology;
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getAdminName() {
        return adminName;
    }


    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }


    public String getAdminEmail() {
        return adminEmail;
    }


    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }


    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }


    public String getApplicationName() {
        return applicationName;
    }


    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }


    public String getBackendTechnology() {
        return backendTechnology;
    }


    public void setBackendTechnology(String backendTechnology) {
        this.backendTechnology = backendTechnology;
    }


    public String getFrontendTechnology() {
        return frontendTechnology;
    }


    public void setFrontendTechnology(String frontendTechnology) {
        this.frontendTechnology = frontendTechnology;
    }
}