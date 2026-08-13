package com.rajeev.backend.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.rajeev.backend.model.Settings;
import com.rajeev.backend.repository.SettingsRepository;

@Service
public class SettingsService {

    private final SettingsRepository settingsRepository;

    public SettingsService(SettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    /*
     * ==========================================================
     * GET SETTINGS
     * ==========================================================
     */

    public Settings getSettings() {

        List<Settings> settingsList = settingsRepository.findAll();

        if (settingsList.isEmpty()) {

            Settings defaultSettings = new Settings(
                    "Rajeev Kumar Kasturi",
                    "admin@example.com",
                    "Super Administrator",
                    "Portfolio Admin v1.0",
                    "Spring Boot + JWT Security",
                    "React + TypeScript + Vite");

            return settingsRepository.save(defaultSettings);
        }

        return settingsList.get(0);
    }

    /*
     * ==========================================================
     * UPDATE SETTINGS
     * ==========================================================
     */

    public Settings updateSettings(
            Long id,
            Settings updatedSettings) {

        Long settingsId = Objects.requireNonNull(id, "Settings id cannot be null");

        Settings existingSettings = settingsRepository
                .findById(settingsId)
                .orElseThrow(() -> new RuntimeException("Settings not found"));

        existingSettings.setAdminName(
                updatedSettings.getAdminName());

        existingSettings.setAdminEmail(
                updatedSettings.getAdminEmail());

        existingSettings.setRole(
                updatedSettings.getRole());

        existingSettings.setApplicationName(
                updatedSettings.getApplicationName());

        existingSettings.setBackendTechnology(
                updatedSettings.getBackendTechnology());

        existingSettings.setFrontendTechnology(
                updatedSettings.getFrontendTechnology());

        return settingsRepository.save(existingSettings);
    }

    /*
     * ==========================================================
     * DELETE SETTINGS (OPTIONAL)
     * ==========================================================
     */

    public void deleteSettings(Long id) {

        Long settingsId = Objects.requireNonNull(id, "Settings id cannot be null");

        settingsRepository.deleteById(settingsId);
    }

}