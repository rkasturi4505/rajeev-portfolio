package com.rajeev.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.rajeev.backend.entity.PortfolioView;
import com.rajeev.backend.service.PortfolioViewService;

@RestController
@RequestMapping("/api/portfolio-views")
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioViewController {

    private final PortfolioViewService service;

    public PortfolioViewController(
            PortfolioViewService service) {

        this.service = service;
    }

    @PostMapping
    public PortfolioView trackPortfolioView() {

        return service.trackPortfolioView();
    }

    @GetMapping
    public List<PortfolioView> getAllPortfolioViews() {

        return service.getAllPortfolioViews();
    }
}