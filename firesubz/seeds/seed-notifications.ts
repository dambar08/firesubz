import { db } from "../src/server/db";
import * as schema from "../src/server/db/schema";
import { env } from "../src/env";
import ws from 'ws';
import { neonConfig } from "@neondatabase/serverless"

neonConfig.webSocketConstructor = ws;

const demoUser = {
  // Copy from the user you created
  id: "b73fda0e-a2b9-4d9a-b2d1-54848266ca39"
}


const seed = async () => {
  try {
    console.log("Seeding database with notifications");

    await db.insert(schema.notifications).values([
      {
        title: 'New message',
        message: 'New message from John Doe',
        userId: demoUser.id,
        readAt: null
      },
      {
        title: 'Update',
        message: 'System update available',
        userId: demoUser.id,
        readAt: null
      },
      {
        title: "Subscription",
        message: 'Your subscription is ending soon',
        userId: demoUser.id,
      },
      {
        title: "Update",
        message: 'System update available',
        userId: demoUser.id,
      },
      {
        title: 'Subscription',
        message: 'Your subscription is ending soon',
        userId: demoUser.id,
      },
    ]);

    console.log("Dummy notifications inserted successfully");
  } catch (error) {
    console.error("Error seeding database with notifications:", error);
  }
};

seed();