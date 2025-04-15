import { db } from "./src/server/db";
import * as schema from "./src/server/db/schema";
import { env } from "./src/env";
// import { demoUser } from "seed-users";
import ws from 'ws';
import { neonConfig } from "@neondatabase/serverless"

neonConfig.webSocketConstructor = ws;

const demoUser = {
  // Copy from the user you created
  id: "b73fda0e-a2b9-4d9a-b2d1-54848266ca39"
}


const seed = async () => {
  try {
    console.log("Seeding database with subscriptions");

    // Insert dummy subscriptions
    await db.insert(schema.subscriptions).values([
      {
        userId: demoUser.id,
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
        userId: demoUser.id,
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
        userId: demoUser.id,
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
        userId: demoUser.id,
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