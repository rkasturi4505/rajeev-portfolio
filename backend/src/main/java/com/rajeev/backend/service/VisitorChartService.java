package com.rajeev.backend.service;

import com.rajeev.backend.dto.ChartData;
import com.rajeev.backend.repository.VisitorSessionRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class VisitorChartService {

        private final VisitorSessionRepository visitorSessionRepository;

        public VisitorChartService(
                        VisitorSessionRepository visitorSessionRepository) {
                this.visitorSessionRepository = visitorSessionRepository;
        }

        // ==========================================================
        // DEVICE CHART
        // ==========================================================

        public List<ChartData> getDeviceChart() {

                return visitorSessionRepository.findAll()

                                .stream()

                                .filter(Objects::nonNull)

                                .collect(

                                                Collectors.groupingBy(

                                                                session -> session.getDeviceType(),

                                                                Collectors.counting()

                                                )

                                )

                                .entrySet()

                                .stream()

                                .map(entry ->

                                new ChartData(

                                                entry.getKey() == null
                                                                || entry.getKey().isBlank()
                                                                                ? "Unknown"
                                                                                : entry.getKey(),

                                                entry.getValue()

                                )

                                )

                                .toList();

        }

        // ==========================================================
        // BROWSER CHART
        // ==========================================================

        public List<ChartData> getBrowserChart() {

                return visitorSessionRepository.findAll()

                                .stream()

                                .filter(Objects::nonNull)

                                .collect(

                                                Collectors.groupingBy(

                                                                session -> session.getBrowser(),

                                                                Collectors.counting()

                                                )

                                )

                                .entrySet()

                                .stream()

                                .map(entry ->

                                new ChartData(

                                                entry.getKey() == null
                                                                || entry.getKey().isBlank()
                                                                                ? "Unknown"
                                                                                : entry.getKey(),

                                                entry.getValue()

                                )

                                )

                                .toList();

        }

        // ==========================================================
        // COUNTRY CHART
        // ==========================================================

        public List<ChartData> getCountryChart() {

                return visitorSessionRepository.findAll()

                                .stream()

                                .filter(Objects::nonNull)

                                .collect(

                                                Collectors.groupingBy(

                                                                session -> session.getCountry(),

                                                                Collectors.counting()

                                                )

                                )

                                .entrySet()

                                .stream()

                                .map(entry ->

                                new ChartData(

                                                entry.getKey() == null
                                                                || entry.getKey().isBlank()
                                                                                ? "Unknown"
                                                                                : entry.getKey(),

                                                entry.getValue()

                                )

                                )

                                .toList();

        }

        // ==========================================================
        // COMPANY CHART
        // ==========================================================

        public List<ChartData> getCompanyChart() {

                return visitorSessionRepository.findAll()

                                .stream()

                                .filter(Objects::nonNull)

                                .collect(

                                                Collectors.groupingBy(

                                                                session -> session.getCompany(),

                                                                Collectors.counting()

                                                )

                                )

                                .entrySet()

                                .stream()

                                .map(entry ->

                                new ChartData(

                                                entry.getKey() == null
                                                                || entry.getKey().isBlank()
                                                                                ? "Unknown"
                                                                                : entry.getKey(),

                                                entry.getValue()

                                )

                                )

                                .toList();

        }

        // ==========================================================
        // PAGE VISITS CHART
        // ==========================================================

        public List<ChartData> getPageChart() {

                return visitorSessionRepository.findAll()

                                .stream()

                                .filter(Objects::nonNull)

                                .collect(

                                                Collectors.groupingBy(

                                                                session -> session.getPageVisited(),

                                                                Collectors.counting()

                                                )

                                )

                                .entrySet()

                                .stream()

                                .map(entry ->

                                new ChartData(

                                                entry.getKey() == null
                                                                || entry.getKey().isBlank()
                                                                                ? "Unknown"
                                                                                : entry.getKey(),

                                                entry.getValue()

                                )

                                )

                                .toList();

        }

}