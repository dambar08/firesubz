import { type Notification } from "@/server/db/schema";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { unstable_noStore as noStore } from "next/cache";
import NotificationTable from "../_components/notification-table";
import type { NextPage } from "next";

async function getNotifications(page: number) {
    noStore();
    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const userId = session.user.id;
    const notifications = await db.query.notifications.findMany({
        where: (notifications, { eq }) => eq(notifications.userId, userId),
        orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
    });
    const pageSize = 10;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedNotifications = notifications.slice(startIndex, endIndex);

    return notifications;
}

const NotificationsPage:NextPage<{searchParams: Promise<{page?: string}>}> = async ({
    searchParams,
}) => {
    const { page } = await searchParams;
    const notifications: Notification[] = await getNotifications(page ? Number.isNaN(parseInt(page)) ? 0: parseInt(page) : 0);

    return (
        <div className="container mx-auto space-y-6 px-4 py-10">
            <NotificationTable notifications={notifications} />
        </div>
    );
}


export default NotificationsPage;