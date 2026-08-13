import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaBriefcase,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

import { sendMessage } from "../api/contactApi";

import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setSuccessMessage("");
    setLoading(true);

    try {
      await sendMessage({
        name,
        email,
        message,
      });

      setSuccessMessage("Thank you! Your message has been sent successfully.");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setErrors(error.response.data);
        } else {
          alert("Unable to send message. Please try again.");
        }
      } else {
        alert("Unable to send message. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearError = (field: string) => {
    setErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }

      const updated = { ...previous };
      delete updated[field];

      return updated;
    });
  };

  return (
    <section id="contact" className="contact-section">
      {/* ==========================================================
          HEADER
      ========================================================== */}

      <div className="contact-header">
        <span className="section-badge">LET&apos;S CONNECT</span>

        <h2 className="section-title">
          Let&apos;s Build Something Great Together
        </h2>

        <p className="contact-subtitle">
          Looking for an experienced Senior Java Developer with expertise in
          Spring Boot, Microservices, AWS and Enterprise Application
          Development? I&apos;d love to discuss your opportunity.
        </p>
      </div>

      {/* ==========================================================
          CONTACT CONTAINER
      ========================================================== */}

      <div className="contact-container">
        {/* ======================================================
            LEFT PANEL
        ====================================================== */}

        <motion.div
          className="contact-left"
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
            duration: 0.6,
          }}
        >
          {/* ==================================================
              AVAILABILITY
          ================================================== */}

          <div className="availability-card">
            <div className="availability-dot"></div>

            <div>
              <h3>Available for Opportunities</h3>

              <p>
                Open to Full-Time, Contract and Remote Senior Java Developer
                roles.
              </p>
            </div>
          </div>

          {/* ==================================================
              CONTACT INFORMATION
          ================================================== */}

          <div className="contact-info-grid">
            <a
              href="mailto:kasturirajeev90@gmail.com"
              className="contact-info-card"
            >
              <div className="contact-icon">
                <FaEnvelope />
              </div>

              <div>
                <h4>Email</h4>

                <span>kasturirajeev90@gmail.com</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/rajeev-kumar-kasturi-5a036771/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card"
            >
              <div className="contact-icon">
                <FaLinkedin />
              </div>

              <div>
                <h4>LinkedIn</h4>

                <span>Connect Professionally</span>
              </div>
            </a>

            <a
              href="https://github.com/rkasturi4505"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card"
            >
              <div className="contact-icon">
                <FaGithub />
              </div>

              <div>
                <h4>GitHub</h4>

                <span>Enterprise Projects</span>
              </div>
            </a>

            <div className="contact-info-card">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h4>Location</h4>

                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>

          {/* ==================================================
              QUICK HIGHLIGHTS
          ================================================== */}

          <div className="quick-highlights">
            <div className="highlight-card">
              <FaBriefcase />

              <div>
                <h3>9+ Years</h3>

                <p>Enterprise Experience</p>
              </div>
            </div>

            <div className="highlight-card">
              <FaClock />

              <div>
                <h3>&lt; 24 Hours</h3>

                <p>Typical Response Time</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ======================================================
            RIGHT PANEL
        ====================================================== */}

        <motion.div
          className="contact-right"
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
            duration: 0.6,
          }}
        >
          <div className="contact-form-wrapper">
            <h3 className="form-title">
              <FaPaperPlane />
              Send a Message
            </h3>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {/* ==================================================
                  NAME
              ================================================== */}

              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>

                <input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError("name");
                    setSuccessMessage("");
                  }}
                  className={errors.name ? "input-error" : ""}
                />

                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              {/* ==================================================
                  EMAIL
              ================================================== */}

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>

                <input
                  id="contact-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email");
                    setSuccessMessage("");
                  }}
                  className={errors.email ? "input-error" : ""}
                />

                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              {/* ==================================================
                  MESSAGE
              ================================================== */}

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>

                <textarea
                  id="contact-message"
                  rows={7}
                  placeholder="Tell me about your project, opportunity or collaboration..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    clearError("message");
                    setSuccessMessage("");
                  }}
                  className={errors.message ? "input-error" : ""}
                />

                {errors.message && (
                  <p className="error-text">{errors.message}</p>
                )}
              </div>

              {/* ==================================================
                  SUCCESS MESSAGE
              ================================================== */}

              {successMessage && (
                <p className="success-text">{successMessage}</p>
              )}

              {/* ==================================================
                  SUBMIT BUTTON
              ================================================== */}

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="submit-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />

                    <span>Send Message</span>

                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
