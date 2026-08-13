package com.rajeev.backend.controller;

import com.rajeev.backend.model.Message;
import com.rajeev.backend.repository.MessageRepository;
import com.rajeev.backend.service.EmailService;
import com.rajeev.backend.service.AnalyticsService;

import jakarta.validation.Valid;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

        private final MessageRepository messageRepository;

        private final AnalyticsService analyticsService;

        private final EmailService emailService;

        public ContactController(
                        MessageRepository messageRepository,
                        EmailService emailService,
                        AnalyticsService analyticsService) {

                this.messageRepository = messageRepository;
                this.emailService = emailService;
                this.analyticsService = analyticsService;

        }

        // ==========================================================
        // SAVE CONTACT MESSAGE
        // ==========================================================

        @PostMapping
        public Message saveMessage(
                        @Valid @RequestBody @NonNull Message message) {

                Message savedMessage = messageRepository.save(message);

                emailService.sendContactNotification(
                                savedMessage);

                analyticsService.incrementMetric(
                                "total_messages");

                return savedMessage;

        }

}