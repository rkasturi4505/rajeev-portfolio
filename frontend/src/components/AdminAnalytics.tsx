import { useEffect, useState } from "react";
import { getDashboardAnalytics } from "../api/adminAnalyticsApi";

import { FaEye, FaDownload, FaEnvelope, FaUserShield } from "react-icons/fa";

import "./AdminAnalytics.css";
import VisitorTrendChart from "./charts/VisitorTrendChart";
import DeviceTypeChart from "./charts/DeviceTypeChart";
import BrowserUsageChart from "./charts/BrowserUsageChart";
import CountryChart from "./charts/CountryChart";
import TopPagesChart from "./charts/TopPagesChart";

interface DashboardAnalytics {
  portfolioViews: number;
  resumeDownloads: number;
  totalMessages: number;
  adminLogins: number;
}

interface AdminAnalyticsProps {
  setActivePage: (page: string) => void;
}

function  AdminAnalytics({ setActivePage }: AdminAnalyticsProps) {
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardAnalytics()
      .then((response) => {
        setAnalytics(response.data);
      })
      .catch((error) => {
        console.error("Analytics loading failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="analytics-loading">Loading dashboard analytics...</div>
    );
  }

  if (!analytics) {
    return <div className="analytics-loading">No analytics data available</div>;
  }

  return (
    <section className="admin-analytics">
      <div className="analytics-grid">
        {/* Portfolio Views */}

        <div
          className="analytics-card"
          onClick={() => setActivePage("portfolioViews")}
        >
          <div className="analytics-icon views">
            <FaEye />
          </div>

          <div>
            <p>Portfolio Views</p>

            <h1>{analytics.portfolioViews}</h1>

            <span>Total visitors</span>
          </div>
        </div>

        {/* Resume Downloads */}

        <div
          className="analytics-card"
          onClick={() => setActivePage("resumeDownloads")}
        >
          <div className="analytics-icon downloads">
            <FaDownload />
          </div>

          <div>
            <p>Resume Downloads</p>

            <h1>{analytics.resumeDownloads}</h1>

            <span>Career interest</span>
          </div>
        </div>

        {/* Messages */}

        <div
          className="analytics-card"
          onClick={() => setActivePage("messages")}
        >
          <div className="analytics-icon messages">
            <FaEnvelope />
          </div>

          <div>
            <p>Messages</p>

            <h1>{analytics.totalMessages}</h1>

            <span>Visitor enquiries</span>
          </div>
        </div>

        {/* Admin Login */}

        <div
          className="analytics-card"
          onClick={() => setActivePage("adminLogins")}
        >
          <div className="analytics-icon security">
            <FaUserShield />
          </div>

          <div>
            <p>Admin Logins</p>

            <h1>{analytics.adminLogins}</h1>

            <span>System activity</span>
          </div>
        </div>
      </div>
      {/* ======================================================
        ANALYTICS CHARTS
    ======================================================= */}

      <div className="analytics-chart-grid">
        <VisitorTrendChart />

        <DeviceTypeChart />

        <BrowserUsageChart />

        <CountryChart />

        <TopPagesChart />
      </div>
    </section>
  );
}

export default AdminAnalytics;
