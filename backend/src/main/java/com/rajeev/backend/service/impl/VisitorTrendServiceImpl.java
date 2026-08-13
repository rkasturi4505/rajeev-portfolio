package com.rajeev.backend.service.impl;

import com.rajeev.backend.dto.VisitorTrend;
import com.rajeev.backend.repository.VisitorSessionRepository;
import org.springframework.stereotype.Service;
import com.rajeev.backend.service.VisitorTrendService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class VisitorTrendServiceImpl implements VisitorTrendService {

    private final VisitorSessionRepository visitorSessionRepository;

    public VisitorTrendServiceImpl(
            VisitorSessionRepository visitorSessionRepository
    ) {
        this.visitorSessionRepository = visitorSessionRepository;
    }

    @Override
    public List<VisitorTrend> getLast7DaysTrend() {

        List<VisitorTrend> trends = new ArrayList<>();

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("dd MMM");

        for (int i = 6; i >= 0; i--) {

            LocalDate date = LocalDate.now().minusDays(i);

            LocalDateTime start = date.atStartOfDay();

            LocalDateTime end = date.plusDays(1).atStartOfDay();

            long count = visitorSessionRepository.countByVisitTimeBetween(
                    start,
                    end
            );

            trends.add(
                    new VisitorTrend(
                            date.format(formatter),
                            count
                    )
            );
        }

        return trends;
    }

    @Override
    public List<VisitorTrend> getLast30DaysTrend() {

        List<VisitorTrend> trends = new ArrayList<>();

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("dd MMM");

        for (int i = 29; i >= 0; i--) {

            LocalDate date = LocalDate.now().minusDays(i);

            LocalDateTime start = date.atStartOfDay();

            LocalDateTime end = date.plusDays(1).atStartOfDay();

            long count = visitorSessionRepository.countByVisitTimeBetween(
                    start,
                    end
            );

            trends.add(
                    new VisitorTrend(
                            date.format(formatter),
                            count
                    )
            );
        }

        return trends;
    }

    @Override
    public List<VisitorTrend> getMonthlyTrend() {

        List<VisitorTrend> trends = new ArrayList<>();

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("MMM");

        for (int i = 5; i >= 0; i--) {

            YearMonth month =
                    YearMonth.now().minusMonths(i);

            LocalDateTime start =
                    month.atDay(1).atStartOfDay();

            LocalDateTime end =
                    month.plusMonths(1)
                            .atDay(1)
                            .atStartOfDay();

            long count = visitorSessionRepository.countByVisitTimeBetween(
                    start,
                    end
            );

            trends.add(
                    new VisitorTrend(
                            month.format(formatter),
                            count
                    )
            );
        }

        return trends;
    }

}