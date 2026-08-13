package com.rajeev.backend.service;

import com.rajeev.backend.model.ChatbotKnowledge;
import com.rajeev.backend.repository.ChatbotKnowledgeRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatbotKnowledgeService {


    private final ChatbotKnowledgeRepository repository;


    public ChatbotKnowledgeService(
            ChatbotKnowledgeRepository repository
    ) {

        this.repository = repository;

    }



    public String getAnswer(String question) {


        List<ChatbotKnowledge> knowledgeList =
                repository.findByActiveTrue();


        String userQuestion =
                question.toLowerCase();



        for (ChatbotKnowledge knowledge : knowledgeList) {


            String keywords =
                    knowledge.getKeywords();


            if (keywords == null) {
                continue;
            }


            String[] keywordArray =
                    keywords.toLowerCase().split(",");



            for (String keyword : keywordArray) {


                if (userQuestion.contains(
                        keyword.trim()
                )) {


                    return knowledge.getAnswer();

                }

            }

        }


        return "I can help with Rajeev's skills, experience, projects, certifications and education. Please ask a related question.";

    }

}