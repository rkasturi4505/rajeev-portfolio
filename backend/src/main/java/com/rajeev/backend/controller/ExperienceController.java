package com.rajeev.backend.controller;

import com.rajeev.backend.entity.ExperienceEntity;
import com.rajeev.backend.service.ExperienceService;

import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(
            ExperienceService experienceService) {

        this.experienceService = experienceService;

    }

    /*
     * ===========================
     * PUBLIC API
     * ===========================
     */

    @GetMapping("/api/experience")
    public List<ExperienceEntity> getAllExperiences() {

        return experienceService.getAllExperiences();

    }

    /*
     * ===========================
     * ADMIN API
     * ===========================
     */

    @PostMapping("/api/admin/experience")
    public ExperienceEntity addExperience(
            @RequestBody @NonNull ExperienceEntity experience) {

        return experienceService.addExperience(
                experience);

    }

    @PutMapping("/api/admin/experience/{id}")
    public ResponseEntity<ExperienceEntity> updateExperience(
            @PathVariable @NonNull Long id,
            @RequestBody @NonNull ExperienceEntity experience) {

        return ResponseEntity.ok(

                experienceService.updateExperience(
                        id,
                        experience)

        );

    }

    @DeleteMapping("/api/admin/experience/{id}")
    public ResponseEntity<Void> deleteExperience(
            @PathVariable @NonNull Long id) {

        experienceService.deleteExperience(
                id);

        return ResponseEntity.noContent().build();

    }

}