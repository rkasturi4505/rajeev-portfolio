package com.rajeev.backend.controller;

import com.rajeev.backend.model.VisitorSession;
import com.rajeev.backend.service.VisitorSessionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/visitor-sessions")
@CrossOrigin(origins = "http://localhost:5173")
public class VisitorSessionController {

    private final VisitorSessionService visitorSessionService;

    public VisitorSessionController(VisitorSessionService visitorSessionService) {
        this.visitorSessionService = visitorSessionService;
    }

    // ==========================================================
    // SAVE VISITOR SESSION
    // ==========================================================

    @PostMapping
    public ResponseEntity<VisitorSession> saveVisitorSession(
            @RequestBody VisitorSession visitorSession) {

        VisitorSession savedSession =
                visitorSessionService.saveVisitorSession(visitorSession);

        return ResponseEntity.ok(savedSession);
    }

    // ==========================================================
    // GET ALL VISITOR SESSIONS
    // ==========================================================

    @GetMapping
    public ResponseEntity<List<VisitorSession>> getAllVisitorSessions() {

        return ResponseEntity.ok(
                visitorSessionService.getAllVisitorSessions()
        );
    }

    // ==========================================================
    // GET VISITOR SESSION BY ID
    // ==========================================================

    @GetMapping("/{id}")
    public ResponseEntity<VisitorSession> getVisitorSessionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                visitorSessionService.getVisitorSessionById(id)
        );
    }

    // ==========================================================
    // DELETE VISITOR SESSION
    // ==========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisitorSession(
            @PathVariable Long id) {

        visitorSessionService.deleteVisitorSession(id);

        return ResponseEntity.noContent().build();
    }

    // ==========================================================
    // SEARCH BY VISITOR NAME
    // ==========================================================

    @GetMapping("/search")
    public ResponseEntity<List<VisitorSession>> searchByVisitorName(
            @RequestParam String name) {

        return ResponseEntity.ok(
                visitorSessionService.searchByVisitorName(name)
        );
    }

    // ==========================================================
    // SEARCH BY COMPANY
    // ==========================================================

    @GetMapping("/company")
    public ResponseEntity<List<VisitorSession>> searchByCompany(
            @RequestParam String company) {

        return ResponseEntity.ok(
                visitorSessionService.searchByCompany(company)
        );
    }

    // ==========================================================
    // GET VISITS BETWEEN DATES
    // ==========================================================

    @GetMapping("/between")
    public ResponseEntity<List<VisitorSession>> getSessionsBetween(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime start,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime end) {

        return ResponseEntity.ok(
                visitorSessionService.getSessionsBetween(start, end)
        );
    }

    // ==========================================================
    // COUNT VISITS BETWEEN DATES
    // ==========================================================

    @GetMapping("/count")
    public ResponseEntity<Long> countSessionsBetween(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime start,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime end) {

        return ResponseEntity.ok(
                visitorSessionService.countSessionsBetween(start, end)
        );
    }
}