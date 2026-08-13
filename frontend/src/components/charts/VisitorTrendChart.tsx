import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./Charts.css";
import { getVisitorTrend } from "../../api/analyticsChartApi";

interface ChartData {
  name: string;
  visitors: number;
}

function VisitorTrendChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const response = await getVisitorTrend();

      const chartData = response.labels.map((label, index) => ({
        name: label,
        visitors: response.values[index],
      }));

      setData(chartData);
    } catch (error) {
      console.error("Unable to load visitor trend", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="chart-card">
        <h3>Visitor Trend</h3>
        <p>Loading chart...</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3>📈 Visitor Trend</h3>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VisitorTrendChart;
