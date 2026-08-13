package com.rajeev.backend.service;

import com.rajeev.backend.model.VisitorSession;

import java.time.LocalDateTime;
import java.util.List;

public interface VisitorSessionService {

    // Save a visitor session
    VisitorSession saveVisitorSession(VisitorSession visitorSession);

    // Get all visitor sessions
    List<VisitorSession> getAllVisitorSessions();

    // Get visitor session by ID
    VisitorSession getVisitorSessionById(Long id);

    // Delete a visitor session
    void deleteVisitorSession(Long id);

    // Search by visitor name
    List<VisitorSession> searchByVisitorName(String visitorName);

    // Search by company
    List<VisitorSession> searchByCompany(String company);

    // Get sessions between dates
    List<VisitorSession> getSessionsBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    // Count sessions between dates
    long countSessionsBetween(
            LocalDateTime start,
            LocalDateTime end
    );
}