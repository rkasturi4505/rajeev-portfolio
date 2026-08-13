import {
  FaGraduationCap,
  FaUniversity,
  FaCalendarAlt,
  FaAward,
  FaLaptopCode,
  FaBookOpen,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { motion } from "framer-motion";

import "./Education.css";

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

interface Props {
  education: EducationItem[];
}

function Education({ education = [] }: Props) {
  return (
    <section id="education" className="education-section">
      {/* ==========================================================
          BACKGROUND DECORATION
      ========================================================== */}

      <div className="education-orb education-orb-top"></div>

      <div className="education-orb education-orb-bottom"></div>

      {/* ==========================================================
          HEADER
      ========================================================== */}

      <motion.div
        className="education-header"
        initial={{
          opacity: 0,
          y: 35,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        <span className="section-badge">ACADEMIC BACKGROUND</span>

        <h2 className="section-title">Education &amp; Foundation</h2>

        <p className="education-subtitle">
          A strong academic foundation in Information Technology that
          established the problem-solving, engineering and analytical
          fundamentals behind my enterprise software development career.
        </p>
      </motion.div>

      {/* ==========================================================
          MAIN EDUCATION CONTENT
      ========================================================== */}

      <div className="education-container">
        {/* ========================================================
            EDUCATION TIMELINE
        ======================================================== */}

        <div className="education-timeline">
          {education.length > 0 ? (
            education.map((item, index) => (
              <motion.div
                key={`${item.degree}-${index}`}
                className="education-card"
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.12,
                }}
              >
                {/* Timeline Line */}

                <div className="education-timeline-line"></div>

                {/* Timeline Icon */}

                <div className="education-icon">
                  <FaGraduationCap />
                </div>

                {/* Card */}

                <div className="education-content">
                  <div className="education-card-header">
                    <span className="education-label">
                      ACADEMIC QUALIFICATION
                    </span>

                    <span className="education-year">
                      <FaCalendarAlt />
                      {item.year}
                    </span>
                  </div>

                  <h3>{item.degree}</h3>

                  <div className="education-institution">
                    <FaUniversity />

                    <span>{item.institution}</span>
                  </div>

                  <div className="education-details">
                    <div className="education-detail">
                      <div className="education-detail-icon">
                        <FaAward />
                      </div>

                      <div>
                        <strong>Specialization</strong>

                        <span>Information Technology</span>
                      </div>
                    </div>

                    <div className="education-detail">
                      <div className="education-detail-icon">
                        <FaLaptopCode />
                      </div>

                      <div>
                        <strong>Academic Focus</strong>

                        <span>Software Engineering &amp; Technology</span>
                      </div>
                    </div>
                  </div>

                  <div className="education-foundation">
                    <FaCheckCircle />

                    <span>
                      Foundation for enterprise software engineering and
                      continuous technical growth.
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="education-empty"
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <FaGraduationCap />

              <h3>Academic Information</h3>

              <p>Education details are currently being updated.</p>
            </motion.div>
          )}
        </div>

        {/* ========================================================
            PROFESSIONAL FOUNDATION PANEL
        ======================================================== */}

        <motion.div
          className="education-foundation-panel"
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
        >
          <div className="foundation-panel-icon">
            <FaBookOpen />
          </div>

          <span className="foundation-panel-label">
            FROM ACADEMICS TO ENGINEERING
          </span>

          <h3>
            Building the foundation for
            <span> real-world engineering.</span>
          </h3>

          <p>
            My academic journey provided the foundation for analytical thinking,
            structured problem solving and understanding software systems. That
            foundation evolved into hands-on experience building enterprise
            applications and distributed systems.
          </p>

          <div className="foundation-points">
            <div className="foundation-point">
              <FaCheckCircle />

              <span>Strong software engineering fundamentals</span>
            </div>

            <div className="foundation-point">
              <FaCheckCircle />

              <span>Analytical and problem-solving mindset</span>
            </div>

            <div className="foundation-point">
              <FaCheckCircle />

              <span>Continuous technology learning</span>
            </div>

            <div className="foundation-point">
              <FaCheckCircle />

              <span>Enterprise development orientation</span>
            </div>
          </div>

          <a href="#experience" className="foundation-link">
            Explore Professional Experience
            <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Education;
