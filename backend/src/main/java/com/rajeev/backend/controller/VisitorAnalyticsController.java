package com.rajeev.backend.controller;


import com.rajeev.backend.model.VisitorAnalytics;
import com.rajeev.backend.service.VisitorAnalyticsService;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/visitor-sessions")
@CrossOrigin(origins = "http://localhost:5173")
public class VisitorAnalyticsController {


    private final VisitorAnalyticsService visitorAnalyticsService;



    public VisitorAnalyticsController(
            VisitorAnalyticsService visitorAnalyticsService
    ) {

        this.visitorAnalyticsService = visitorAnalyticsService;

    }



    // ==========================================================
    // VISITOR ANALYTICS
    // ==========================================================

    @GetMapping("/analytics")
    public VisitorAnalytics getVisitorAnalytics() {


        return visitorAnalyticsService.getVisitorAnalytics();


    }


}