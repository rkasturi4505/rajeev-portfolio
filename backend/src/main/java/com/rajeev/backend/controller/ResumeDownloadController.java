package com.rajeev.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.rajeev.backend.entity.ResumeDownload;
import com.rajeev.backend.service.ResumeDownloadService;


@RestController
@RequestMapping("/api/resume-downloads")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeDownloadController {

    private final ResumeDownloadService service;

    @PostMapping
    public ResumeDownload saveDownload() {
        return service.saveDownload();
    }

    @GetMapping
    public List<ResumeDownload> getAllDownloads() {
        return service.getAllDownloads();
    }
}