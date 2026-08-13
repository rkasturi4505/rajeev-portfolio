package com.rajeev.backend.controller;

import com.rajeev.backend.dto.ChatRequest;
import com.rajeev.backend.dto.ChatResponse;
import com.rajeev.backend.service.ChatbotKnowledgeService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatBotController {

        private final ChatbotKnowledgeService chatbotKnowledgeService;

        public ChatBotController(
                        ChatbotKnowledgeService chatbotKnowledgeService) {

                this.chatbotKnowledgeService = chatbotKnowledgeService;

        }

        @PostMapping
        public ChatResponse chat(
                        @RequestBody ChatRequest request) {

                String answer = chatbotKnowledgeService.getAnswer(
                                request.getMessage());

                return new ChatResponse(answer);

        }

}