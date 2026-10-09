import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
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
  title: "Ákos Kappel | Portfolio",
  description: "Full-Stack Software Developer Portfolio of Ákos Kappel",
  authors: [{ name: "Ákos Kappel" }],
  keywords: [
    "Ákos Kappel",
    "Software Engineer",
    "Full Stack Developer",
    "Portfolio",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Artificial Intelligence",
  ],
  openGraph: {
    title: "Ákos Kappel | Portfolio",
    description: "Full-Stack Software Developer Portfolio of Ákos Kappel",
    siteName: "Portfolio Website",
    type: "website",
    locale: "en_US",
  },
};

export const viewport = "width=device-width, initial-scale=1.0";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-b from-gray-900 via-gray-700 to-gray-900 text-white`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
