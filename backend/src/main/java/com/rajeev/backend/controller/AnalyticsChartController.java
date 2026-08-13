package com.rajeev.backend.controller;

import com.rajeev.backend.dto.ChartResponse;
import com.rajeev.backend.service.AnalyticsChartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics/charts")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsChartController {

    private final AnalyticsChartService analyticsChartService;

    public AnalyticsChartController(
            AnalyticsChartService analyticsChartService) {

        this.analyticsChartService = analyticsChartService;
    }

    // ==========================================================
    // VISITOR TREND
    // ==========================================================

    @GetMapping("/visitor-trend")
    public ResponseEntity<ChartResponse> getVisitorTrend() {

        return ResponseEntity.ok(
                analyticsChartService.getVisitorTrend()
        );
    }

    // ==========================================================
    // DEVICE TYPES
    // ==========================================================

    @GetMapping("/device-types")
    public ResponseEntity<ChartResponse> getDeviceStatistics() {

        return ResponseEntity.ok(
                analyticsChartService.getDeviceStatistics()
        );
    }

    // ==========================================================
    // BROWSER USAGE
    // ==========================================================

    @GetMapping("/browser-usage")
    public ResponseEntity<ChartResponse> getBrowserStatistics() {

        return ResponseEntity.ok(
                analyticsChartService.getBrowserStatistics()
        );
    }

    // ==========================================================
    // COUNTRY STATS
    // ==========================================================

    @GetMapping("/countries")
    public ResponseEntity<ChartResponse> getCountryStatistics() {

        return ResponseEntity.ok(
                analyticsChartService.getCountryStatistics()
        );
    }

    // ==========================================================
    // TOP PAGES
    // ==========================================================

    @GetMapping("/top-pages")
    public ResponseEntity<ChartResponse> getTopVisitedPages() {

        return ResponseEntity.ok(
                analyticsChartService.getTopVisitedPages()
        );
    }
}