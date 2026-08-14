package com.rajeev.backend.controller;

import com.rajeev.backend.model.Message;
import com.rajeev.backend.repository.MessageRepository;
import com.rajeev.backend.service.AnalyticsService;
import com.rajeev.backend.service.EmailService;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageRepository messageRepository;
    private final AnalyticsService analyticsService;
    private final EmailService emailService;

    public MessageController(
            MessageRepository messageRepository,
            AnalyticsService analyticsService,
            EmailService emailService) {

        this.messageRepository = messageRepository;
        this.analyticsService = analyticsService;
        this.emailService = emailService;
    }

    // ==========================================================
    // SAVE MESSAGE + SEND EMAIL NOTIFICATION
    // ==========================================================

    @PostMapping
    public Message saveMessage(
            @RequestBody @NonNull Message message) {

        // Track message
        analyticsService.incrementMetric("total_messages");

        // ALWAYS save the recruiter's message first
        Message savedMessage = messageRepository.save(message);

        // Send email notification without losing the saved message
        try {
            emailService.sendContactNotification(savedMessage);
        } catch (Exception e) {
            System.err.println(
                    "WARNING: Message saved successfully, but email notification failed.");
            e.printStackTrace();
        }

        return savedMessage;
    }
}