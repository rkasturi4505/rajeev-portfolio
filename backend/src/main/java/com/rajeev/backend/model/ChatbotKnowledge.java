package com.rajeev.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "chatbot_knowledge")
public class ChatbotKnowledge {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String category;


    @Column(length = 1000)
    private String keywords;


    @Column(length = 1000)
    private String question;


    @Column(length = 3000)
    private String answer;


    private String visibility;


    private boolean active;



    public ChatbotKnowledge() {
    }



    public ChatbotKnowledge(
            String category,
            String question,
            String answer,
            String visibility,
            boolean active,
            String keywords
    ) {

        this.category = category;
        this.question = question;
        this.answer = answer;
        this.visibility = visibility;
        this.active = active;
        this.keywords = keywords;

    }



    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }



    public String getCategory() {
        return category;
    }


    public void setCategory(String category) {
        this.category = category;
    }



    public String getKeywords() {
        return keywords;
    }


    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }



    public String getQuestion() {
        return question;
    }


    public void setQuestion(String question) {
        this.question = question;
    }



    public String getAnswer() {
        return answer;
    }


    public void setAnswer(String answer) {
        this.answer = answer;
    }



    public String getVisibility() {
        return visibility;
    }


    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }



    public boolean isActive() {
        return active;
    }


    public void setActive(boolean active) {
        this.active = active;
    }

}