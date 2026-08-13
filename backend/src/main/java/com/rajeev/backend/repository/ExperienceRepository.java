package com.rajeev.backend.repository;

import com.rajeev.backend.entity.ExperienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepository
        extends JpaRepository<ExperienceEntity, Long> {

    List<ExperienceEntity> findAllByOrderByDisplayOrderAsc();

}