package com.rajeev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.rajeev.backend.model.Settings;

public interface SettingsRepository extends JpaRepository<Settings, Long> {

}