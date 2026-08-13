package com.rajeev.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;


import com.rajeev.backend.entity.ResumeDownload;

import com.rajeev.backend.repository.ResumeDownloadRepository;


@Service
@RequiredArgsConstructor
public class ResumeDownloadService {

    private final ResumeDownloadRepository repository;


    public ResumeDownload saveDownload() {

        ResumeDownload download = new ResumeDownload();

        download.setDownloadedAt(LocalDateTime.now());

        return repository.save(download);
    }


    public List<ResumeDownload> getAllDownloads() {

        return repository.findAll(
                Sort.by(Sort.Direction.DESC, "downloadedAt")
        );
    }
}