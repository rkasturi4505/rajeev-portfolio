package com.rajeev.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rajeev.backend.entity.SkillEntity;

public interface SkillRepository extends JpaRepository<SkillEntity, Long> {

    List<SkillEntity> findAllByOrderByDisplayOrderAsc();

}