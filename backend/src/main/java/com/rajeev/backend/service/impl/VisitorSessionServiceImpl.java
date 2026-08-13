package com.rajeev.backend.service.impl;

import com.rajeev.backend.model.VisitorSession;
import com.rajeev.backend.repository.VisitorSessionRepository;
import com.rajeev.backend.service.VisitorSessionService;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VisitorSessionServiceImpl implements VisitorSessionService {

    private final VisitorSessionRepository visitorSessionRepository;

    public VisitorSessionServiceImpl(
            VisitorSessionRepository visitorSessionRepository) {

        this.visitorSessionRepository = visitorSessionRepository;
    }


    // ==========================================================
    // SAVE VISITOR SESSION
    // ==========================================================

    @Override
    public VisitorSession saveVisitorSession(
            VisitorSession visitorSession) {

        if (visitorSession.getVisitTime() == null) {
            visitorSession.setVisitTime(LocalDateTime.now());
        }

        return visitorSessionRepository.save(visitorSession);
    }


    // ==========================================================
    // GET ALL VISITOR SESSIONS
    // ==========================================================

    @Override
    public List<VisitorSession> getAllVisitorSessions() {

        return visitorSessionRepository
                .findAllByOrderByVisitTimeDesc();
    }


    // ==========================================================
    // GET VISITOR SESSION BY ID
    // ==========================================================

    @Override
    public VisitorSession getVisitorSessionById(Long id) {

        if (id == null) {
            throw new RuntimeException(
                    "Visitor session id cannot be null"
            );
        }

        return visitorSessionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Visitor session not found with id: " + id
                        )
                );
    }


    // ==========================================================
    // DELETE VISITOR SESSION
    // ==========================================================

    @Override
    public void deleteVisitorSession(Long id) {

        if (id == null) {
            throw new RuntimeException(
                    "Visitor session id cannot be null"
            );
        }

        if (!visitorSessionRepository.existsById(id)) {

            throw new RuntimeException(
                    "Visitor session not found with id: " + id
            );
        }

        visitorSessionRepository.deleteById(id);
    }


    // ==========================================================
    // SEARCH BY VISITOR NAME
    // ==========================================================

    @Override
    public List<VisitorSession> searchByVisitorName(
            String visitorName) {

        return visitorSessionRepository
                .findByVisitorNameContainingIgnoreCaseOrderByVisitTimeDesc(
                        visitorName
                );
    }


    // ==========================================================
    // SEARCH BY COMPANY
    // ==========================================================

    @Override
    public List<VisitorSession> searchByCompany(
            String company) {

        return visitorSessionRepository
                .findByCompanyContainingIgnoreCaseOrderByVisitTimeDesc(
                        company
                );
    }


    // ==========================================================
    // GET SESSIONS BETWEEN DATES
    // ==========================================================

    @Override
    public List<VisitorSession> getSessionsBetween(
            LocalDateTime start,
            LocalDateTime end) {

        return visitorSessionRepository
                .findByVisitTimeBetweenOrderByVisitTimeDesc(
                        start,
                        end
                );
    }


    // ==========================================================
    // COUNT SESSIONS BETWEEN DATES
    // ==========================================================

    @Override
    public long countSessionsBetween(
            LocalDateTime start,
            LocalDateTime end) {

        return visitorSessionRepository
                .countByVisitTimeBetween(
                        start,
                        end
                );
    }
}