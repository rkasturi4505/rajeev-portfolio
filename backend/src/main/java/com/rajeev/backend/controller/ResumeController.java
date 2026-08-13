package com.rajeev.backend.controller;

import com.rajeev.backend.entity.ResumeEntity;
import com.rajeev.backend.service.ResumeService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

        private final ResumeService resumeService;

        // ==========================================================
        // GET ALL RESUMES
        // ==========================================================

        @GetMapping
        public ResponseEntity<List<ResumeEntity>> getAllResumes() {

                return ResponseEntity.ok(
                                resumeService.getAllResumes());

        }

        // ==========================================================
        // GET RESUME BY ID
        // ==========================================================

        @GetMapping("/{id}")
        public ResponseEntity<ResumeEntity> getResumeById(
                        @PathVariable @NonNull Long id) {

                return resumeService.getResumeById(id)
                                .map(ResponseEntity::ok)
                                .orElse(
                                                ResponseEntity.notFound().build());

        }

        // ==========================================================
        // UPLOAD RESUME
        // ==========================================================

        @PostMapping("/upload")
        public ResponseEntity<ResumeEntity> uploadResume(
                        @RequestParam("file") @NonNull MultipartFile file) throws IOException {

                return ResponseEntity.ok(
                                resumeService.uploadResume(file));

        }

        // ==========================================================
        // DELETE RESUME
        // ==========================================================

        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteResume(
                        @PathVariable @NonNull Long id) throws IOException {

                resumeService.deleteResume(id);

                return ResponseEntity.ok(
                                "Resume deleted successfully.");

        }

}