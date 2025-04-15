"use client"
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-[#2e026d] to-[#15162c] min-h-screen text-white">
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-6 px-4 py-24 text-center md:py-40">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
            Subscription Tracker
          </h1>
          <p className="text-lg text-gray-300 md:text-xl mt-4">
            Effortlessly manage all your subscriptions in one place. Keep track
            of upcoming payments, plan details, and more.
          </p>
          <div className="mt-8 flex gap-4">
            <Button
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => signIn()}
            >
              Get Started
            </Button>
            <Button onClick={() => signIn()}>Login</Button>
          </div>
        </div>
      </section>

      {/* Efficiency Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Maximize Efficiency
            </h2>
            <p className="text-gray-300 mt-4">
              Streamline your subscription management process. Our platform
              automates reminders and renewals, ensuring you never miss a beat.
            </p>
          </div>
          {/* Placeholder for Image */}
          <div className="bg-gray-700 h-64 rounded-lg"></div>
        </div>
      </section>

      {/* Customer Control Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Placeholder for Image */}
          <div className="bg-gray-700 h-64 rounded-lg"></div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              Customer Control
            </h2>
            <p className="text-gray-300 mt-4">
              Give your customers the power to manage their subscriptions with
              ease. Customizable plans and self-service options reduce support
              overhead.
            </p>
          </div>
        </div>
      </section>

      {/* Sales and Analysis Section */}
      <section className="container px-4 py-16 md:py-24 text-center">
        <h2 className="text-3xl font-bold text-white">Boost Sales & Analyze</h2>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Optimize your pricing and plan offerings with detailed insights into
          customer behavior. Our analytics tools help you drive sales and
          improve customer retention.
        </p>
      </section>
    </main>
  );
}
