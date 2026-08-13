package com.rajeev.backend.controller;

import com.rajeev.backend.model.Message;
import com.rajeev.backend.repository.MessageRepository;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminMessageController {


    private final MessageRepository messageRepository;


    public AdminMessageController(
            MessageRepository messageRepository
    ) {

        this.messageRepository = messageRepository;

    }



    // ==========================================================
    // GET ALL MESSAGES
    // ==========================================================

    @GetMapping
    public List<Message> getAllMessages() {

        return messageRepository.findAll();

    }



    // ==========================================================
    // DELETE MESSAGE
    // ==========================================================

    @DeleteMapping("/{id}")
    public void deleteMessage(
            @PathVariable @NonNull Long id
    ) {


        if (!messageRepository.existsById(id)) {

            throw new RuntimeException(
                    "Message not found with ID : " + id
            );

        }


        messageRepository.deleteById(id);

    }

}