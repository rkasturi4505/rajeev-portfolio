import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

import LogoutModal from "./LogoutModal";

import {
  FaHome,
  FaFolderOpen,
  FaEnvelope,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaUserCircle,
  FaChartLine,
  FaDownload,
  FaEye,
} from "react-icons/fa";

import AdminAnalytics from "./AdminAnalytics";
import SkillManagement from "./SkillManagement";
import ProjectManagement from "./ProjectManagement";
import AdminCertificationManagement from "./AdminCertificationManagement";
import EducationManagement from "./EducationManagement";
import ExperienceManagement from "./ExperienceManagement";
import ResumeManagement from "./ResumeManagement";
import ResumeDownloadManagement from "./ResumeDownloadManagement";
import ActivityLogManagement from "./ActivityLogManagement";
import PortfolioViewManagement from "./PortfolioViewManagement";
import VisitorSessionManagement from "./VisitorSessionManagement";
import VisitorAnalytics from "./VisitorAnalytics";

import { getDashboardAnalytics } from "../api/adminAnalyticsApi";
import { getMessages, deleteMessage } from "../api/messageApi";

import "./AdminDashboard.css";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
}

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.25,
    },
  },
};

const sidebarItem: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },

  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.35,
    },
  }),
};

const cardAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },

  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
    },
  }),
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [activePage, setActivePage] = useState("dashboard");

  const [messages, setMessages] = useState<Message[]>([]);

  const [search, setSearch] = useState("");

  const [analytics, setAnalytics] = useState({
    portfolioViews: 0,
    resumeDownloads: 0,
    adminLogins: 0,
    totalMessages: 0,
  });

  useEffect(() => {
    loadAnalytics();
    loadMessages();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await getDashboardAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error("Analytics loading failed:", error);
    }
  };

  const loadMessages = async () => {
    try {
      const response = await getMessages();
      setMessages(response.data);
    } catch (error) {
      console.error("Message loading failed:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this message?");

    if (!confirmed) return;

    try {
      await deleteMessage(id);
      loadMessages();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    navigate("/admin/login");
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(search.toLowerCase()) ||
      message.email.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="admin-dashboard">
      {/* =========================
          SIDEBAR
      ========================== */}

      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="admin-logo-circle">RK</div>

          <div>
            <h2>Admin Panel</h2>

            <span>Portfolio Manager</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          {[
            {
              name: "Dashboard",
              icon: <FaHome />,
              page: "dashboard",
            },

            {
              name: "Projects",
              icon: <FaFolderOpen />,
              page: "projects",
            },

            {
              name: "Skills",
              icon: <FaChartLine />,
              page: "skills",
            },

            {
              name: "Experience",
              icon: <FaUserCircle />,
              page: "experience",
            },

            {
              name: "Certifications",
              icon: <FaFolderOpen />,
              page: "certifications",
            },

            {
              name: "Education",
              icon: <FaFolderOpen />,
              page: "education",
            },

            {
              name: "Resume",
              icon: <FaDownload />,
              page: "resume",
            },

            {
              name: "Resume Downloads",
              icon: <FaDownload />,
              page: "resumeDownloads",
            },

            {
              name: "Messages",
              icon: <FaEnvelope />,
              page: "messages",
            },

            {
              name: "Portfolio Views",
              icon: <FaEye />,
              page: "portfolioViews",
            },

            {
              name: "Visitor Sessions",
              icon: <FaChartPie />,
              page: "visitorSessions",
            },

            {
              name: "Visitor Analytics",
              icon: <FaChartLine />,
              page: "visitorAnalytics",
            },

            {
              name: "Activity Logs",
              icon: <FaChartPie />,
              page: "activityLogs",
            },

            {
              name: "Analytics",
              icon: <FaChartPie />,
              page: "analytics",
            },

            {
              name: "Settings",
              icon: <FaCog />,
              page: "settings",
            },
          ].map((item, index) => (
            <motion.button
              key={item.page}
              custom={index}
              variants={sidebarItem}
              initial="hidden"
              animate="visible"
              className={
                activePage === item.page
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
              onClick={() => setActivePage(item.page)}
            >
              {item.icon}

              <span>{item.name}</span>
            </motion.button>
          ))}
        </nav>

        <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="admin-main">
        {/* HEADER */}

        <header className="admin-header">
          <div className="header-search">
            <FaSearch />

            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="header-actions">
            <FaBell className="header-icon" />

            <FaUserCircle className="header-icon user-icon" />
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.section
            key={activePage}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="admin-content"
          >
            {/* =========================
                DASHBOARD HOME
            ========================== */}

            {activePage === "dashboard" && (
              <>
                <h1>Dashboard Overview</h1>

                <div className="stats-grid">
                  {[
                    {
                      title: "Portfolio Views",
                      value: analytics.portfolioViews,
                      icon: <FaEye />,
                    },

                    {
                      title: "Resume Downloads",
                      value: analytics.resumeDownloads,
                      icon: <FaDownload />,
                    },

                    {
                      title: "Messages",
                      value: analytics.totalMessages,
                      icon: <FaEnvelope />,
                    },

                    {
                      title: "Admin Logins",
                      value: analytics.adminLogins,
                      icon: <FaUserCircle />,
                    },
                  ].map((card, index) => (
                    <motion.div
                      key={card.title}
                      custom={index}
                      variants={cardAnimation}
                      initial="hidden"
                      animate="visible"
                      className="analytics-card"
                    >
                      <div className="analytics-icon">{card.icon}</div>

                      <div>
                        <h3>{card.value}</h3>

                        <p>{card.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
            {/* =========================
                PROJECT MANAGEMENT
            ========================== */}

            {activePage === "projects" && <ProjectManagement />}

            {/* =========================
                SKILL MANAGEMENT
            ========================== */}

            {activePage === "skills" && <SkillManagement />}

            {/* =========================
                EXPERIENCE MANAGEMENT
            ========================== */}

            {activePage === "experience" && <ExperienceManagement />}

            {/* =========================
                CERTIFICATION MANAGEMENT
            ========================== */}

            {activePage === "certifications" && (
              <AdminCertificationManagement />
            )}

            {/* =========================
                EDUCATION MANAGEMENT
            ========================== */}

            {activePage === "education" && <EducationManagement />}

            {/* =========================
                RESUME MANAGEMENT
            ========================== */}

            {activePage === "resume" && <ResumeManagement />}

            {/* =========================
                RESUME DOWNLOAD MANAGEMENT
            ========================== */}

            {activePage === "resumeDownloads" && <ResumeDownloadManagement />}

            {/* =========================
                MESSAGE MANAGEMENT
            ========================== */}

            {activePage === "messages" && (
              <div className="message-management">
                <div className="section-header">
                  <h1>Messages</h1>

                  <span>Total: {messages.length}</span>
                </div>

                <div className="message-list">
                  {filteredMessages.length === 0 && (
                    <div className="empty-state">No messages found</div>
                  )}

                  {filteredMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="message-card"
                    >
                      <div className="message-header">
                        <div>
                          <h3>{message.name}</h3>

                          <p>{message.email}</p>
                        </div>

                        <button
                          className="delete-message"
                          onClick={() => handleDelete(message.id)}
                        >
                          Delete
                        </button>
                      </div>

                      <p className="message-text">{message.message}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* =========================
                PORTFOLIO VIEW MANAGEMENT
            ========================== */}

            {activePage === "portfolioViews" && <PortfolioViewManagement />}

            {/* =========================
                VISITOR SESSION MANAGEMENT
            ========================== */}

            {activePage === "visitorSessions" && <VisitorSessionManagement />}

            {/* =========================
                VISITOR ANALYTICS
            ========================== */}

            {activePage === "visitorAnalytics" && <VisitorAnalytics />}

            {/* =========================
                ACTIVITY LOGS
            ========================== */}

            {activePage === "activityLogs" && <ActivityLogManagement />}

            {/* =========================
                ANALYTICS
            ========================== */}

            {activePage === "analytics" && (
              <AdminAnalytics setActivePage={setActivePage} />
            )}

            {/* =========================
                SETTINGS
            ========================== */}

            {activePage === "settings" && (
              <div className="settings-page">
                <h1>Settings</h1>

                <div className="settings-card">
                  <h3>Admin Configuration</h3>

                  <p>Manage your portfolio administration settings.</p>

                  <button
                    className="settings-btn"
                    onClick={() => navigate("/")}
                  >
                    View Portfolio
                  </button>
                </div>
              </div>
            )}
          </motion.section>
        </AnimatePresence>
      </main>

      {/* =========================
          LOGOUT MODAL
      ========================== */}

      <LogoutModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default AdminDashboard;
