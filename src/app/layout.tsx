import Header from "@/components/header";
import ThemeProvider from "@/components/theme/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Tickethub",
  description: "Tickethub application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
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
          <Toaster expand />
        </ThemeProvider>
      </body>
    </html>
  );
}
