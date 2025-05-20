"use server"
import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { eq } from "drizzle-orm";
import { subscriptions } from "@/server/db/schema";

export async function getSubscriptions() {
    const session = await auth();
    if (!session) return []
    return await db.query.subscriptions.findMany({
      where: eq(subscriptions.userId, session.user.id),
    });
}