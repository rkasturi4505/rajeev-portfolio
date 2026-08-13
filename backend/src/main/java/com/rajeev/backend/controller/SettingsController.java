package com.rajeev.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rajeev.backend.model.Settings;
import com.rajeev.backend.service.SettingsService;


@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "http://localhost:5173")
public class SettingsController {


    private final SettingsService settingsService;


    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }



    /*
    ==========================================================
        GET SETTINGS
        URL:
        GET http://localhost:8080/api/settings
    ==========================================================
    */

    @GetMapping
    public ResponseEntity<Settings> getSettings() {

        return ResponseEntity.ok(
                settingsService.getSettings()
        );
    }



    /*
    ==========================================================
        UPDATE SETTINGS
        URL:
        PUT http://localhost:8080/api/settings/{id}
    ==========================================================
    */

    @PutMapping("/{id}")
    public ResponseEntity<Settings> updateSettings(
            @PathVariable Long id,
            @RequestBody Settings settings
    ) {

        return ResponseEntity.ok(
                settingsService.updateSettings(
                        id,
                        settings
                )
        );
    }



    /*
    ==========================================================
        DELETE SETTINGS (OPTIONAL)
        URL:
        DELETE http://localhost:8080/api/settings/{id}
    ==========================================================
    */

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSettings(
            @PathVariable Long id
    ) {

        settingsService.deleteSettings(id);

        return ResponseEntity.ok(
                "Settings deleted successfully"
        );
    }

}