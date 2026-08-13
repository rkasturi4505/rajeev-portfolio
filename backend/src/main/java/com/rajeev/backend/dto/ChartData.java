    package com.rajeev.backend.dto;

public class ChartData {

    private String label;

    private Long value;


    public ChartData() {

    }


    public ChartData(
            String label,
            Long value
    ) {

        this.label = label;
        this.value = value;

    }


    public String getLabel() {

        return label;

    }


    public void setLabel(
            String label
    ) {

        this.label = label;

    }


    public Long getValue() {

        return value;

    }


    public void setValue(
            Long value
    ) {

        this.value = value;

    }

}