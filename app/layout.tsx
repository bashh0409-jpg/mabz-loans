import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";
import Cookies from "./components/Cookies";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mabz Loans | Fast Personal Finance",
  description: "Affordable loan solutions for employed and SASSA beneficiaries.",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Mabz Loans",
    title: "Mabz Loans | Fast Personal Finance",
    description: "Affordable loan solutions for employed and SASSA beneficiaries.",
    images: [
      {
        url: "/share-preview.jpg",
        width: 1179,
        height: 688,
        alt: "Mabz Loans - your bridge to better finances",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mabz Loans | Fast Personal Finance",
    description: "Affordable loan solutions for employed and SASSA beneficiaries.",
    images: [
      {
        url: "/share-preview.jpg",
        alt: "Mabz Loans - your bridge to better finances",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <Cookies />
        {children}
      </body>
    </html>
  );
}
