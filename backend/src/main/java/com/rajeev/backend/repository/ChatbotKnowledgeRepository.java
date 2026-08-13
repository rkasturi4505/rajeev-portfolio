package com.rajeev.backend.repository;

import com.rajeev.backend.model.ChatbotKnowledge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatbotKnowledgeRepository 
        extends JpaRepository<ChatbotKnowledge, Long> {


    List<ChatbotKnowledge> findByActiveTrue();


    List<ChatbotKnowledge> findByCategoryAndActiveTrue(String category);


}