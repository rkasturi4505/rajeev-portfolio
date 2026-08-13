package com.rajeev.backend.model;

public class Certification {

    private String name;

    private String issuer;

    private String certificateUrl;


    public Certification(
            String name,
            String issuer,
            String certificateUrl
    ) {

        this.name = name;
        this.issuer = issuer;
        this.certificateUrl = certificateUrl;

    }


    public String getName() {
        return name;
    }


    public String getIssuer() {
        return issuer;
    }


    public String getCertificateUrl() {
        return certificateUrl;
    }

}