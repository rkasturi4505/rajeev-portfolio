package com.rajeev.backend.controller;

import com.rajeev.backend.entity.CertificationEntity;
import com.rajeev.backend.repository.CertificationRepository;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(origins = "http://localhost:5173")
public class CertificationController {

        private final CertificationRepository certificationRepository;

        public CertificationController(
                        CertificationRepository certificationRepository) {

                this.certificationRepository = certificationRepository;

        }

        // ==========================================================
        // GET ALL CERTIFICATIONS
        // ==========================================================

        @GetMapping
        public List<CertificationEntity> getCertifications() {

                return certificationRepository.findAll();

        }

        // ==========================================================
        // ADD CERTIFICATION
        // ==========================================================

        @PostMapping
        public CertificationEntity addCertification(
                        @RequestBody @NonNull CertificationEntity certification) {

                return certificationRepository.save(
                                certification);

        }

        // ==========================================================
        // UPDATE CERTIFICATION
        // ==========================================================

        @PutMapping("/{id}")
        public CertificationEntity updateCertification(
                        @PathVariable @NonNull Long id,
                        @RequestBody @NonNull CertificationEntity certification) {

                CertificationEntity existingCertification = certificationRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException(
                                                "Certification not found with id: " + id));

                existingCertification.setName(
                                certification.getName());

                existingCertification.setIssuer(
                                certification.getIssuer());

                existingCertification.setCertificateUrl(
                                certification.getCertificateUrl());

                return certificationRepository.save(
                                existingCertification);

        }

        // ==========================================================
        // DELETE CERTIFICATION
        // ==========================================================

        @DeleteMapping("/{id}")
        public void deleteCertification(
                        @PathVariable @NonNull Long id) {

                if (!certificationRepository.existsById(id)) {

                        throw new RuntimeException(
                                        "Certification not found with id: " + id);

                }

                certificationRepository.deleteById(id);

        }

}