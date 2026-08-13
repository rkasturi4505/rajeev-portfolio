package com.rajeev.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rajeev.backend.entity.PortfolioView;

public interface PortfolioViewRepository
        extends JpaRepository<PortfolioView, Long> {

    List<PortfolioView> findAllByOrderByViewedAtDesc();

}