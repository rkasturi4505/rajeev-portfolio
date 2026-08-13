package com.rajeev.backend.controller;

import com.rajeev.backend.service.AnalyticsService;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

        private final AnalyticsService analyticsService;

        public AnalyticsController(
                        AnalyticsService analyticsService) {
                this.analyticsService = analyticsService;
        }

        @GetMapping("/dashboard")
        public Map<String, Long> dashboard() {

                Map<String, Long> dashboard = new LinkedHashMap<>();

                dashboard.put(
                                "portfolioViews",
                                analyticsService.getMetric("portfolio_views"));

                dashboard.put(
                                "resumeDownloads",
                                analyticsService.getMetric("resume_downloads"));

                dashboard.put(
                                "adminLogins",
                                analyticsService.getMetric("admin_logins"));

                dashboard.put(
                                "totalMessages",
                                analyticsService.getMetric("total_messages"));

                return dashboard;
        }

        @PostMapping("/portfolio-view")
        public void portfolioView() {

                analyticsService.incrementMetric(
                                "portfolio_views");

        }

        @PostMapping("/resume-download")
        public void resumeDownload() {

                analyticsService.incrementMetric(
                                "resume_downloads");

        }

        @PostMapping("/admin-login")
        public void adminLogin() {

                analyticsService.incrementMetric(
                                "admin_logins");

        }

}