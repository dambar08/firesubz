import * as schema from "../src/server/db/schema";
import { db } from "../src/server/db";
import { env } from "../src/env";
import crypto from "crypto";
import ws from 'ws';
import { neonConfig } from "@neondatabase/serverless"

neonConfig.webSocketConstructor = ws;

export const demoUser = {
  id: "5cdf70cf-a119-4283-9c3e-9cdec84bea10",
  name: "Demo User",
  email: "demo.user@example.com",
  emailVerified: new Date(),
};

const seed = async (): Promise<void> => {
  try {
    console.log("Seeding database");

    await db.insert(schema.users).values([
      {
        name: "John Doe",
        email: "john.doe@example.com",
        emailVerified: new Date(),
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        emailVerified: new Date(),
      },
      {
        name: "Peter Jones",
        email: "peter.jones@example.com",
        emailVerified: new Date(),
      },
      demoUser
    ]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
await seed();