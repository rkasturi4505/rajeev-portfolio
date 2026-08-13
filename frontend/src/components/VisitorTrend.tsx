import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  getLast7DaysTrend,
  getLast30DaysTrend,
  getMonthlyTrend,
} from "../api/visitorTrendApi";

import "./VisitorTrend.css";

interface VisitorTrendData {
  label: string;
  visitors: number;
}

function VisitorTrend() {
  const [last7Days, setLast7Days] = useState<VisitorTrendData[]>([]);
  const [last30Days, setLast30Days] = useState<VisitorTrendData[]>([]);
  const [monthly, setMonthly] = useState<VisitorTrendData[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrendData();
  }, []);

  const loadTrendData = async () => {
    try {
      const [last7Response, last30Response, monthlyResponse] =
        await Promise.all([
          getLast7DaysTrend(),
          getLast30DaysTrend(),
          getMonthlyTrend(),
        ]);

      setLast7Days(last7Response.data);
      setLast30Days(last30Response.data);
      setMonthly(monthlyResponse.data);
    } catch (error) {
      console.error("Failed to load visitor trends", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading visitor trends...</p>;
  }

  return (
    <div className="visitor-trend-container">
      {/* Last 7 Days */}

      <div className="trend-card">
        <h2>Last 7 Days Visitors</h2>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={last7Days}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Last 30 Days */}

      <div className="trend-card">
        <h2>Last 30 Days Visitors</h2>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={last30Days}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#16a34a"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly */}

      <div className="trend-card trend-full-width">
        <h2>Monthly Visitor Trend</h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#f97316"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default VisitorTrend;
