import { motion } from "framer-motion";
import "./About.css";

import {
  FaBriefcase,
  FaCode,
  FaCloud,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

interface AboutProps {
  summary: string;
}

function About({ summary }: AboutProps) {
  const featureCards = [
    {
      icon: <FaBriefcase />,
      title: "Enterprise Experience",
      description:
        "9+ years designing and developing enterprise-grade applications for global organizations.",
    },
    {
      icon: <FaCode />,
      title: "Backend Engineering",
      description:
        "Expert in Java, Spring Boot, REST APIs, Microservices and scalable backend architecture.",
    },
    {
      icon: <FaCloud />,
      title: "Cloud & DevOps",
      description:
        "Hands-on experience with AWS, Docker, Kubernetes, CI/CD and cloud-native deployment.",
    },
    {
      icon: <FaUsers />,
      title: "Agile Collaboration",
      description:
        "Worked with cross-functional teams following Agile and Scrum methodologies.",
    },
  ];

  const highlights = [
    "Enterprise Application Development",
    "Microservices Architecture",
    "REST API Development",
    "Cloud Deployment & DevOps",
    "Performance Optimization",
    "Clean Code & Best Practices",
  ];

  const stats = [
    {
      value: "9+",
      label: "Years Experience",
    },
    {
      value: "Java",
      label: "Spring Boot Expert",
    },
    {
      value: "AWS",
      label: "Cloud & DevOps",
    },
    {
      value: "Agile",
      label: "Enterprise Delivery",
    },
  ];

  return (
    <motion.section
      id="about"
      className="about-container"
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      {/* ==========================================================
          ABOUT HEADER
      ========================================================== */}

      <motion.div
        className="about-header"
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
          amount: 0.2,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <span className="about-eyebrow">ABOUT ME</span>

        <h2>
          Building Enterprise Applications with
          <br />
          <span>Java &amp; Spring Boot</span>
        </h2>

        <p className="about-description">{summary}</p>
      </motion.div>

      {/* ==========================================================
          FEATURE CARDS
      ========================================================== */}

      <div className="about-features">
        {featureCards.map((card, index) => (
          <motion.div
            key={card.title}
            className="feature-card"
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
              amount: 0.15,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              y: -6,
            }}
          >
            <div className="feature-icon">{card.icon}</div>

            <div className="feature-content">
              <h3>{card.title}</h3>

              <p>{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ==========================================================
          HIGHLIGHTS
      ========================================================== */}

      <motion.div
        className="about-highlights"
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
          amount: 0.15,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        {highlights.map((item, index) => (
          <motion.div
            key={item}
            className="highlight-item"
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.07,
              ease: "easeOut",
            }}
          >
            <FaCheckCircle />

            <span>{item}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ==========================================================
          ABOUT STATS
      ========================================================== */}

      <motion.div
        className="about-stats"
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
          amount: 0.15,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        {stats.map((item, index) => (
          <motion.div
            key={item.label}
            className="about-stat-card"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.45,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              y: -4,
            }}
          >
            <h3>{item.value}</h3>

            <span>{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default About;
