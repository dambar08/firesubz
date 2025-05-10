"use server";
import { auth } from "@/server/auth";
import { notifications } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from 'next/cache';

export async function deleteNotification(notificationId: string) {    
    const session = await auth();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    try {
        await db.delete(notifications).where(eq(notifications.id, notificationId));
        revalidatePath("/dashboard/notifications");
    } catch (error) {
        console.log(error);
    }
}