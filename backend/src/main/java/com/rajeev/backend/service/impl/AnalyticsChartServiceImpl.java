package com.rajeev.backend.service.impl;

import com.rajeev.backend.dto.ChartResponse;
import com.rajeev.backend.repository.AnalyticsChartRepository;
import com.rajeev.backend.service.AnalyticsChartService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnalyticsChartServiceImpl implements AnalyticsChartService {

    private final AnalyticsChartRepository analyticsChartRepository;

    public AnalyticsChartServiceImpl(
            AnalyticsChartRepository analyticsChartRepository) {

        this.analyticsChartRepository = analyticsChartRepository;
    }

    @Override
    public ChartResponse getVisitorTrend() {
        return buildChart(
                analyticsChartRepository.getVisitorTrend()
        );
    }

    @Override
    public ChartResponse getDeviceStatistics() {
        return buildChart(
                analyticsChartRepository.getDeviceStatistics()
        );
    }

    @Override
    public ChartResponse getBrowserStatistics() {
        return buildChart(
                analyticsChartRepository.getBrowserStatistics()
        );
    }

    @Override
    public ChartResponse getCountryStatistics() {
        return buildChart(
                analyticsChartRepository.getCountryStatistics()
        );
    }

    @Override
    public ChartResponse getTopVisitedPages() {
        return buildChart(
                analyticsChartRepository.getTopVisitedPages()
        );
    }

    // ==========================================================
    // COMMON CHART BUILDER
    // ==========================================================

    private ChartResponse buildChart(List<Object[]> results) {

        List<String> labels = new ArrayList<>();
        List<Long> values = new ArrayList<>();

        for (Object[] row : results) {

            labels.add(
                    row[0] == null ? "Unknown" : row[0].toString()
            );

            values.add(
                    ((Number) row[1]).longValue()
            );
        }

        return new ChartResponse(labels, values);
    }
}