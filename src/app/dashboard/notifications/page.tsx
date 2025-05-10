import { type Notification } from "@/server/db/schema";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { unstable_noStore as noStore } from "next/cache";
import NotificationTable from "../_components/notification-table";

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

export default async function Notifications({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const page = searchParams?.page ? parseInt(searchParams.page) : 1;
    const notifications: Notification[] = await getNotifications(page);

    return (
        <div className="container mx-auto  py-10">
            <NotificationTable notifications={notifications} />
        </div>
    );
}


