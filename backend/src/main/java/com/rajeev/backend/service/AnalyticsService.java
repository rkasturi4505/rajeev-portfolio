package com.rajeev.backend.service;

import com.rajeev.backend.model.Analytics;
import com.rajeev.backend.repository.AnalyticsRepository;

import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

        private final AnalyticsRepository analyticsRepository;

        public AnalyticsService(
                        AnalyticsRepository analyticsRepository) {

                this.analyticsRepository = analyticsRepository;

        }

        public long getMetric(String metric) {

                if (metric == null) {
                        throw new RuntimeException(
                                        "Metric name cannot be null");
                }

                return analyticsRepository
                                .findById(metric)
                                .map(analytics -> analytics.getValue())
                                .orElse(0L);

        }

        public void incrementMetric(String metric) {

                if (metric == null) {
                        throw new RuntimeException(
                                        "Metric name cannot be null");
                }

                Analytics analytics = analyticsRepository
                                .findById(metric)
                                .orElse(
                                                new Analytics(metric, 0L));

                if (analytics.getValue() == null) {

                        analytics.setValue(0L);

                }

                analytics.setValue(
                                analytics.getValue() + 1);

                analyticsRepository.save(analytics);

        }

}