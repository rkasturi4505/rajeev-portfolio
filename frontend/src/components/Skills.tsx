import {
  FaJava,
  FaReact,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaJenkins,
  FaCode,
} from "react-icons/fa";

import {
  SiSpringboot,
  SiKubernetes,
  SiMysql,
  SiPostman,
  SiApachemaven,
  SiTypescript,
  SiAngular,
} from "react-icons/si";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import "./Skills.css";

interface Skill {
  icon: ReactNode;
  title: string;
  level: string;
  category: string;
  description: string;
}

const skillData: Skill[] = [
  {
    icon: <FaJava />,
    title: "Java 17 / 21",
    level: "Advanced",
    category: "Backend Engineering",
    description:
      "Enterprise Java development using JVM concepts, Collections, Streams, Multithreading, Concurrency and Design Patterns.",
  },

  {
    icon: <SiSpringboot />,
    title: "Spring Boot",
    level: "Advanced",
    category: "Backend Engineering",
    description:
      "Building enterprise REST APIs with Spring Security, Spring Data JPA, Spring Cloud and scalable application architecture.",
  },

  {
    icon: <FaCode />,
    title: "Microservices",
    level: "Advanced",
    category: "Backend Engineering",
    description:
      "Designing distributed systems with service communication, API Gateway, resilience patterns and cloud-native architecture.",
  },

  {
    icon: <FaCode />,
    title: "REST APIs",
    level: "Advanced",
    category: "Backend Engineering",
    description:
      "Secure and scalable API development with Swagger, authentication, versioning and enterprise integrations.",
  },

  {
    icon: <FaAws />,
    title: "AWS Cloud",
    level: "Proficient",
    category: "Cloud & DevOps",
    description:
      "Cloud application deployment using AWS services including EC2, IAM, S3, monitoring and infrastructure management.",
  },

  {
    icon: <FaDocker />,
    title: "Docker",
    level: "Proficient",
    category: "Cloud & DevOps",
    description:
      "Containerizing applications, creating optimized images and managing application deployment environments.",
  },

  {
    icon: <SiKubernetes />,
    title: "Kubernetes",
    level: "Proficient",
    category: "Cloud & DevOps",
    description:
      "Container orchestration using Pods, Deployments, Services, Scaling and production deployment practices.",
  },

  {
    icon: <FaJenkins />,
    title: "CI/CD Jenkins",
    level: "Proficient",
    category: "Cloud & DevOps",
    description:
      "Automated build pipelines, continuous integration, continuous delivery and deployment automation.",
  },

  {
    icon: <FaReact />,
    title: "React",
    level: "Intermediate",
    category: "Frontend Engineering",
    description:
      "Modern frontend development using React components, hooks, animations and responsive UI architecture.",
  },

  {
    icon: <SiTypescript />,
    title: "TypeScript",
    level: "Intermediate",
    category: "Frontend Engineering",
    description:
      "Strongly typed frontend development with scalable component design and maintainable applications.",
  },

  {
    icon: <SiAngular />,
    title: "Angular",
    level: "Intermediate",
    category: "Frontend Engineering",
    description:
      "Enterprise Angular applications with routing, services, components and responsive interfaces.",
  },

  {
    icon: <SiMysql />,
    title: "MySQL",
    level: "Advanced",
    category: "Database Engineering",
    description:
      "Database design, query optimization, indexing, joins and performance tuning.",
  },

  {
    icon: <FaGitAlt />,
    title: "Git",
    level: "Advanced",
    category: "Engineering Tools",
    description:
      "Version control, branching strategies, pull requests, collaboration and code review practices.",
  },

  {
    icon: <SiApachemaven />,
    title: "Maven",
    level: "Advanced",
    category: "Engineering Tools",
    description:
      "Dependency management, project builds, plugins and enterprise Java application packaging.",
  },

  {
    icon: <SiPostman />,
    title: "Postman",
    level: "Advanced",
    category: "Engineering Tools",
    description:
      "API testing, collections, automation, debugging and API documentation validation.",
  },
];

const getBadgeClass = (level: string) => {
  switch (level) {
    case "Advanced":
      return "badge advanced";

    case "Proficient":
      return "badge proficient";

    default:
      return "badge intermediate";
  }
};

function Skills() {
  return (
    <section id="skills" className="skills-section">
      {/* ============================
          BACKGROUND
      ============================= */}
      <div className="skills-background" />

      {/* ============================
          HEADER
      ============================= */}
      <motion.div
        className="skills-header"
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >
        <span className="section-badge">TECHNICAL EXPERTISE</span>

        <h2>
          Engineering Skills &amp; <span>Technology Stack</span>
        </h2>

        <p>
          9+ years of experience building enterprise-grade applications using
          Java, Spring Boot, Microservices, Cloud platforms, DevOps practices
          and modern frontend technologies.
        </p>
      </motion.div>

      {/* ============================
          SKILLS GRID
      ============================= */}
      <div className="skills-grid">
        {skillData.map((skill, index) => (
          <motion.div
            key={skill.title}
            className="skill-card"
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            whileHover={{
              y: -8,
              scale: 1.015,
            }}
          >
            <div className="skill-top">
              <div className="skill-icon">{skill.icon}</div>

              <div className="skill-heading">
                <h3>{skill.title}</h3>

                <span className="skill-category">{skill.category}</span>
              </div>
            </div>

            <p className="skill-description">{skill.description}</p>

            <div className="skill-footer">
              <span className={getBadgeClass(skill.level)}>{skill.level}</span>

              <div className="skill-arrow">→</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
