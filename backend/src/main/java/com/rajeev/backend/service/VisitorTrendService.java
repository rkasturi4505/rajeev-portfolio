package com.rajeev.backend.service;

import com.rajeev.backend.dto.VisitorTrend;

import java.util.List;

public interface VisitorTrendService {

    List<VisitorTrend> getLast7DaysTrend();

    List<VisitorTrend> getLast30DaysTrend();

    List<VisitorTrend> getMonthlyTrend();

}