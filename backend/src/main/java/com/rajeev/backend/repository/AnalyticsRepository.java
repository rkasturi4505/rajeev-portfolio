package com.rajeev.backend.repository;

import com.rajeev.backend.model.Analytics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalyticsRepository
        extends JpaRepository<Analytics, String> {

}