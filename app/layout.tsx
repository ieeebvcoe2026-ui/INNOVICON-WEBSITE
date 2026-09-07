import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { CustomCursor, ScrollProgress } from "@/components/chrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://innovicon.ieeebvcoe.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "INNOVICON 4.0 — Hardware × Software Expo | IEEE BVCOE New Delhi",
    template: "%s — Innovicon 4.0",
  },
  description:
    "INNOVICON 4.0 by IEEE BVCOE New Delhi — a two-day Hardware × Software Expo built on the 17 UN Sustainable Development Goals. 06 & 07 October 2026.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "INNOVICON 4.0 — Hardware × Software Expo",
    description: "17 goals. Countless ideas. One impact. 06 & 07 October 2026, BVCOE New Delhi.",
    url: SITE_URL,
    siteName: "Innovicon 4.0",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INNOVICON 4.0 — Hardware × Software Expo",
    description: "17 goals. Countless ideas. One impact. 06 & 07 October 2026, BVCOE New Delhi.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
        <ScrollProgress />
        <CustomCursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
