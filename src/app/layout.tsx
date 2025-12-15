import { Button } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/path";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { LucideKanban } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Road to Next",
  description: "My road to next application...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav
          className="
        supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
        flex justify-between 
        py-2.5 px-5 border-b
        w-full
        "
        >
          <div>
            <Button variant="ghost" asChild>
              <Link href={homePath()}>
                <LucideKanban />
                <h1 className="text-lg font-semibold">TicketHub</h1>
              </Link>
            </Button>
          </div>
          <div>
            <Button variant="default" asChild>
              <Link href={ticketsPath()}>
                <h1>Tickets</h1>
              </Link>
            </Button>
          </div>
        </nav>
        <main
          className="
        py-24 px-8 min-h-screen 
        flex-1 flex flex-col
        overflow-y-auto overflow-x-hidden
        "
        >
          {children}
        </main>
      </body>
    </html>
  );
}
