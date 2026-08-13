package com.rajeev.backend.repository;

import com.rajeev.backend.model.VisitorSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnalyticsChartRepository extends JpaRepository<VisitorSession, Long> {

    // ==========================================================
    // VISITOR TREND (Last 7 Days)
    // ==========================================================

    @Query("""
            SELECT DATE(v.visitTime), COUNT(v)
            FROM VisitorSession v
            GROUP BY DATE(v.visitTime)
            ORDER BY DATE(v.visitTime)
            """)
    List<Object[]> getVisitorTrend();


    // ==========================================================
    // DEVICE TYPE
    // ==========================================================

    @Query("""
            SELECT v.deviceType, COUNT(v)
            FROM VisitorSession v
            GROUP BY v.deviceType
            ORDER BY COUNT(v) DESC
            """)
    List<Object[]> getDeviceStatistics();


    // ==========================================================
    // BROWSER USAGE
    // ==========================================================

    @Query("""
            SELECT v.browser, COUNT(v)
            FROM VisitorSession v
            GROUP BY v.browser
            ORDER BY COUNT(v) DESC
            """)
    List<Object[]> getBrowserStatistics();


    // ==========================================================
    // COUNTRY STATISTICS
    // ==========================================================

    @Query("""
            SELECT v.country, COUNT(v)
            FROM VisitorSession v
            GROUP BY v.country
            ORDER BY COUNT(v) DESC
            """)
    List<Object[]> getCountryStatistics();


    // ==========================================================
    // TOP VISITED PAGES
    // ==========================================================

    @Query("""
            SELECT v.pageVisited, COUNT(v)
            FROM VisitorSession v
            GROUP BY v.pageVisited
            ORDER BY COUNT(v) DESC
            """)
    List<Object[]> getTopVisitedPages();

}