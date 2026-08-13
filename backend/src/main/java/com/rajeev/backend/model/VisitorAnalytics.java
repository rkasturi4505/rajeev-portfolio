package com.rajeev.backend.model;


public class VisitorAnalytics {

    private long totalVisitors;

    private long todayVisitors;

    private long uniqueCompanies;

    private long mobileUsers;

    private long desktopUsers;

    private String topBrowser;

    private String topCountry;


    public VisitorAnalytics() {

    }


    public VisitorAnalytics(
            long totalVisitors,
            long todayVisitors,
            long uniqueCompanies,
            long mobileUsers,
            long desktopUsers,
            String topBrowser,
            String topCountry
    ) {

        this.totalVisitors = totalVisitors;
        this.todayVisitors = todayVisitors;
        this.uniqueCompanies = uniqueCompanies;
        this.mobileUsers = mobileUsers;
        this.desktopUsers = desktopUsers;
        this.topBrowser = topBrowser;
        this.topCountry = topCountry;

    }


    public long getTotalVisitors() {
        return totalVisitors;
    }


    public void setTotalVisitors(long totalVisitors) {
        this.totalVisitors = totalVisitors;
    }


    public long getTodayVisitors() {
        return todayVisitors;
    }


    public void setTodayVisitors(long todayVisitors) {
        this.todayVisitors = todayVisitors;
    }


    public long getUniqueCompanies() {
        return uniqueCompanies;
    }


    public void setUniqueCompanies(long uniqueCompanies) {
        this.uniqueCompanies = uniqueCompanies;
    }


    public long getMobileUsers() {
        return mobileUsers;
    }


    public void setMobileUsers(long mobileUsers) {
        this.mobileUsers = mobileUsers;
    }


    public long getDesktopUsers() {
        return desktopUsers;
    }


    public void setDesktopUsers(long desktopUsers) {
        this.desktopUsers = desktopUsers;
    }


    public String getTopBrowser() {
        return topBrowser;
    }


    public void setTopBrowser(String topBrowser) {
        this.topBrowser = topBrowser;
    }


    public String getTopCountry() {
        return topCountry;
    }


    public void setTopCountry(String topCountry) {
        this.topCountry = topCountry;
    }

}