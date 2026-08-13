package com.rajeev.backend.controller;

import com.rajeev.backend.model.Portfolio;
import com.rajeev.backend.model.Project;
import com.rajeev.backend.service.PortfolioDataService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioController {

        private final PortfolioDataService portfolioDataService;

        public PortfolioController(
                        PortfolioDataService portfolioDataService) {
                this.portfolioDataService = portfolioDataService;
        }

        @GetMapping("/projects")
        public List<Project> getProjects() {

                return portfolioDataService.getProjects();

        }

        @GetMapping("/portfolio")
        public Portfolio getPortfolio() {

                return portfolioDataService.getPortfolio();

        }

}