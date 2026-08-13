package com.rajeev.backend.controller;

import com.rajeev.backend.model.Message;
import com.rajeev.backend.repository.MessageRepository;
import com.rajeev.backend.service.AnalyticsService;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {

    private final MessageRepository messageRepository;

    private final AnalyticsService analyticsService;

    public MessageController(
            MessageRepository messageRepository,
            AnalyticsService analyticsService) {

        this.messageRepository = messageRepository;
        this.analyticsService = analyticsService;

    }

    // ==========================================================
    // SAVE MESSAGE
    // ==========================================================

    @PostMapping
    public Message saveMessage(
            @RequestBody @NonNull Message message) {

        analyticsService.incrementMetric(
                "total_messages");

        return messageRepository.save(
                message);

    }

}