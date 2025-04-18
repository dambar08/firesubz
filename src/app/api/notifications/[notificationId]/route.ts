import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { notifications } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { notificationId: string } }
) {
  const session = await auth();
  const notificationId = parseInt(params.notificationId, 10);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isNaN(notificationId)) {
     return NextResponse.json({ error: "Invalid notification ID" }, { status: 400 });
  }

  try {
    // Find the notification to ensure it belongs to the user and exists
    const existingNotification = await db.query.notifications.findFirst({
      where: and(
        eq(notifications.id, notificationId),
        eq(notifications.userId, session.user.id)
      ),
    });

    if (!existingNotification) {
      return NextResponse.json({ error: "Notification not found or access denied" }, { status: 404 });
    }

    // Update the readAt field
    await db
      .update(notifications)
      .set({ readAt: new Date() })
      .where(and(
        eq(notifications.id, notificationId),
        eq(notifications.userId, session.user.id) // Ensure user owns the notification
      ));

    return NextResponse.json({ success: true, message: "Notification marked as read." });

  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}
