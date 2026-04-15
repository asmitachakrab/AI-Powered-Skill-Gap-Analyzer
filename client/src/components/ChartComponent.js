import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function ChartComponent({ progressData = [], requiredSkills = [], gapSkills = [] }) {
  const matchedSkills = Math.max(requiredSkills.length - gapSkills.length, 0);

  if (requiredSkills.length === 0) {
    return <p className="chart-empty">Add a career and skills to see colorful analysis charts.</p>;
  }

  const doughnutData = {
    labels: ["Covered Skills", "Missing Skills"],
    datasets: [
      {
        data: [matchedSkills, gapSkills.length],
        backgroundColor: ["#14b8a6", "#f97316"],
        borderColor: ["#0f766e", "#c2410c"],
        borderWidth: 2
      }
    ]
  };

  const barData = {
    labels: progressData.map((item) => item.skill),
    datasets: [
      {
        label: "Skill Match %",
        data: progressData.map((item) => item.progress),
        backgroundColor: progressData.map((item) =>
          item.progress >= 100 ? "#22c55e" : item.progress > 0 ? "#3b82f6" : "#f43f5e"
        ),
        borderRadius: 10,
        maxBarThickness: 42
      }
    ]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#1f2937",
          font: {
            size: 12,
            weight: "600"
          }
        }
      }
    }
  };

  const doughnutOptions = {
    ...commonOptions,
    cutout: "62%",
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: "Overall Skill Coverage",
        color: "#1f2937",
        font: {
          size: 16,
          weight: "700"
        }
      }
    }
  };

  const barOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: "Coverage By Required Skill",
        color: "#1f2937",
        font: {
          size: 16,
          weight: "700"
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#475569"
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: "#475569"
        },
        grid: {
          color: "rgba(148, 163, 184, 0.25)"
        }
      }
    }
  };

  return (
    <div className="dashboard-chart-layout">
      <div className="chart-panel chart-panel-donut">
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>
      <div className="chart-panel chart-panel-bar">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}

export default ChartComponent;
