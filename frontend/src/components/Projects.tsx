import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { Project } from "../types/Portfolio";

import {
  FaBuilding,
  FaCalendarAlt,
  FaUsers,
  FaLayerGroup,
  FaChevronDown,
  FaChevronUp,
  FaBriefcase,
  FaCode,
  FaLightbulb,
  FaProjectDiagram,
  FaCheckCircle,
  FaCogs,
  FaBullseye,
  FaGlobe,
  FaServer,
} from "react-icons/fa";

import { fadeInUp, fadeInLeft } from "../animations/motionVariants";

import { API_BASE_URL } from "../config/apiConfig";

import "./Projects.css";

function Projects() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);

  /* ==========================================================
     LOAD PROJECTS
  ========================================================== */

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`);

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }

        const data: Project[] = await response.json();

        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      }
    };

    loadProjects();
  }, []);

  /* ==========================================================
     TOGGLE PROJECT
  ========================================================== */

  const toggleProject = (index: number) => {
    setExpandedProject((previous) => (previous === index ? null : index));
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        {/* ======================================================
            HEADER
        ====================================================== */}

        <motion.div
          className="projects-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          ENTERPRISE PROJECTS
          <h2>
            <FaProjectDiagram />
            Professional Projects
          </h2>
          <p>
            Enterprise applications built using Java, Spring Boot,
            Microservices, Cloud, DevOps, CI/CD and modern software engineering
            practices.
          </p>
        </motion.div>

        {/* ======================================================
            PROJECT LIST
        ====================================================== */}

        <div className="projects-list">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`project-card ${
                expandedProject === index ? "expanded" : ""
              }`}
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.45,
              }}
              whileHover={{
                y: -6,
              }}
            >
              {/* ==================================================
                  PROJECT SUMMARY
              ================================================== */}

              <div className="project-summary">
                {/* ==================================================
                    PROJECT TITLE
                ================================================== */}

                <div className="project-title">
                  <div className="project-highlight-row">
                    <span>
                      <FaGlobe />
                      Enterprise Application
                    </span>

                    <span>
                      <FaServer />
                      High Availability
                    </span>
                  </div>

                  <h3>{project.name}</h3>

                  <div className="project-badges">
                    <span className="project-category">{project.domain}</span>

                    <span className="status-badge">Production</span>
                  </div>
                </div>

                {/* ==================================================
                    EXPAND BUTTON
                ================================================== */}

                <motion.button
                  type="button"
                  className="expand-btn"
                  onClick={() => toggleProject(index)}
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  aria-expanded={expandedProject === index}
                  aria-label={
                    expandedProject === index
                      ? `Hide details for ${project.name}`
                      : `View details for ${project.name}`
                  }
                >
                  {expandedProject === index ? (
                    <>
                      Hide Details
                      <FaChevronUp />
                    </>
                  ) : (
                    <>
                      View Details
                      <FaChevronDown />
                    </>
                  )}
                </motion.button>
              </div>

              {/* ==================================================
                  PROJECT INFORMATION
              ================================================== */}

              <div className="project-info">
                {/* Organization */}

                <div className="info-item">
                  <FaBuilding />

                  <div>
                    <strong>Organization</strong>

                    <span>{project.organization}</span>
                  </div>
                </div>

                {/* Role */}

                <div className="info-item">
                  <FaBriefcase />

                  <div>
                    <strong>Role</strong>

                    <span>{project.role}</span>
                  </div>
                </div>

                {/* Duration */}

                <div className="info-item">
                  <FaCalendarAlt />

                  <div>
                    <strong>Duration</strong>

                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Team Size */}

                <div className="info-item">
                  <FaUsers />

                  <div>
                    <strong>Team Size</strong>

                    <span>{project.teamSize}</span>
                  </div>
                </div>

                {/* Domain */}

                <div className="info-item">
                  <FaLayerGroup />

                  <div>
                    <strong>Domain</strong>

                    <span>{project.domain}</span>
                  </div>
                </div>

                {/* Technologies */}

                <div className="info-item">
                  <FaCode />

                  <div>
                    <strong>Technologies</strong>

                    <span>
                      {project.technologies
                        ? project.technologies
                            .split(",")
                            .map((technology) => technology.trim())
                            .filter(Boolean).length
                        : 0}{" "}
                      Technologies
                    </span>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  EXPANDED PROJECT DETAILS
              ================================================== */}

              <AnimatePresence mode="wait">
                {expandedProject === index && (
                  <motion.div
                    className="project-details"
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                  >
                    {/* ==================================================
                        PROJECT OVERVIEW
                    ================================================== */}

                    <div className="detail-section">
                      <h4>
                        <FaLightbulb />
                        Project Overview
                      </h4>

                      <p>{project.overview}</p>
                    </div>

                    {/* ==================================================
                        KEY RESPONSIBILITIES
                    ================================================== */}

                    <div className="detail-section">
                      <h4>
                        <FaCogs />
                        Key Responsibilities
                      </h4>

                      <ul className="responsibility-list">
                        {project.responsibilities
                          ?.split(".")
                          .map((item) => item.trim())
                          .filter(Boolean)
                          .map((item, responsibilityIndex) => (
                            <li key={responsibilityIndex}>
                              <FaCheckCircle />

                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* ==================================================
                        TECHNOLOGIES USED
                    ================================================== */}

                    <div className="detail-section">
                      <h4>
                        <FaCode />
                        Technologies Used
                      </h4>

                      <div className="technology-list">
                        {project.technologies
                          ?.split(",")
                          .map((technology) => technology.trim())
                          .filter(Boolean)
                          .map((technology, technologyIndex) => (
                            <motion.span
                              key={`${technology}-${technologyIndex}`}
                              className="technology-badge"
                              initial={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              transition={{
                                delay: technologyIndex * 0.05,
                              }}
                              whileHover={{
                                y: -3,
                                scale: 1.08,
                              }}
                            >
                              {technology}
                            </motion.span>
                          ))}
                      </div>
                    </div>

                    {/* ==================================================
                        KEY ACHIEVEMENTS
                    ================================================== */}

                    <div className="detail-section">
                      <h4>
                        <FaBullseye />
                        Key Achievements
                      </h4>

                      <ul className="achievement-list">
                        {project.keyAchievements
                          ?.split(".")
                          .map((item) => item.trim())
                          .filter(Boolean)
                          .map((item, achievementIndex) => (
                            <li key={achievementIndex}>
                              <FaBullseye />

                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* ==================================================
                        KEY LEARNINGS
                    ================================================== */}

                    <div className="detail-section">
                      <h4>
                        <FaCheckCircle />
                        Key Learnings
                      </h4>

                      <ul className="learning-list">
                        {project.keyLearnings
                          ?.split(".")
                          .map((item) => item.trim())
                          .filter(Boolean)
                          .map((item, learningIndex) => (
                            <li key={learningIndex}>
                              <FaLightbulb />

                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
