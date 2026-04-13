import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { ChatWidget } from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Algonquin Nurses Home Health Care | St. Louis Since 1987",
    template: "%s | Algonquin Nurses Home Health",
  },
  description:
    "Professional home health care services in St. Louis since 1987. Private duty care, Medicaid services, consumer directed services, youth programs, and veterans care.",
  keywords: [
    "home health care",
    "St. Louis",
    "private duty care",
    "Medicaid",
    "in-home care",
    "veterans care",
    "CDS",
    "consumer directed services",
    "HCY program",
    "Missouri home health",
  ],
  openGraph: {
    title: "Algonquin Nurses Home Health Care | St. Louis Since 1987",
    description:
      "Professional home health care services in St. Louis since 1987. Trusted by families across the St. Louis metro area.",
    type: "website",
    locale: "en_US",
    siteName: "Algonquin Nurses Home Health",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <SchemaMarkup />
      </head>
      <body className="min-h-full flex flex-col font-[var(--font-inter)] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
