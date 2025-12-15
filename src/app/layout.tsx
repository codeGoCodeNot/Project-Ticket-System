import { Button } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/path";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { LucideKanban } from "lucide-react";
import Header from "@/components/header";

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
        <Header />
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
