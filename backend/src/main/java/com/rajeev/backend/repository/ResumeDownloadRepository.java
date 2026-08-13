package com.rajeev.backend.repository;

import com.rajeev.backend.entity.ResumeDownload;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeDownloadRepository
        extends JpaRepository<ResumeDownload, Long> {
}