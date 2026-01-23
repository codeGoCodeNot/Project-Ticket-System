import Header from "@/components/header";
import SidebarComponent from "@/components/sidebar/components/sidebar";
import ThemeProvider from "@/components/theme/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
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
          <SidebarProvider>
            <Header />
            <SidebarComponent />
            <main
              className="px-7 min-h-screen flex-1 flex flex-col py-24
              bg-secondary/20
              overflow-y-auto overflow-x-hidden
              "
            >
              {children}
            </main>
          </SidebarProvider>
          <Toaster expand />
        </ThemeProvider>
      </body>
    </html>
  );
}
