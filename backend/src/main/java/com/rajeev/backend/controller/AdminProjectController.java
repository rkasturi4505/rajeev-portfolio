package com.rajeev.backend.controller;

import com.rajeev.backend.entity.ProjectEntity;
import com.rajeev.backend.service.ProjectService;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminProjectController {


    private final ProjectService projectService;


    public AdminProjectController(
            ProjectService projectService
    ) {

        this.projectService = projectService;

    }



    // ==========================================================
    // GET ALL PROJECTS
    // ==========================================================

    @GetMapping
    public List<ProjectEntity> getAllProjects() {

        return projectService.getAllProjects();

    }



    // ==========================================================
    // GET PROJECT BY ID
    // ==========================================================

    @GetMapping("/{id}")
    public ProjectEntity getProjectById(
            @PathVariable @NonNull Long id
    ) {


        return projectService.getProjectById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Project not found with ID : " + id
                        )
                );

    }



    // ==========================================================
    // ADD PROJECT
    // ==========================================================

    @PostMapping
    public ProjectEntity addProject(
            @RequestBody @NonNull ProjectEntity project
    ) {


        return projectService.saveProject(project);

    }



    // ==========================================================
    // UPDATE PROJECT
    // ==========================================================

    @PutMapping("/{id}")
    public ProjectEntity updateProject(
            @PathVariable @NonNull Long id,
            @RequestBody @NonNull ProjectEntity project
    ) {


        return projectService.updateProject(
                id,
                project
        );

    }



    // ==========================================================
    // DELETE PROJECT
    // ==========================================================

    @DeleteMapping("/{id}")
    public String deleteProject(
            @PathVariable @NonNull Long id
    ) {


        projectService.deleteProject(id);


        return "Project deleted successfully.";

    }

}