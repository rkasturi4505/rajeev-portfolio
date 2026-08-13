import { useEffect, useState } from "react";

import { getPortfolio } from "../api/profileApi";
import { getEducation } from "../api/educationApi";
import { trackPortfolioView } from "../api/analyticsApi";
import { trackVisitor } from "../utils/visitorTracker";

import "../App.css";

import type { Portfolio, EducationItem } from "../types/Portfolio";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Education from "../components/Education";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Stats from "../components/Stats";
import Skills from "../components/Skills";

import AIAssistant from "../components/AIAssistant/AIAssistant";

import ScrollReveal from "../components/ScrollReveal";
import "../components/ScrollReveal.css";

function Home() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  const [education, setEducation] = useState<EducationItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  // ==========================================================
  // THEME
  // ==========================================================

  const toggleTheme = () => {
    setDarkMode((previous) => !previous);
  };

  // ==========================================================
  // LOAD PORTFOLIO
  // ==========================================================

  const loadPortfolio = () => {
    setLoading(true);

    setError("");

    getPortfolio()
      .then((response) => {
        console.log("Portfolio:", response.data);

        setPortfolio(response.data);
      })
      .catch((error) => {
        console.error("Portfolio Error:", error);

        setError("Unable to load portfolio data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ==========================================================
  // LOAD EDUCATION
  // ==========================================================

  const loadEducation = () => {
    getEducation()
      .then((response) => {
        console.log("Education:", response.data);

        setEducation(response.data);
      })
      .catch((error) => {
        console.error("Education Error:", error);
      });
  };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    loadPortfolio();

    loadEducation();

    trackPortfolioView().catch((error) => {
      console.error("Analytics Error:", error);
    });

    trackVisitor().catch((error) => {
      console.error("Visitor Tracking Error:", error);
    });
  }, []);

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="portfolio-loading">
        <p>Loading Portfolio...</p>
      </div>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {
    return (
      <div className="portfolio-error">
        <h2>Something went wrong</h2>

        <p>{error}</p>

        <button onClick={loadPortfolio}>Retry</button>
      </div>
    );
  }

  // ==========================================================
  // NO PORTFOLIO DATA
  // ==========================================================

  if (!portfolio) {
    return (
      <div className="portfolio-error">
        <h2>Portfolio data not found.</h2>
      </div>
    );
  }

  const profile = portfolio.profile;

  console.log("Profile:", profile);

  console.log("Projects:", portfolio.projects);

  console.log("Projects Length:", portfolio.projects.length);

  // ==========================================================
  // MAIN PORTFOLIO
  // ==========================================================

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>
      {/* ==================================================
          PUBLIC PORTFOLIO HEADER
      ================================================== */}

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="profile-container">
        {/* ==================================================
            HERO
        ================================================== */}

        <ScrollReveal>
          <Hero profile={profile} />
        </ScrollReveal>

        {/* ==================================================
            STATS
        ================================================== */}

        <ScrollReveal>
          <Stats />
        </ScrollReveal>

        {/* ==================================================
            ABOUT
        ================================================== */}

        <section id="about">
          <ScrollReveal>
            <About summary={profile.summary} />
          </ScrollReveal>
        </section>

        {/* ==================================================
            SKILLS
        ================================================== */}

        <section id="skills">
          <ScrollReveal>
            <Skills />
          </ScrollReveal>
        </section>

        {/* ==================================================
            EXPERIENCE
        ================================================== */}

        <section id="experience">
          <ScrollReveal>
            <Experience />
          </ScrollReveal>
        </section>

        {/* ==================================================
            PROJECTS
        ================================================== */}

        <section id="projects">
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
        </section>

        {/* ==================================================
            CERTIFICATIONS
        ================================================== */}

        <section id="certifications">
          <ScrollReveal>
            <Certifications certifications={profile.certifications} />
          </ScrollReveal>
        </section>

        {/* ==================================================
            EDUCATION
        ================================================== */}

        <section id="education">
          <ScrollReveal>
            <Education education={education} />
          </ScrollReveal>
        </section>

        {/* ==================================================
            CONTACT
        ================================================== */}

        <section id="contact">
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </section>

        {/* ==================================================
            AI PORTFOLIO ASSISTANT
        ================================================== */}

        <section id="ai-assistant">
          <ScrollReveal>
            <AIAssistant />
          </ScrollReveal>
        </section>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <ScrollReveal>
          <Footer />
        </ScrollReveal>
      </main>
    </div>
  );
}

export default Home;
