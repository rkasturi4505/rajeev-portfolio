package com.rajeev.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rajeev.backend.entity.ActivityLog;
import com.rajeev.backend.service.ActivityLogService;

@RestController
@RequestMapping("/api/activity-logs")
public class ActivityLogController {

    private final ActivityLogService service;

    public ActivityLogController(ActivityLogService service) {
        this.service = service;
    }

    @GetMapping
    public List<ActivityLog> getAllActivityLogs() {
        return service.getAllActivities();
    }

    @PostMapping
    public void logActivity(@RequestBody ActivityLog activityLog) {
        service.logActivity(activityLog.getActivity());
    }
}