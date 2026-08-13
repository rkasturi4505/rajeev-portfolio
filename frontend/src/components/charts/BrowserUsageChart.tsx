import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getBrowserUsage } from "../../api/analyticsChartApi";
import "./Charts.css";

interface ChartData {
  name: string;
  browsers: number;
}

function BrowserUsageChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const response = await getBrowserUsage();

      const chartData = response.labels.map((label, index) => ({
        name: label,
        browsers: response.values[index],
      }));

      setData(chartData);
    } catch (error) {
      console.error("Unable to load browser chart", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="chart-card">
        <h3>🌐 Browser Usage</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3>🌐 Browser Usage</h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="browsers" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BrowserUsageChart;
