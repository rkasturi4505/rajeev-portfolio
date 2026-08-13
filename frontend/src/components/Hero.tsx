import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaDownload,
  FaArrowRight,
  FaJava,
  FaDocker,
  FaAws,
  FaProjectDiagram,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

import { SiSpringboot, SiKubernetes } from "react-icons/si";

import { fadeInLeft, fadeInRight } from "../animations/motionVariants";
import { trackResumeDownload } from "../api/analyticsApi";
import { API_BASE_URL } from "../config/apiConfig";

import "./Hero.css";

const SiMicroservices = FaProjectDiagram;

interface Props {
  profile: {
    name: string;
    title: string;
    experience: string;
    summary: string;
    image: string;
    roles?: string[];
  };
}

function Hero({ profile }: Props) {
  const [roleIndex, setRoleIndex] = useState(0);

  const roles =
    profile.roles && profile.roles.length > 0 ? profile.roles : [profile.title];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((previous) => (previous + 1) % roles.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [roles.length]);

  const imageUrl = profile.image
    ? profile.image.startsWith("http")
      ? profile.image
      : `${API_BASE_URL}${
          profile.image.startsWith("/") ? profile.image : "/" + profile.image
        }`
    : "";

  const handleResumeDownload = async () => {
    try {
      await trackResumeDownload();
    } catch (error) {
      console.error("Resume tracking failed", error);
    }
  };

  const techStack = [
    {
      icon: <FaJava />,
      name: "Java",
    },
    {
      icon: <SiSpringboot />,
      name: "Spring Boot",
    },
    {
      icon: <SiMicroservices />,
      name: "Microservices",
    },
    {
      icon: <FaAws />,
      name: "AWS",
    },
    {
      icon: <FaDocker />,
      name: "Docker",
    },
    {
      icon: <SiKubernetes />,
      name: "Kubernetes",
    },
  ];

  const highlights = [
    "9+ Years Experience",
    "20+ Enterprise Projects",
    "Java 17",
    "Spring Boot",
    "AWS Cloud",
  ];

  return (
    <section className="hero-section" id="home">
      <div className="hero-background"></div>

      <div className="hero-content">
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <motion.div
          className="hero-left"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="availability">
            <span className="dot"></span>
            Available for Full-Time Opportunities
          </div>

          <p className="hero-small-title">Senior Java Developer</p>

          <h1 className="hero-name">{profile.name}</h1>

          <div className="hero-role">
            <AnimatePresence mode="wait">
              <motion.h2
                key={roles[roleIndex]}
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -14,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                {roles[roleIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <p className="hero-summary">{profile.summary}</p>

          {/* =================================================
              HIGHLIGHTS
          ================================================== */}

          <div className="hero-highlights">
            {highlights.map((item) => (
              <div key={item} className="highlight-item">
                <FaCheckCircle />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* =================================================
              EXPERIENCE
          ================================================== */}

          <div className="hero-experience-card">
            <h3>9+</h3>

            <div>
              <strong>Years</strong>
              <span>Enterprise Experience</span>
            </div>
          </div>

          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="hero-buttons">
            <motion.a
              href="/Resume.pdf"
              download
              className="primary-btn"
              onClick={handleResumeDownload}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaDownload />
              Download Resume
            </motion.a>

            <motion.a
              href="#projects"
              className="secondary-btn"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
              <FaArrowRight />
            </motion.a>

            <motion.a
              href="#contact"
              className="outline-btn"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
            </motion.a>
          </div>

          {/* =================================================
              SOCIAL LINKS
          ================================================== */}

          <div className="hero-social-links">
            <a
              href="https://github.com/rkasturi4505"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/rajeev-kumar-kasturi-5a036771/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a href="mailto:kasturirajeev90@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>

          {/* =================================================
              TECHNOLOGY STACK
          ================================================== */}

          <div className="tech-stack">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="tech-chip"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.3,
                }}
              >
                {tech.icon}
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <motion.div
          className="hero-right"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="hero-photo-card">
            <div className="glow-circle"></div>

            <motion.div
              className="rotating-ring"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {imageUrl && (
              <motion.div
                className="hero-image"
                initial={{
                  opacity: 0,
                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <img src={imageUrl} alt={profile.name} />
              </motion.div>
            )}

            {/* =================================================
                SMALL TECH LABEL
            ================================================== */}

            <motion.div
              className="hero-tech-badge"
              animate={{
                y: [-3, 3, -3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaJava />
              Java • Spring Boot • AWS
            </motion.div>

            {/* =================================================
                EXPERIENCE CARD
            ================================================== */}

            <motion.div
              className="floating-card experience-floating"
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h3>9+</h3>
              <p>Years Experience</p>
            </motion.div>

            {/* =================================================
                PROJECT CARD
            ================================================== */}

            <motion.div
              className="floating-card projects-floating"
              animate={{
                y: [5, -5, 5],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h3>20+</h3>
              <p>Enterprise Projects</p>
            </motion.div>

            {/* =================================================
                JAVA BADGE
            ================================================== */}

            <motion.div
              className="floating-card tech-floating"
              animate={{
                x: [-4, 4, -4],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaJava />
              <span>Java 17</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
