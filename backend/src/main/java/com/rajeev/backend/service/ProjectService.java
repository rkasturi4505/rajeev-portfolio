package com.rajeev.backend.service;

import com.rajeev.backend.entity.ProjectEntity;
import com.rajeev.backend.repository.ProjectRepository;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;


    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    
    /**
 * Get all projects
 */
public List<ProjectEntity> getAllProjects() {

    List<ProjectEntity> projects = projectRepository.findAll();

    System.out.println("PROJECT SERVICE COUNT = " + projects.size());

    return projects;

}

    /**
     * Get project by ID
     */
    public Optional<ProjectEntity> getProjectById(Long id) {

        if (id == null) {
            throw new RuntimeException(
                    "Project id cannot be null"
            );
        }

        return projectRepository.findById(id);

    }


    /**
     * Save new project
     */
    public ProjectEntity saveProject(
            @NonNull ProjectEntity project
    ) {

        return projectRepository.save(project);

    }


    /**
     * Update existing project
     */
    public ProjectEntity updateProject(
            Long id,
            @NonNull ProjectEntity project
    ) {


        if (id == null) {

            throw new RuntimeException(
                    "Project id cannot be null"
            );

        }


        ProjectEntity existingProject =
                projectRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Project not found with ID : " + id
                                )
                        );


        existingProject.setProjectName(
                project.getProjectName()
        );


        existingProject.setOrganization(
                project.getOrganization()
        );


        existingProject.setRole(
                project.getRole()
        );


        existingProject.setDuration(
                project.getDuration()
        );


        existingProject.setDomain(
                project.getDomain()
        );


        existingProject.setTeamSize(
                project.getTeamSize()
        );


        existingProject.setTechnologies(
                project.getTechnologies()
        );


        existingProject.setDescription(
                project.getDescription()
        );


        return projectRepository.save(existingProject);

    }
/**
 * Delete project
 */
public void deleteProject(@NonNull Long id) {

    if (!projectRepository.existsById(id)) {

        throw new RuntimeException(
                "Project not found with ID : " + id
        );

    }

    projectRepository.deleteById(id);

}

}