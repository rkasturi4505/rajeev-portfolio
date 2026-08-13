package com.rajeev.backend.service;

import com.rajeev.backend.model.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactNotification(Message message) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setFrom(fromEmail);
        mail.setTo("kasturirajeev90@gmail.com");
        mail.setSubject("📩 New Portfolio Contact Message");

        mail.setText(
                "Hello Rajeev,\n\n" +
                "You have received a new contact message.\n\n" +
                "--------------------------------------\n" +
                "Name: " + message.getName() + "\n\n" +
                "Email: " + message.getEmail() + "\n\n" +
                "Message:\n" + message.getMessage() + "\n\n" +
                "--------------------------------------\n\n" +
                "Regards,\n" +
                "Portfolio Website"
        );

        mailSender.send(mail);

    }

}