// src/app/dashboard/subscriptions/page.tsx
"use client";
import { subscriptions } from "@/server/db/schema";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import SubscriptionForm from "@/components/SubscriptionForm";
import { getSubscriptions } from "@/lib/subscriptions";
import { createSubscription } from "./actions";

export default function SubscriptionTracker() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [allSubscriptions, setAllSubscriptions] = useState<

    typeof subscriptions._.inferSelect[]
  >([]);

  useEffect(() => {
    getSubscriptions().then(setAllSubscriptions);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Subscription Tracker
      </h1>
      <Button onClick={() => setIsFormVisible(!isFormVisible)}>
        New Subscription
      </Button>
      {isFormVisible && (
        <SubscriptionForm
          onSubmit={async (data) => {
            await createSubscription(data);
            getSubscriptions().then(setAllSubscriptions);
          }}
        />
      )}
      <div className="space-y-4">       
        {allSubscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {subscription.name}
                </h2>
                <p className="text-gray-600">
                  Category: {subscription.category}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">
                  {subscription.price} {subscription.currency}
                </p>
                {subscription.renewalDate ? (
                  <p className="text-sm text-gray-600">
                    Renews on:{" "}
                    {new Date(
                      subscription.renewalDate,
                    ).toLocaleDateString()}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}