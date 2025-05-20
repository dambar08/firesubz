"use client";
import { useSearchParams } from "next/navigation";
import useSWR from 'swr';
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import CurrencyFilter from '@/components/dashboard/CurrencyFilter';
import FrequencyFilter from '@/components/dashboard/FrequencyFilter';
import CategoryFilter from '@/components/dashboard/CategoryFilter';
import StatusFilter from '@/components/dashboard/StatusFilter';
import MonthlySpendingChart from '@/components/dashboard/MonthlySpendingChart';
import NewSubscriptionsChart from '@/components/dashboard/NewSubscriptionsChart';
import { type Subscription } from '@/server/db/schema';
import SubscriptionsByStatusChart from '@/components/dashboard/SubscriptionsByStatusChart';

import { Bar, Line } from 'react-chartjs-2'; // Keep Bar for category chart, add Line for others
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip, // Keep Tooltip
  Legend,
} from "chart.js";

import {
  Chart as ChartJSTypes,
  CategoryScale as CategoryScaleTypes,
  LinearScale as LinearScaleTypes,
} from "chart.js";
import { ListChecks, CheckCircleIcon, DollarSign } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function DashboardPage() {
  const searchParams = useSearchParams()!;

  const currencyFilter = searchParams.get('currency');
  const frequencyFilter = searchParams.get('frequency');
  const categoryFilter = searchParams.get('category');
  const statusFilter = searchParams.get('status');

  const apiUrl = `/api/subscriptions?currency=${currencyFilter || ''}&frequency=${frequencyFilter || ''}&category=${categoryFilter || ''}&status=${statusFilter || ''}`;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: subscriptions, error, isLoading } = useSWR<Subscription[]>(apiUrl, fetcher);

  if (error) return <div>Failed to load</div>;

  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      {/* Existing Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Existing Total Subscriptions Card */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">
            Total Subscriptions
          </h2>
          <ListChecks className="mb-2 h-8 w-8 text-blue-500" />
          <span className="text-3xl font-bold text-blue-500">120</span>
        </div>
        {/* Existing Active Subscriptions Card */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">
            Active Subscriptions
          </h2>
          <CheckCircleIcon className="mb-2 h-8 w-8 text-green-500" />
          <span className="text-3xl font-bold text-green-500">105</span>
        </div>
        {/* Existing MRR Card */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">MRR</h2>
          <DollarSign className="mb-2 h-8 w-8 text-indigo-500" />
          <span className="text-3xl font-bold text-indigo-500">$5,500</span>
        </div>
      </div>


      {/* Filter Section */}
      <div className="flex flex-wrap gap-4">
        <CurrencyFilter />
        <FrequencyFilter />
        <CategoryFilter />
        <StatusFilter />
      </div>

      {/* Subscription Table */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Subscription Details</h2>
        <Table>
          <TableCaption>Subscriptions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Renewal Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow><TableCell colSpan={8} className="text-center">Loading subscriptions...</TableCell></TableRow>
            )}
            {subscriptions?.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.name}</TableCell>
                <TableCell>{subscription.price}</TableCell>
                <TableCell>{subscription.currency}</TableCell>
                <TableCell>{subscription.frequency}</TableCell>
                <TableCell>{subscription.category}</TableCell>
                <TableCell>{subscription.status}</TableCell>
                <TableCell>{subscription.startDate ? new Date(subscription.startDate).toLocaleDateString() : '-'}</TableCell>
                <TableCell>{subscription.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString() : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Spending Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Total Monthly Spending</h2>
          {isLoading ? (
            <div className="text-center">Loading chart...</div>
          ) : (
            <MonthlySpendingChart subscriptions={subscriptions || []} />
          )}
        </div>

        {/* New Subscriptions Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">New Subscriptions per Week</h2>
          {isLoading ? (
            <div className="text-center">Loading chart...</div>
          ) : (
            <NewSubscriptionsChart subscriptions={subscriptions || []} />
          )}
        </div>

        {/* Subscriptions by Status Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Subscriptions by Status per Month</h2>
          {isLoading ? (
            <div className="text-center">Loading chart...</div>
          ) : (
            <SubscriptionsByStatusChart subscriptions={subscriptions || []} />
          )}
        </div>
      </div>
    </div>
  );
}
