import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { PageLoadProgressBar } from "@/components/PageLoadProgressBar"; // Import the component

export const metadata: Metadata = {
  title: "FireSubz: Subscription Management",
  description: "Manage your subscriptions effectively with FireSubz. Track, categorize, and stay on top of your recurring expenses.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body className="flex">
          <PageLoadProgressBar />
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </SessionProvider>
  );
}
