"use server";
import { auth } from "@/server/auth";
import { subscriptions } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, count } from "drizzle-orm";

export async function getSubscriptionCount() {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    try {
        await db.select({ count: count() }).from(subscriptions).where(eq(subscriptions.userId, session.user.id));
    } catch (error) {
        console.log(error);
    }
}

export async function getActiveSubscriptionCount() {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    try {
        await db.select({ count: count() }).from(subscriptions).where(eq(subscriptions.userId, session.user.id));
    } catch (error) {
        console.log(error);
    }
}