"use client";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const {data: session } = useSession();
   return (
     <main className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-blue-500 hover:text-blue-700"
          >
            Getting Started
          </Link>
        </div>
        {/* Login Button */}
        {session ? <Button onClick={() => signOut()}>Logout</Button> : <Button onClick={() => signIn()}>Login</Button>}
      </header>
      {/* Hero Section - Clean and Minimal */}
       <section className="bg-white py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Simplify Your Subscriptions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Take control of your recurring payments. Our subscription tracker
            helps you manage, track, and analyze your subscriptions with ease.
          </p>
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            <Link href="/dashboard">
              Start Tracking Today
            </Link>
          </Button>
        </div>
      </section>

      {/* Key Features Section - Grid Layout */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Manage Subscriptions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Effortless Management
              </h3>
              <p className="text-gray-600">
                Keep all your subscriptions organized in one convenient place.
              </p>
            </div>

            {/* Track Payments */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Payment Tracking
              </h3>
              <p className="text-gray-600">
                Never miss a payment with automatic reminders and clear payment
                histories.
              </p>
            </div>

            {/* Analyze Spending */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Spending Insights
              </h3>
              <p className="text-gray-600">
                Gain valuable insights into your subscription spending habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Features - Concise Highlights */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Unlock More Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-700">
                Customizable categories for organizing subscriptions.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-700">
                Clear overviews of upcoming renewals and cancellations.
              </p>
            </div>
          </div>
        </div>
      </section>
       {/* Login Button */}
    </main>
  );
}

