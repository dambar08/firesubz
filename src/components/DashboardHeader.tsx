"use client";

import React, { useState, useEffect } from "react"; // Added useEffect
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, HelpCircle, User, Circle } from "lucide-react"; // Added Circle icon
import { Button } from "@/components/ui/button";
import { H4 } from "@/components/ui/typography";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from "@/lib/utils"; // Import cn utility for cleaner class merging
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  readAt: string | null; // Updated to allow null
}

const DashboardHeader = ({ userEmail }: { userEmail: string }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/notifications");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNotifications(data.map((n: any) => ({ ...n, readAt: n.readAt || null })));
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notificationId: number) => {
    const notificationToUpdate = notifications.find(n => n.id === notificationId);

    if (!notificationToUpdate || notificationToUpdate.readAt) {
      console.log("Notification already marked as read or not found locally.");
      return;
    }

    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      setNotifications(prevNotifications =>
        prevNotifications.map(n =>
          n.id === notificationId ? { ...n, readAt: new Date().toISOString() } : n
        )
      );

    } catch (clickError: any) {
      console.error("Failed to mark notification as read:", clickError.message);
    }
  };

  return (
    <div className="flex justify-end items-center h-16 bg-white px-4 shadow-sm">
      <div className="ml-auto flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="relative p-2">
              <Bell className="h-4 w-4"/>
              {/* Badge for unread count */}
              {notifications.filter(n => !n.readAt).length > 0 && (
                 <span className="absolute top-1 right-1 flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                 </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="sm:max-w-md w-full max-h-[400px] p-0">
            <div className="p-3 border-b flex flex-row items-center justify between gap-4">
              <H4 className="text-base font-semibold">Notifications</H4>
              <Link href="/dashboard/notifications">View All</Link>
            </div>
            <ScrollArea className="h-[300px] w-full">
              {isLoading ? (
                <div className="p-4 text-center text-sm text-gray-500">Loading...</div>
              ) : error ? (
                <div className="p-4 text-center text-sm text-red-500">
                  Error: {error}
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">No new notifications</div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn( // Using cn for better class management
                      "flex items-start p-3 space-x-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-800",
                      notification.readAt ? "bg-white dark:bg-gray-900" : "bg-blue-50 dark:bg-blue-900/20" // Different background for unread
                    )}
                    onClick={() => {
                      if (!notification.readAt) {
                        handleNotificationClick(notification.id);
                      }
                    }}
                  >
                    {/* Dot indicator for unread */}
                    <div className="flex-shrink-0 pt-1">
                       {!notification.readAt ? (
                         <Circle className="h-2 w-2 fill-blue-500 text-blue-500"/>
                       ) : (
                         <Circle className="h-2 w-2 fill-gray-300 text-gray-300" /> // Placeholder dot for read
                       )}
                    </div>
                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-center">
                          <p className={cn(
                              "text-sm truncate",
                              notification.readAt ? "text-gray-600 dark:text-gray-400" : "font-semibold text-gray-900 dark:text-white" // Different text style
                          )}>
                              {notification.title}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 ml-2 flex-shrink-0">
                              {new Date(notification.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} {/* Short time */}
                          </p>
                       </div>
                       <p className={cn(
                           "text-xs mt-1",
                           notification.readAt ? "text-gray-500 dark:text-gray-400" : "text-gray-700 dark:text-gray-300" // Different text style
                       )}>
                           {notification.message}
                       </p>
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
             {/* Optional Footer Link */}
            {/* <div className="p-2 text-center border-t">
               <a href="/notifications" className="text-sm text-blue-600 hover:underline">View all</a>
            </div> */}
          </PopoverContent>
        </Popover>

        <Button variant="ghost" className="p-2">
          <HelpCircle className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-2">
              <User className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
