import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { getCountryStatistics } from "../../api/analyticsChartApi";
import "./Charts.css";

interface ChartData {
  name: string;
  value: number;
}

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#ea580c",
  "#0f766e",
];

function CountryChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const response = await getCountryStatistics();

      const chartData = response.labels.map((label, index) => ({
        name: label,
        value: response.values[index],
      }));

      setData(chartData);
    } catch (error) {
      console.error("Unable to load country statistics", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="chart-card">
        <h3>🌍 Visitors by Country</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3>🌍 Visitors by Country</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CountryChart;
