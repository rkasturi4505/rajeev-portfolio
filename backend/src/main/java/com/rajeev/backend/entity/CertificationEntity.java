package com.rajeev.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "certifications")
public class CertificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String name;


    @Column(nullable = false)
    private String issuer;


    @Column(length = 500)
    private String certificateUrl;



    public CertificationEntity() {
    }



    public CertificationEntity(
            String name,
            String issuer,
            String certificateUrl
    ) {

        this.name = name;
        this.issuer = issuer;
        this.certificateUrl = certificateUrl;

    }



    public Long getId() {
        return id;
    }



    public String getName() {
        return name;
    }



    public void setName(String name) {
        this.name = name;
    }



    public String getIssuer() {
        return issuer;
    }



    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }



    public String getCertificateUrl() {
        return certificateUrl;
    }



    public void setCertificateUrl(String certificateUrl) {
        this.certificateUrl = certificateUrl;
    }

}