package com.rajeev.backend.controller;

import com.rajeev.backend.entity.EducationEntity;
import com.rajeev.backend.repository.EducationRepository;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:5173")
public class EducationController {

        private final EducationRepository educationRepository;

        public EducationController(
                        EducationRepository educationRepository) {

                this.educationRepository = educationRepository;

        }

        // ==========================================================
        // GET ALL EDUCATION
        // ==========================================================

        @GetMapping
        public List<EducationEntity> getEducation() {

                return educationRepository.findAll();

        }

        // ==========================================================
        // ADD EDUCATION
        // ==========================================================

        @PostMapping
        public EducationEntity addEducation(
                        @RequestBody @NonNull EducationEntity education) {

                return educationRepository.save(
                                education);

        }

        // ==========================================================
        // UPDATE EDUCATION
        // ==========================================================

        @PutMapping("/{id}")
        public EducationEntity updateEducation(
                        @PathVariable @NonNull Long id,
                        @RequestBody @NonNull EducationEntity education) {

                EducationEntity existingEducation = educationRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException(
                                                "Education not found with id: " + id));

                existingEducation.setDegree(
                                education.getDegree());

                existingEducation.setInstitution(
                                education.getInstitution());

                existingEducation.setSpecialization(
                                education.getSpecialization());

                existingEducation.setDuration(
                                education.getDuration());

                return educationRepository.save(
                                existingEducation);

        }

        // ==========================================================
        // DELETE EDUCATION
        // ==========================================================

        @DeleteMapping("/{id}")
        public void deleteEducation(
                        @PathVariable @NonNull Long id) {

                if (!educationRepository.existsById(id)) {

                        throw new RuntimeException(
                                        "Education not found with id: " + id);

                }

                educationRepository.deleteById(id);

        }

}