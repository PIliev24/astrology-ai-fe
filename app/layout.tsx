import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RouteGuard } from "@/components/auth/route-guard";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Celestial Insights - AI Astrology",
  description: "Discover your cosmic destiny with AI-powered astrology. Get personalized birth chart readings, daily horoscopes, and celestial guidance.",
  keywords: ["astrology", "birth chart", "horoscope", "zodiac", "AI astrology", "natal chart"],
  authors: [{ name: "Celestial Insights" }],
  openGraph: {
    title: "Celestial Insights - AI Astrology",
    description: "Discover your cosmic destiny with AI-powered astrology readings",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cinzel.variable} ${cormorantGaramond.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <RouteGuard>{children}</RouteGuard>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
