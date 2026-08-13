package com.rajeev.backend.controller;

import com.rajeev.backend.dto.AIChatRequest;
import com.rajeev.backend.service.AIService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody AIChatRequest request) {

        return aiService.generateResponse(
                request.getQuestion());
    }
}
