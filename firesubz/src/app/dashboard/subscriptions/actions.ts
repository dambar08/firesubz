"use server";

import { subscriptionSchema } from "@/lib/schema";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { subscriptions } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import {  type z } from "zod";

export async function createSubscription(data: z.infer<typeof subscriptionSchema>) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return { error: "Unauthorized" };
  }

  const validatedData = subscriptionSchema.safeParse(data);

  if (!validatedData.success) {
    console.error("Validation Error createSubscription:", validatedData.error);
    return { error: "Invalid input data" };
  }

  const { startDate, renewalDate, ...rest } = validatedData.data;

  try {
    await db.insert(subscriptions).values({
      ...rest,
      userId: session.user.id,
      startDate: startDate, // Pass Date object directly
      renewalDate: renewalDate, // Pass Date object directly or null
    });
    revalidatePath("/dashboard/subscriptions");
    return { success: "Subscription created successfully" };
  } catch (error) {
    console.error("Error creating subscription:", error);
    return { error: "Failed to create subscription" };
  }
}