package com.rajeev.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rajeev.backend.entity.PortfolioView;
import com.rajeev.backend.repository.PortfolioViewRepository;

@Service
public class PortfolioViewService {

    private final PortfolioViewRepository repository;

    public PortfolioViewService(
            PortfolioViewRepository repository) {

        this.repository = repository;
    }

    public PortfolioView trackPortfolioView() {

        PortfolioView view = new PortfolioView();

        view.setViewedAt(LocalDateTime.now());

        return repository.save(view);
    }

    public List<PortfolioView> getAllPortfolioViews() {

        return repository.findAllByOrderByViewedAtDesc();
    }
}