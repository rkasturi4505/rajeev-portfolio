package com.rajeev.backend.service;

import com.rajeev.backend.entity.ResumeEntity;
import com.rajeev.backend.repository.ResumeRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;

    private static final String UPLOAD_DIR =
            "src/main/resources/static/resume/";

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    /**
     * Get all resumes
     */
    public List<ResumeEntity> getAllResumes() {
        return resumeRepository.findAll();
    }

    /**
     * Get resume by ID
     */
    public Optional<ResumeEntity> getResumeById(@NonNull Long id) {
        return resumeRepository.findById(id);
    }

    /**
     * Upload Resume
     */
    public ResumeEntity uploadResume(@NonNull MultipartFile file) throws IOException {

        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // ==========================================================
        // VALIDATIONS
        // ==========================================================

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Please select a PDF file.");
        }

        String fileName = file.getOriginalFilename();

        if (fileName == null || fileName.isBlank()) {
            throw new IllegalArgumentException("File name cannot be empty.");
        }

        // Validate extension
        if (!fileName.toLowerCase().endsWith(".pdf")) {
            throw new IllegalArgumentException("Only PDF files are allowed.");
        }

        // Validate MIME type
        String contentType = file.getContentType();

        if (contentType == null || !"application/pdf".equalsIgnoreCase(contentType)) {
            throw new IllegalArgumentException("Only PDF files are allowed.");
        }

        // Validate file size
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size must be less than 5 MB.");
        }

        // ==========================================================
        // SAVE FILE
        // ==========================================================

        Path filePath = uploadPath.resolve(fileName);

        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING);

        // Keep only one resume in the database
        resumeRepository.deleteAll();

        ResumeEntity resume = new ResumeEntity();

        resume.setFileName(fileName);
        resume.setFilePath("/resume/" + fileName);
        resume.setFileType(contentType);
        resume.setFileSize(file.getSize());

        return resumeRepository.save(resume);
    }

    /**
     * Delete Resume
     */
    public void deleteResume(@NonNull Long id) throws IOException {

        ResumeEntity resume = resumeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found with ID : " + id));

        if (resume.getFilePath() != null) {

            Path filePath = Paths.get(
                    "src/main/resources/static" + resume.getFilePath());

            Files.deleteIfExists(filePath);
        }

        resumeRepository.deleteById(id);
    }
}