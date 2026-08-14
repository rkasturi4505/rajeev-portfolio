import { useEffect, useState } from "react";

import api from "../api/axiosConfig";

import "./VisitorAnalytics.css";

import VisitorCharts from "./VisitorCharts";
import VisitorTrend from "./VisitorTrend";

interface VisitorAnalyticsData {
  totalVisitors: number;
  todayVisitors: number;
  uniqueCompanies: number;
  mobileUsers: number;
  desktopUsers: number;
  topBrowser: string;
  topCountry: string;
}

function VisitorAnalytics() {

  const [analytics, setAnalytics] =
    useState<VisitorAnalyticsData | null>(null);

  const [loading, setLoading] = useState(true);

  // ==========================================================
  // LOAD VISITOR ANALYTICS
  // ADMIN ONLY
  // ==========================================================

  const loadAnalytics = async () => {

    try {

      const response = await api.get(
        "/api/visitor-sessions/analytics"
      );

      setAnalytics(response.data);

    } catch (error) {

      console.error(
        "Visitor analytics loading failed:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return <p>Loading visitor analytics...</p>;
  }

  // ==========================================================
  // NO DATA
  // ==========================================================

  if (!analytics) {
    return <p>No analytics data available.</p>;
  }

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <>
      <div className="visitor-analytics">

        <div className="analytics-card">
          <h3>Total Visitors</h3>
          <h1>{analytics.totalVisitors}</h1>
        </div>

        <div className="analytics-card">
          <h3>Today's Visitors</h3>
          <h1>{analytics.todayVisitors}</h1>
        </div>

        <div className="analytics-card">
          <h3>Unique Companies</h3>
          <h1>{analytics.uniqueCompanies}</h1>
        </div>

        <div className="analytics-card">
          <h3>Desktop Users</h3>
          <h1>{analytics.desktopUsers}</h1>
        </div>

        <div className="analytics-card">
          <h3>Mobile Users</h3>
          <h1>{analytics.mobileUsers}</h1>
        </div>

        <div className="analytics-card">
          <h3>Top Browser</h3>
          <h1 className="text-value">
            {analytics.topBrowser}
          </h1>
        </div>

        <div className="analytics-card">
          <h3>Top Country</h3>
          <h1 className="text-value">
            {analytics.topCountry}
          </h1>
        </div>

      </div>

      <VisitorTrend />

      <VisitorCharts />
    </>
  );
}

export default VisitorAnalytics;