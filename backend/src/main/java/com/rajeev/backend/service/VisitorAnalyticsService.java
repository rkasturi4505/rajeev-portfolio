package com.rajeev.backend.service;

import com.rajeev.backend.model.VisitorAnalytics;
import com.rajeev.backend.model.VisitorSession;
import com.rajeev.backend.repository.VisitorSessionRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class VisitorAnalyticsService {

        private final VisitorSessionRepository visitorSessionRepository;

        public VisitorAnalyticsService(
                        VisitorSessionRepository visitorSessionRepository) {
                this.visitorSessionRepository = visitorSessionRepository;
        }

        public VisitorAnalytics getVisitorAnalytics() {

                List<VisitorSession> sessions = visitorSessionRepository.findAll();

                long totalVisitors = sessions.size();

                LocalDateTime startOfDay = LocalDate.now().atStartOfDay();

                long todayVisitors = sessions.stream()
                                .filter(Objects::nonNull)
                                .filter(session -> session.getVisitTime() != null
                                                && session.getVisitTime().isAfter(startOfDay))
                                .count();

                long uniqueCompanies = sessions.stream()
                                .filter(Objects::nonNull)
                                .map(session -> session.getCompany())
                                .filter(company -> company != null && !company.isBlank())
                                .distinct()
                                .count();

                long mobileUsers = sessions.stream()
                                .filter(Objects::nonNull)
                                .filter(session -> "Mobile".equalsIgnoreCase(session.getDeviceType()))
                                .count();

                long desktopUsers = sessions.stream()
                                .filter(Objects::nonNull)
                                .filter(session -> "Desktop".equalsIgnoreCase(session.getDeviceType()))
                                .count();

                String topBrowser = sessions.stream()
                                .filter(Objects::nonNull)
                                .map(session -> session.getBrowser())
                                .filter(Objects::nonNull)
                                .collect(
                                                Collectors.groupingBy(
                                                                Function.identity(),
                                                                Collectors.counting()))
                                .entrySet()
                                .stream()
                                .max(Map.Entry.comparingByValue())
                                .map(entry -> entry.getKey())
                                .orElse("Unknown");

                String topCountry = sessions.stream()
                                .filter(Objects::nonNull)
                                .map(session -> session.getCountry())
                                .filter(Objects::nonNull)
                                .collect(
                                                Collectors.groupingBy(
                                                                Function.identity(),
                                                                Collectors.counting()))
                                .entrySet()
                                .stream()
                                .max(Map.Entry.comparingByValue())
                                .map(entry -> entry.getKey())
                                .orElse("Unknown");

                return new VisitorAnalytics(
                                totalVisitors,
                                todayVisitors,
                                uniqueCompanies,
                                mobileUsers,
                                desktopUsers,
                                topBrowser,
                                topCountry);
        }
}