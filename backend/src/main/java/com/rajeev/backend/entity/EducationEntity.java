package com.rajeev.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "education")
public class EducationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String degree;

    @Column(nullable = false)
    private String institution;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private String duration;

    public EducationEntity() {
    }

    public EducationEntity(
            String degree,
            String institution,
            String specialization,
            String duration
    ) {
        this.degree = degree;
        this.institution = institution;
        this.specialization = specialization;
        this.duration = duration;
    }

    public Long getId() {
        return id;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
}