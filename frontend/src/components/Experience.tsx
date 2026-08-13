import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaMapMarkerAlt,
  FaCode,
  FaBuilding,
  FaCalendarAlt,
  FaBriefcase,
} from "react-icons/fa";

import "./Experience.css";

import { fadeInUp, fadeInLeft } from "../animations/motionVariants";
import { getExperiences } from "../api/experienceApi";

interface Experience {
  id: number;
  company: string;
  designation: string;
  duration: string;
  location: string;
  technologies: string;
  description: string;
  displayOrder: number;
}

function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const response = await getExperiences();
      setExperiences(response.data);
    } catch (error) {
      console.error("Failed to load experiences", error);
    }
  };

  return (
    <section id="experience" className="experience-section">
      {/* ==========================================================
          BACKGROUND
      ========================================================== */}

      <div className="experience-background" />

      {/* ==========================================================
          HEADER
      ========================================================== */}

      <motion.div
        className="experience-header"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >
        <span className="experience-eyebrow">PROFESSIONAL JOURNEY</span>

        <h2 className="experience-title">
          Professional <span>Experience</span>
        </h2>

        <p className="experience-subtitle">
          9+ years of experience designing and developing enterprise
          applications using Java, Spring Boot, Microservices, Cloud and DevOps
          technologies.
        </p>
      </motion.div>

      {/* ==========================================================
          EXPERIENCE TIMELINE
      ========================================================== */}

      <div className="experience-timeline">
        <div className="experience-line" />

        {experiences.map((experience, index) => (
          <motion.article
            key={experience.id}
            className="experience-item"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              delay: index * 0.12,
            }}
          >
            {/* ======================================================
                TIMELINE NODE
            ====================================================== */}

            <div className="experience-node">
              <FaBriefcase />
            </div>

            {/* ======================================================
                EXPERIENCE CARD
            ====================================================== */}

            <motion.div
              className="experience-card"
              whileHover={{
                y: -5,
              }}
            >
              {/* ====================================================
                  TOP SECTION
              ==================================================== */}

              <div className="experience-card-top">
                <div className="experience-role-block">
                  <span className="experience-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3>{experience.designation}</h3>

                    <h4>
                      <FaBuilding />
                      {experience.company}
                    </h4>
                  </div>
                </div>

                <div className="duration-badge">
                  <FaCalendarAlt />
                  <span>{experience.duration}</span>
                </div>
              </div>

              {/* ====================================================
                  META INFORMATION
              ==================================================== */}

              <div className="experience-meta">
                <div className="experience-location">
                  <FaMapMarkerAlt />
                  <span>{experience.location}</span>
                </div>
              </div>

              {/* ====================================================
                  DESCRIPTION
              ==================================================== */}

              <p className="experience-description">{experience.description}</p>

              {/* ====================================================
                  TECHNOLOGIES
              ==================================================== */}

              <div className="technology-section">
                <div className="technology-title">
                  <FaCode />
                  <span>Technology Expertise</span>
                </div>

                <div className="experience-tags">
                  {experience.technologies
                    ?.split(",")
                    .map((tech) => tech.trim())
                    .filter(Boolean)
                    .map((tech) => (
                      <motion.span
                        key={tech}
                        className="experience-tag"
                        whileHover={{
                          y: -2,
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.article>
        ))}
      </div>

      {/* ==========================================================
          END MARKER
      ========================================================== */}

      {experiences.length > 0 && (
        <motion.div
          className="experience-end"
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          <span />
          <p>Career Journey Continues</p>
        </motion.div>
      )}
    </section>
  );
}

export default Experience;
