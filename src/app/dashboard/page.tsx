"use client";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {

  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">
            Total Subscriptions
          </h2>
          {/* Icon or visual element here */}
          <span className="text-3xl font-bold text-blue-500">120</span>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">
            Active Subscriptions
          </h2>
          {/* Icon or visual element here */}
          <span className="text-3xl font-bold text-green-500">105</span>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">MRR</h2>
          {/* Icon or visual element here */}
          <span className="text-3xl font-bold text-indigo-500">$5,500</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Subscriptions by Category
          </h2>
          <Bar 
            data={{
              labels: ["Entertainment", "Software", "Utilities", "Other"],
              datasets: [{
                label: 'Subscriptions',
                data: [30, 45, 15, 10],
                backgroundColor: '#60A5FA',
              }]
            }}
            options={{
              maintainAspectRatio: true,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Subscriptions',
                    font: {
                      size: 12
                    }
                  }
                }
              },
              plugins: {
                legend: {
                  display: false,
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
