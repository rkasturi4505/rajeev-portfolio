import "./Certifications.css";

import {
  FaAward,
  FaUniversity,
  FaCheckCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { API_BASE_URL } from "../config/apiConfig";

interface Certification {
  name: string;
  issuer: string;
  certificateUrl: string;
}

interface Props {
  certifications: Certification[];
}

function Certifications({ certifications = [] }: Props) {
  return (
    <section id="certifications" className="certifications-section">
      {/* ==========================================================
          HEADER
      ========================================================== */}

      <div className="certifications-header">
        <span className="section-badge">PROFESSIONAL CREDENTIALS</span>

        <h2 className="section-title">Professional Certifications</h2>

        <p className="certifications-subtitle">
          Industry-recognized certifications demonstrating continuous learning
          and expertise in Cloud Computing, DevOps, Linux and Enterprise
          Software Development.
        </p>
      </div>

      {/* ==========================================================
          CERTIFICATION GRID
      ========================================================== */}

      <div className="certification-grid">
        {certifications.length > 0 ? (
          certifications.map((cert, index) => (
            <article
              key={`${cert.name}-${index}`}
              className="certification-card"
            >
              {/* ======================================================
                  TOP
              ====================================================== */}

              <div className="certificate-top">
                <div className="certificate-icon">
                  <FaAward />
                </div>

                <span className="verified-badge">
                  <FaCheckCircle />
                  Verified
                </span>
              </div>

              {/* ======================================================
                  CERTIFICATION NAME
              ====================================================== */}

              <h3>{cert.name}</h3>

              {/* ======================================================
                  ISSUER
              ====================================================== */}

              <div className="issuer">
                <FaUniversity />

                <span>{cert.issuer}</span>
              </div>

              {/* ======================================================
                  STATUS
              ====================================================== */}

              <div className="certificate-status">Completed Successfully</div>

              {/* ======================================================
                  CERTIFICATE BUTTON
              ====================================================== */}

              {cert.certificateUrl && (
                <a
                  href={`${API_BASE_URL}${cert.certificateUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificate-btn"
                >
                  View Certificate
                  <FaExternalLinkAlt />
                </a>
              )}
            </article>
          ))
        ) : (
          <div className="no-certifications">No certifications available.</div>
        )}
      </div>
    </section>
  );
}

export default Certifications;
