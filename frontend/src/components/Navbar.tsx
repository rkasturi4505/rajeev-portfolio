import { useEffect, useState } from "react";
import "./Navbar.css";

import { FaMoon, FaSun, FaRobot, FaBars, FaTimes } from "react-icons/fa";

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

function Navbar({ darkMode, toggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = [
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "certifications",
        "education",
        "contact",
      ];

      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const element = document.getElementById(section);

        if (!element) continue;

        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const navItems = [
    {
      id: "home",
      label: "Home",
    },
    {
      id: "about",
      label: "About",
    },
    {
      id: "skills",
      label: "Skills",
    },
    {
      id: "experience",
      label: "Experience",
    },
    {
      id: "projects",
      label: "Projects",
    },
    {
      id: "certifications",
      label: "Certifications",
    },
    {
      id: "education",
      label: "Education",
    },
    {
      id: "contact",
      label: "Contact",
    },
  ];

  const handleAI = () => {
    const aiAssistant = document.getElementById("ai-assistant");

    if (aiAssistant) {
      aiAssistant.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
      {/* ============================
          BRAND
      ============================= */}

      <a href="#home" className="navbar-brand" onClick={closeMenu}>
        <div className="brand-logo">RK</div>

        <div className="brand-content">
          <h2>Rajeev Kumar</h2>

          <span>Senior Java Developer</span>
        </div>
      </a>

      {/* ============================
          NAVIGATION
      ============================= */}

      <nav className={mobileOpen ? "navbar-links active" : "navbar-links"}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={closeMenu}
            className={activeSection === item.id ? "active" : ""}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* ============================
          ACTIONS
      ============================= */}

      <div className="navbar-actions">
        <button
          className="ai-button"
          type="button"
          onClick={handleAI}
          aria-label="Open AI Assistant"
        >
          <FaRobot />

          <span>AI Assistant</span>
        </button>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          type="button"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button
          className="mobile-menu-btn"
          type="button"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((previous) => !previous)}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
