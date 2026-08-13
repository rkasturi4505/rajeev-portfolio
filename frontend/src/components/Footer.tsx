import {
  FaArrowUp,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaCloud,
  FaCode,
} from "react-icons/fa";

import { motion } from "framer-motion";

import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      {/* ==========================================================
          MAIN FOOTER CONTAINER
      ========================================================== */}

      <div className="footer-container">
        {/* ==========================================================
            BRAND SECTION
        ========================================================== */}

        <motion.div
          className="footer-brand"
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
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="footer-profile">
            <div className="profile-circle">
              <div className="initials">RK</div>

              <div className="profile-name">Rajeev Kumar Kasturi</div>
            </div>
          </div>

          <p>
            Senior Java Developer specializing in Java, Spring Boot,
            Microservices, Cloud Technologies and Enterprise Application
            Development.
          </p>

          <div className="footer-tech">
            <span>
              <FaCode />
              Java
            </span>

            <span>
              <FaCode />
              Microservices
            </span>

            <span>
              <FaCloud />
              Cloud
            </span>
          </div>
        </motion.div>

        {/* ==========================================================
            QUICK LINKS
        ========================================================== */}

        <motion.div
          className="footer-links"
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
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
        >
          <h3>Quick Links</h3>

          <a href="#home">Home</a>

          <a href="#about">About</a>

          <a href="#skills">Skills</a>

          <a href="#experience">Experience</a>

          <a href="#projects">Projects</a>

          <a href="#certifications">Certifications</a>

          <a href="#education">Education</a>

          <a href="#contact">Contact</a>
        </motion.div>

        {/* ==========================================================
            SOCIAL / CONNECT
        ========================================================== */}

        <motion.div
          className="footer-social"
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
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
        >
          <h3>Connect</h3>

          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/rajeev-kumar-kasturi-5a036771/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/rkasturi4505"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>

          <a
            href="mailto:kasturirajeev90@gmail.com"
            className="footer-email"
            aria-label="Send email"
          >
            <FaEnvelope />

            <span>kasturirajeev90@gmail.com</span>
          </a>
        </motion.div>
      </div>

      {/* ==========================================================
          FOOTER BOTTOM
      ========================================================== */}

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Rajeev Kumar Kasturi. All Rights
          Reserved.
        </p>

        <motion.button
          type="button"
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to Top"
          whileHover={{
            scale: 1.08,
            rotate: -8,
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          <FaArrowUp />
        </motion.button>
      </div>
    </footer>
  );
}

export default Footer;
