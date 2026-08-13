package com.rajeev.backend.service;

import com.rajeev.backend.entity.ExperienceEntity;
import com.rajeev.backend.repository.ExperienceRepository;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public List<ExperienceEntity> getAllExperiences() {
        return experienceRepository.findAllByOrderByDisplayOrderAsc();
    }

    public ExperienceEntity getExperienceById(Long id) {

        if (id == null) {
            throw new RuntimeException(
                    "Experience id cannot be null");
        }

        return experienceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Experience not found with id: " + id));
    }

    public ExperienceEntity addExperience(
            @NonNull ExperienceEntity experience) {

        return experienceRepository.save(experience);

    }

    public ExperienceEntity updateExperience(
            Long id,
            ExperienceEntity experience) {

        experience.setId(id);
        return experienceRepository.save(experience);
    }

    public void deleteExperience(Long id) {

        if (id == null) {
            throw new RuntimeException(
                    "Experience id cannot be null");
        }

        experienceRepository.deleteById(id);

    }
}