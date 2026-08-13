package com.rajeev.backend.repository;

import com.rajeev.backend.model.VisitorSession;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface VisitorSessionRepository
                extends JpaRepository<VisitorSession, Long> {

        // ==========================================================
        // GET ALL VISITORS
        // ==========================================================

        List<VisitorSession> findAllByOrderByVisitTimeDesc();

        // ==========================================================
        // DATE RANGE SEARCH
        // ==========================================================

        List<VisitorSession> findByVisitTimeBetweenOrderByVisitTimeDesc(

                        LocalDateTime start,

                        LocalDateTime end

        );

        // ==========================================================
        // SEARCH VISITOR NAME
        // ==========================================================

        List<VisitorSession> findByVisitorNameContainingIgnoreCaseOrderByVisitTimeDesc(

                        String visitorName

        );

        // ==========================================================
        // SEARCH COMPANY
        // ==========================================================

        List<VisitorSession> findByCompanyContainingIgnoreCaseOrderByVisitTimeDesc(

                        String company

        );

        // ==========================================================
        // COUNT VISITS
        // ==========================================================

        long countByVisitTimeBetween(

                        LocalDateTime start,

                        LocalDateTime end

        );

        // ==========================================================
        // ANALYTICS - BROWSER CHART
        // ==========================================================

        List<VisitorSession> findByBrowser(

                        String browser

        );

        // ==========================================================
        // ANALYTICS - DEVICE CHART
        // ==========================================================

        List<VisitorSession> findByDeviceType(

                        String deviceType

        );

        // ==========================================================
        // ANALYTICS - COUNTRY CHART
        // ==========================================================

        List<VisitorSession> findByCountry(

                        String country

        );

        // ==========================================================
        // ANALYTICS - PAGE ANALYTICS
        // ==========================================================

        List<VisitorSession> findByPageVisited(

                        String pageVisited

        );

}