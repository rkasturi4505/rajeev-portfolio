package com.rajeev.backend.service;

import com.rajeev.backend.dto.ChartResponse;

public interface AnalyticsChartService {

    // ==========================================================
    // VISITOR TREND
    // ==========================================================
    ChartResponse getVisitorTrend();

    // ==========================================================
    // DEVICE STATISTICS
    // ==========================================================
    ChartResponse getDeviceStatistics();

    // ==========================================================
    // BROWSER STATISTICS
    // ==========================================================
    ChartResponse getBrowserStatistics();

    // ==========================================================
    // COUNTRY STATISTICS
    // ==========================================================
    ChartResponse getCountryStatistics();

    // ==========================================================
    // TOP VISITED PAGES
    // ==========================================================
    ChartResponse getTopVisitedPages();

}