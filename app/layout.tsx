import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { RouteTracker } from "@/components/RouteTracker";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Weather App - Random Global Weather",
  description: "Discover weather conditions from random cities around the world using Open Meteo API",
  keywords: ["weather", "forecast", "global", "random", "open meteo"],
  authors: [{ name: "Weather App" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics脚本 */}
        <GoogleAnalytics />
        {/* Microsoft Clarity脚本 */}
        <MicrosoftClarity />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 路由追踪器 */}
        <RouteTracker />
        {children}
      </body>
    </html>
  );
}
