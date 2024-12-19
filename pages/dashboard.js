
import { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import api from "../services/api";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

export default function Dashboard() {
  const [taskDistribution, setTaskDistribution] = useState([]);
  const [completionRate, setCompletionRate] = useState({ dates: [], values: [] });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get("/analytics");
        console.log("Task Distribution:", response.data.taskDistribution);
        console.log("Completion Rate:", response.data.completionRate);

        setTaskDistribution(response.data.taskDistribution || []);
        setCompletionRate(response.data.completionRate || { dates: [], values: [] });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };
    fetchAnalytics();
  }, []);

  if (!taskDistribution.length || !completionRate.dates.length || !completionRate.values.length) {
    return <p className="loading">Loading or no data available...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="charts-container">
        {/* Task Distribution Pie Chart */}
        <div className="chart-card">
          <h2 className="chart-title">Task Distribution</h2>
          <Pie
            data={{
              labels: ["High", "Medium", "Low"],
              datasets: [
                {
                  data: taskDistribution,
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
              },
            }}
          />
        </div>

        {/* Completion Rate Line Graph */}
        <div className="chart-card">
          <h2 className="chart-title">Completion Rate Over Time</h2>
          <Line
            data={{
              labels: completionRate.dates,
              datasets: [
                {
                  label: "Completion Rate (%)",
                  data: completionRate.values,
                  fill: false,
                  borderColor: "rgba(75,192,192,1)",
                  backgroundColor: "rgba(75,192,192,0.2)",
                  tension: 0.2,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `${value}%`,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

