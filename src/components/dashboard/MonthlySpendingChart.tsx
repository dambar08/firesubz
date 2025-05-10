"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { type Subscription } from '@/server/db/schema';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlySpendingChartProps {
  subscriptions: Subscription[];
}

const MonthlySpendingChart: React.FC<MonthlySpendingChartProps> = ({ subscriptions }) => {
  const monthlySpending: Record<string, number> = {};

  subscriptions.forEach(sub => {
    if (sub.startDate) {
      const month = format(sub.startDate, 'yyyy-MM');
      monthlySpending[month] = (monthlySpending[month] ?? 0) + sub.price;
    }
  });

  const sortedMonths = Object.keys(monthlySpending).sort();

  const data: ChartData<'line', number[], string> = {
    labels: sortedMonths,
    datasets: [
      {
        label: 'Total Monthly Spending',
        data: sortedMonths.map(month => monthlySpending[month]),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Total Monthly Subscription Spending',
      },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Month'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Spending'
            }
        }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto"> {/* Adjust width as needed */}
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlySpendingChart;