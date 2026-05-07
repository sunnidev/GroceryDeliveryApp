import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Snapcart | 10 minutes grocery delivery app",
  description: "Snapcart is a 10 minutes grocery delivery app that allows users to order groceries online and have them delivered to their doorstep in just 10 minutes. With a wide selection of products and a user-friendly interface, Snapcart makes grocery shopping quick and convenient for busy individuals and families.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
      <body className="bg-linear-to-b from-green-100 to-white min-h-screen w-full" suppressHydrationWarning>{children}</body>
    </html>
  );
}
