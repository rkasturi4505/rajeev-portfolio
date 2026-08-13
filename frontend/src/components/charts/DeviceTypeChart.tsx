import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getDeviceTypes } from "../../api/analyticsChartApi";
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
];

function DeviceTypeChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const response = await getDeviceTypes();

      const chartData = response.labels.map((label, index) => ({
        name: label,
        value: response.values[index],
      }));

      setData(chartData);
    } catch (error) {
      console.error("Unable to load device chart", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="chart-card">
        <h3>📱 Device Types</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3>📱 Device Types</h3>

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

export default DeviceTypeChart;
