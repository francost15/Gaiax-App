"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ActivityChartProps {
  data: {
    date: string;
    value: number;
  }[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString('es-ES', { weekday: 'short' })),
    datasets: [
      {
        label: 'Actividad',
        data: data.map(item => item.value),
        fill: true,
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#6366F1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        padding: 12,
        titleColor: '#F3F4F6',
        bodyColor: '#F3F4F6',
        bodySpacing: 4,
        titleSpacing: 4,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          stepSize: 1,
          padding: 10,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 5,
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest' as const,
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Line data={chartData} options={options} />
    </div>
  );
} 