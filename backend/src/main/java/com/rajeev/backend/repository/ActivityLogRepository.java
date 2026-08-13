package com.rajeev.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rajeev.backend.entity.ActivityLog;

public interface ActivityLogRepository
        extends JpaRepository<ActivityLog, Long> {

    List<ActivityLog> findAllByOrderByActivityTimeDesc();

}