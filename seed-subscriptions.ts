import { db } from "./src/server/db";
import * as schema from "./src/server/db/schema";
import { env } from "./src/env";

const seed = async () => {
  try {
    console.log("Seeding database with subscriptions");

    // Insert dummy subscriptions
    await db.insert(schema.subscriptions).values([
      {
        name: "Netflix",
        price: 15.99,
        currency: "USD",
        frequency: "monthly",
        category: "entertainment",
        paymentMethod: "Credit Card",
        startDate: new Date(),
        renewalDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
      {
        name: "Spotify",
        price: 9.99,
        currency: "USD",
        frequency: "monthly",
        category: "entertainment",
        paymentMethod: "Credit Card",
        startDate: new Date(),
        renewalDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
      {
        name: "New York Times",
        price: 7.99,
        currency: "USD",
        frequency: "monthly",
        category: "news",
        paymentMethod: "Credit Card",
        startDate: new Date(),
        renewalDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
      {
        name: "Gym Membership",
        price: 50.00,
        currency: "USD",
        frequency: "monthly",
        category: "lifestyle",
        paymentMethod: "Credit Card",
        startDate: new Date(),
        renewalDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
    ]);

    console.log("Dummy subscriptions inserted successfully");
  } catch (error) {
    console.error("Error seeding database with subscriptions:", error);
  }
};

seed();