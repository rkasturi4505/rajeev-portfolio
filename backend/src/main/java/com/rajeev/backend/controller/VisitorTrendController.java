package com.rajeev.backend.controller;

import com.rajeev.backend.dto.VisitorTrend;
import com.rajeev.backend.service.VisitorTrendService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/visitor-trends")
@CrossOrigin(origins = "http://localhost:5173")
public class VisitorTrendController {

    private final VisitorTrendService visitorTrendService;

    public VisitorTrendController(
            VisitorTrendService visitorTrendService
    ) {
        this.visitorTrendService = visitorTrendService;
    }

    /**
     * Last 7 Days Trend
     */
    @GetMapping("/last7days")
    public List<VisitorTrend> getLast7DaysTrend() {

        return visitorTrendService.getLast7DaysTrend();

    }

    /**
     * Last 30 Days Trend
     */
    @GetMapping("/last30days")
    public List<VisitorTrend> getLast30DaysTrend() {

        return visitorTrendService.getLast30DaysTrend();

    }

    /**
     * Last 6 Months Trend
     */
    @GetMapping("/monthly")
    public List<VisitorTrend> getMonthlyTrend() {

        return visitorTrendService.getMonthlyTrend();

    }

}