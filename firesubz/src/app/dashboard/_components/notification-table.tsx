"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { type Notification } from "@/server/db/schema";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { deleteNotification } from "../notifications/actions";


const NotificationTable: React.FC<{ notifications: Notification[] }> = ({ notifications }) => {
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[50%]">Notification</TableHead>
                <TableHead className="w-[30%]">Time</TableHead>
                <TableHead className="w-[20%] text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {notifications.map((notification) => (
                <TableRow key={notification.id}>
                    <TableCell>{notification.title}</TableCell>
                    <TableCell>
                        {formatDistanceToNow(notification.createdAt, {
                            addSuffix: true,
                        })}
                    </TableCell>
                    <TableCell className="text-right">
                        <Button onClick={async () => await deleteNotification(notification.id)} variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}

export default NotificationTable;