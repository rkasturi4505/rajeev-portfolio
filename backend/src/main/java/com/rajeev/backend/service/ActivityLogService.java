package com.rajeev.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rajeev.backend.entity.ActivityLog;
import com.rajeev.backend.repository.ActivityLogRepository;

@Service
public class ActivityLogService {

    private final ActivityLogRepository repository;

    public ActivityLogService(ActivityLogRepository repository) {
        this.repository = repository;
    }

    public void logActivity(String activity) {

        ActivityLog log = new ActivityLog();

        log.setActivity(activity);

        log.setActivityTime(LocalDateTime.now());

        repository.save(log);
    }

    public List<ActivityLog> getAllActivities() {

        return repository.findAllByOrderByActivityTimeDesc();

    }

}