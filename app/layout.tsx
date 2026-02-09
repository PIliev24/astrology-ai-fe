import type { Metadata } from "next";
import { Cinzel, Lora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RouteGuard } from "@/components/auth/route-guard";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aistrology - AI-Powered Astrology",
  description:
    "Discover your cosmic destiny with AI-powered astrology. Get personalized birth chart readings, daily horoscopes, and celestial guidance.",
  keywords: ["astrology", "birth chart", "horoscope", "zodiac", "AI astrology", "natal chart", "aistrology"],
  authors: [{ name: "Aistrology" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Aistrology - AI-Powered Astrology",
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
      <body className={`${cinzel.variable} ${lora.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <RouteGuard>{children}</RouteGuard>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
