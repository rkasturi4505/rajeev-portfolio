package com.rajeev.backend.repository;

import com.rajeev.backend.entity.CertificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CertificationRepository
        extends JpaRepository<CertificationEntity, Long> {

}