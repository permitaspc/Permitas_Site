import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Import the Reader API and Components
import { reader } from "@/app/lib/keystatic";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/global/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Permitas",
    default: "Permitas | Architect Portfolio",
  },
  description: "Modern architecture portfolio and design studio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 2. Fetch Global Settings from CMS
  // This runs on the server at build time (or request time depending on config)
  const settings = await reader.singletons.settings.read();

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SmoothScroll>
          {/* 3. Pass CMS data to Header */}
          <Header
            siteTitle={settings?.siteTitle || undefined}
            navItems={settings?.navigation || undefined}
          />

          {/* Main Content Area - Grows to fill space */}
          <main className="flex-grow">{children}</main>

          {/* 4. Pass CMS data to Footer */}
          <Footer
            contactEmail={settings?.contactEmail || undefined}
            contactPhone={settings?.contactPhone || undefined}
            socialInstagram={settings?.socialInstagram || undefined}
            socialLinkedIn={settings?.socialLinkedIn || undefined}
            footerText={settings?.footerText || undefined}
            siteTitle={settings?.siteTitle || undefined}
          />
        </SmoothScroll>
        <LoadingScreen />
      </body>
    </html>
  );
}
