package com.rajeev.backend.dto;

public class DashboardAnalytics {

    private long portfolioViews;

    private long resumeDownloads;

    private long totalMessages;

    private long adminLogins;

    public long getPortfolioViews() {
        return portfolioViews;
    }

    public void setPortfolioViews(long portfolioViews) {
        this.portfolioViews = portfolioViews;
    }


    public long getResumeDownloads() {
        return resumeDownloads;
    }

    public void setResumeDownloads(long resumeDownloads) {
        this.resumeDownloads = resumeDownloads;
    }


    public long getTotalMessages() {
        return totalMessages;
    }

    public void setTotalMessages(long totalMessages) {
        this.totalMessages = totalMessages;
    }


    public long getAdminLogins() {
        return adminLogins;
    }

    public void setAdminLogins(long adminLogins) {
        this.adminLogins = adminLogins;
    }
}