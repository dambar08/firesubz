import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Total Subscriptions
            </h2>
            {/* Icon or visual element here */}
            <span className="text-3xl font-bold text-blue-500">120</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Active Subscriptions
            </h2>
            {/* Icon or visual element here */}
            <span className="text-3xl font-bold text-green-500">105</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">MRR</h2>
            {/* Icon or visual element here */}
            <span className="text-3xl font-bold text-indigo-500">$5,500</span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Subscriptions by Category</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">Bar Chart Placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
}