package com.rajeev.backend.dto;

public class VisitorTrend {

    private String label;

    private long visitors;

    public VisitorTrend() {
    }

    public VisitorTrend(
            String label,
            long visitors
    ) {
        this.label = label;
        this.visitors = visitors;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(
            String label
    ) {
        this.label = label;
    }

    public long getVisitors() {
        return visitors;
    }

    public void setVisitors(
            long visitors
    ) {
        this.visitors = visitors;
    }

}