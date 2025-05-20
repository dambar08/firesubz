"use client";

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { type Subscription } from '@/server/db/schema'; // Assuming your schema is exported here
import { format, startOfWeek, endOfWeek, isWithinInterval, parseISO } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface NewSubscriptionsChartProps {
  subscriptions: Subscription[];
}

const NewSubscriptionsChart: React.FC<NewSubscriptionsChartProps> = ({ subscriptions }) => {
  // Process data to count new subscriptions per week
  const weeklyData: Record<string, number> = {};

  subscriptions.forEach(sub => {
    const startDate = parseISO(sub.startDate);
    const startOfCurrentWeek = startOfWeek(startDate, { weekStartsOn: 0 }); // Adjust weekStartsOn as needed (0 for Sunday, 1 for Monday)
    const weekKey = format(startOfCurrentWeek, 'yyyy-MM-dd');

    if (weeklyData[weekKey]) {
      weeklyData[weekKey]++;
    } else {
      weeklyData[weekKey] = 1;
    }
  });

  // Sort weeks chronologically
  const sortedWeeks = Object.keys(weeklyData).sort();

  const chartData = {
    labels: sortedWeeks.map(weekKey => format(parseISO(weekKey), 'MMM dd, yyyy')),
    datasets: [
      {
        label: 'New Subscriptions',
        data: sortedWeeks.map(weekKey => weeklyData[weekKey]),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
        text: 'New Subscriptions Per Week',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Week',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Subscriptions',
        },
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default NewSubscriptionsChart;