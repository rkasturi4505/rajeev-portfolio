import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  getDeviceChart,
  getBrowserChart,
  getCountryChart,
  getPageChart,
} from "../api/visitorChartApi";

import "./VisitorCharts.css";

interface ChartData {
  label: string;
  value: number;
}

function VisitorCharts() {
  const [deviceData, setDeviceData] = useState<ChartData[]>([]);
  const [browserData, setBrowserData] = useState<ChartData[]>([]);
  const [countryData, setCountryData] = useState<ChartData[]>([]);
  const [pageData, setPageData] = useState<ChartData[]>([]);

  const [loading, setLoading] = useState(true);

  const COLORS = [
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  useEffect(() => {
    loadCharts();
  }, []);

  const loadCharts = async () => {
    try {
      const [deviceResponse, browserResponse, countryResponse, pageResponse] =
        await Promise.all([
          getDeviceChart(),
          getBrowserChart(),
          getCountryChart(),
          getPageChart(),
        ]);

      setDeviceData(deviceResponse.data);
      setBrowserData(browserResponse.data);
      setCountryData(countryResponse.data);
      setPageData(pageResponse.data);
    } catch (error) {
      console.error("Unable to load visitor charts", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading charts...</p>;
  }

  return (
    <div className="visitor-chart-grid">
      {/* Device Chart */}

      <div className="chart-card">
        <h3>Device Distribution</h3>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={deviceData}
              dataKey="value"
              nameKey="label"
              outerRadius={110}
              label
            >
              {deviceData.map((entry, index) => (
                <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Browser Chart */}

      <div className="chart-card">
        <h3>Browser Usage</h3>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={browserData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Country Chart */}

      <div className="chart-card">
        <h3>Top Countries</h3>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={countryData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pages Chart */}

      <div className="chart-card">
        <h3>Most Visited Pages</h3>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={pageData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default VisitorCharts;
