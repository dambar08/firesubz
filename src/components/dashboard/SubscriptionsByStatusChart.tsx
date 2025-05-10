"use client";

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, startOfMonth, getMonth, getYear } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Subscription {
  id: number;
  name: string;
  price: number;
  currency: 'USD' | 'EUR' | 'GBP';
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'one-time';
  category: string; // Adjust if you have a specific category type
  paymentMethod: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  renewalDate: Date | null;
  userId: string;
}

interface SubscriptionsByStatusChartProps {
  subscriptions: Subscription[];
}

const SubscriptionsByStatusChart: React.FC<SubscriptionsByStatusChartProps> = ({ subscriptions }) => {
  const monthlyStatusData: {
    [key: string]: {
      active: number;
      cancelled: number;
      expired: number;
    };
  } = {};

  subscriptions.forEach(sub => {
    const monthYear = format(startOfMonth(sub.startDate), 'MMM yyyy');
    if (!monthlyStatusData[monthYear]) {
      monthlyStatusData[monthYear] = { active: 0, cancelled: 0, expired: 0 };
    }
    if (sub.status in monthlyStatusData[monthYear]) {
      monthlyStatusData[monthYear][sub.status as 'active' | 'cancelled' | 'expired']++;
    }
  });

  // Sort the months chronologically
  const sortedMonths = Object.keys(monthlyStatusData).sort((a, b) => {
    const [monthA, yearA] = a.split(' ');
    const [monthB, yearB] = b.split(' ');
    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);
    return dateA.getTime() - dateB.getTime();
  });


  const chartData: ChartData<'bar'> = {
    labels: sortedMonths,
    datasets: [
      {
        label: 'Active',
        data: sortedMonths.map(month => monthlyStatusData[month]?.active || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Cancelled',
        data: sortedMonths.map(month => monthlyStatusData[month]?.cancelled || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expired',
        data: sortedMonths.map(month => monthlyStatusData[month]?.expired || 0),
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
        borderColor: 'rgba(255, 205, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, // Allow controlling size with parent container
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Subscriptions by Status per Month',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Number of Subscriptions',
        },
      },
    },
  };

  return (
    <div className="w-full h-96"> {/* Adjust height as needed */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SubscriptionsByStatusChart;