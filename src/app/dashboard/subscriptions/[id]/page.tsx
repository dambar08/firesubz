import { db } from "@/server/db"; // Assuming your database instance
import { subscriptions } from "@/server/db/schema"; // Import the subscriptions schema
import { eq } from "drizzle-orm"; // Import eq for querying
import { notFound } from "next/navigation"; // For handling not found cases

interface SubscriptionDetailsPageProps {
  params: Promise<{
    id: string; // The subscription ID from the URL
  }>;
}

const SubscriptionDetailsPage = async ({ params }: SubscriptionDetailsPageProps) => {
  const { id: subscriptionId } = await params;

  // Fetch the subscription details from the database
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.id, Number(subscriptionId)), // Assuming id is a number, adjust if it's a string
  });

  // If subscription is not found, render a not found page
  if (!subscription) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{subscription?.name}</h1> {/* Display subscription name */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Price:</span> {subscription?.price} {subscription?.currency}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Frequency:</span> {subscription?.frequency}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Category:</span> {subscription?.category}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Payment Method:</span> {subscription?.paymentMethod}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Status:</span> {subscription?.status}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Dates</h2>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Start Date:</span> {subscription?.startDate ? new Date(subscription.startDate).toLocaleDateString() : 'N/A'}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Renewal Date:</span> {subscription?.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>

      {/* You can add more sections here for additional details, notes, etc. */}
    </div>
  );
};

export default SubscriptionDetailsPage;