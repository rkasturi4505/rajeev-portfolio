package com.rajeev.backend.repository;

import com.rajeev.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MessageRepository extends JpaRepository<Message, Long> {

}