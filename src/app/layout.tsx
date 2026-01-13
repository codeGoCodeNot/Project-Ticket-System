import Header from "@/components/header";
import Sidebar from "@/components/sidebar/components/sidebar";
import ThemeProvider from "@/components/theme/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
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
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <Header />
          <div className="flex h-screen overflow-hidden border-collapse">
            <Sidebar />
            <main
              className="px-7 min-h-screen flex-1 flex flex-col py-24
              bg-secondary/20
              overflow-y-auto overflow-x-hidden
              "
            >
              {children}
            </main>
          </div>
          <Toaster expand />
        </ThemeProvider>
      </body>
    </html>
  );
}
