package com.rajeev.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class SkillEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String skillName;

    @Column(nullable = false)
    private String skillLevel;

    @Column(nullable = false)
    private Integer displayOrder;

    public SkillEntity() {
    }

    public SkillEntity(
            String skillName,
            String skillLevel,
            Integer displayOrder
    ) {
        this.skillName = skillName;
        this.skillLevel = skillLevel;
        this.displayOrder = displayOrder;
    }

    public Long getId() {
        return id;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getSkillLevel() {
        return skillLevel;
    }

    public void setSkillLevel(String skillLevel) {
        this.skillLevel = skillLevel;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}