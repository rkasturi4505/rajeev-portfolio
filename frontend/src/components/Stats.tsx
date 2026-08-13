import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaProjectDiagram,
  FaCode,
  FaBuilding,
} from "react-icons/fa";

import "./Stats.css";

function Stats() {
  const statsData = [
    {
      value: "9+",
      label: "Years Experience",
      icon: <FaBriefcase />,
    },
    {
      value: "20+",
      label: "Projects Delivered",
      icon: <FaProjectDiagram />,
    },
    {
      value: "15+",
      label: "Technologies",
      icon: <FaCode />,
    },
    {
      value: "4+",
      label: "Organizations",
      icon: <FaBuilding />,
    },
  ];

  return (
    <motion.section
      className="stats"
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      <div className="stats-header">
        <span className="stats-eyebrow">CAREER SNAPSHOT</span>

        <h2>
          Experience Backed by <span>Results</span>
        </h2>

        <p>
          A quick overview of professional experience, delivery exposure and
          technical breadth.
        </p>
      </div>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.12,
              ease: "easeOut",
            }}
            whileHover={{
              y: -7,
            }}
          >
            <div className="stat-icon">{stat.icon}</div>

            <motion.h2
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
              transition={{
                duration: 0.45,
                delay: 0.15 + index * 0.12,
              }}
            >
              {stat.value}
            </motion.h2>

            <div className="stat-line" />

            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Stats;
