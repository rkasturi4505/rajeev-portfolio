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

import { getTopVisitedPages } from "../../api/analyticsChartApi";
import "./Charts.css";

interface ChartData {
  name: string;
  visits: number;
}

function TopPagesChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const response = await getTopVisitedPages();

      const chartData = response.labels.map((label, index) => ({
        name: label,
        visits: response.values[index],
      }));

      setData(chartData);
    } catch (error) {
      console.error("Unable to load top pages chart", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="chart-card">
        <h3>📄 Top Visited Pages</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3>📄 Top Visited Pages</h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            angle={-20}
            textAnchor="end"
            interval={0}
            height={70}
          />

          <YAxis />

          <Tooltip />

          <Bar dataKey="visits" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopPagesChart;
