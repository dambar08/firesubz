import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Respawn Report",
  description: "Respawn Report reviews provide critical evaluations of video games, movies, TV shows, and comics, helping audiences decide whether a piece of media is worth their time and money. Their reviews focus on both technical aspects and emotional impact, recognizing that art criticism is inherently subjective. IGN uses a **10-point rating scale**, where each score corresponds to a descriptive category (e.g., "Masterpiece" for a 10, "Painful" for a 2). Reviews typically include a **detailed analysis**, covering gameplay mechanics, storytelling, visuals, and overall experience, along with a **Verdict section** summarizing key praise and criticisms.",
  keywords: ["respawn report", "game news"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
