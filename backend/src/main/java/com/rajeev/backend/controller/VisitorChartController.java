package com.rajeev.backend.controller;

import com.rajeev.backend.dto.ChartData;
import com.rajeev.backend.service.VisitorChartService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/visitor-sessions/charts")
@CrossOrigin(origins = "http://localhost:5173")
public class VisitorChartController {

    private final VisitorChartService visitorChartService;

    public VisitorChartController(
            VisitorChartService visitorChartService
    ) {

        this.visitorChartService = visitorChartService;

    }

    // ==========================================================
    // DEVICE CHART
    // ==========================================================

    @GetMapping("/device")
    public List<ChartData> getDeviceChart() {

        return visitorChartService.getDeviceChart();

    }

    // ==========================================================
    // BROWSER CHART
    // ==========================================================

    @GetMapping("/browser")
    public List<ChartData> getBrowserChart() {

        return visitorChartService.getBrowserChart();

    }

    // ==========================================================
    // COUNTRY CHART
    // ==========================================================

    @GetMapping("/country")
    public List<ChartData> getCountryChart() {

        return visitorChartService.getCountryChart();

    }

    // ==========================================================
    // COMPANY CHART
    // ==========================================================

    @GetMapping("/company")
    public List<ChartData> getCompanyChart() {

        return visitorChartService.getCompanyChart();

    }

    // ==========================================================
    // PAGE VISITS CHART
    // ==========================================================

    @GetMapping("/pages")
    public List<ChartData> getPageChart() {

        return visitorChartService.getPageChart();

    }

}