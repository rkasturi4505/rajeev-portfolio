package com.rajeev.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.rajeev.backend.entity.SkillEntity;
import com.rajeev.backend.repository.SkillRepository;
import org.springframework.lang.NonNull;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:5173")
public class SkillController {

    private final SkillRepository skillRepository;


    // Constructor Injection
    public SkillController(SkillRepository skillRepository) {

        this.skillRepository = skillRepository;

    }


    // ==========================================================
    // GET ALL SKILLS
    // ==========================================================

    @GetMapping
    public List<SkillEntity> getAllSkills() {

        System.out.println("========== SKILLS API HIT ==========");

        return skillRepository.findAllByOrderByDisplayOrderAsc();

    }


    // ==========================================================
    // ADD SKILL
    // ==========================================================

    @PostMapping
    public SkillEntity addSkill(
            @RequestBody @NonNull SkillEntity skill
    ) {

        return skillRepository.save(skill);

    }


    // ==========================================================
    // UPDATE SKILL
    // ==========================================================

    @PutMapping("/{id}")
public SkillEntity updateSkill(
        @PathVariable Long id,
        @RequestBody @NonNull SkillEntity skill
) {

    if (id == null) {
        throw new RuntimeException(
                "Skill id cannot be null"
        );
    }

    SkillEntity existingSkill =
            skillRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Skill not found"
                            )
                    );

    existingSkill.setSkillName(
            skill.getSkillName()
    );

    existingSkill.setSkillLevel(
            skill.getSkillLevel()
    );

    existingSkill.setDisplayOrder(
            skill.getDisplayOrder()
    );

    return skillRepository.save(existingSkill);
}

    // ==========================================================
    // DELETE SKILL
    // ==========================================================

    @DeleteMapping("/{id}")
    public void deleteSkill(
            @PathVariable Long id
    ) {

        if (id == null) {
            throw new RuntimeException(
                    "Skill id cannot be null"
            );
        }


        skillRepository.deleteById(id);

    }

}