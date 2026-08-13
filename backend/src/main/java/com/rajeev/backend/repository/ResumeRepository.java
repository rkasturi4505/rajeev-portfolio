package com.rajeev.backend.repository;

import com.rajeev.backend.entity.ResumeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository
        extends JpaRepository<ResumeEntity, Long> {

}