import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";

export const metadata: Metadata = {
  title: "Abdullah Al Amin — Visionary Entrepreneur & Ecosystem Builder",
  description:
    "A digital monument to a visionary entrepreneur, ecosystem builder, and transformation leader. Legacy is Greater Than Currency.",
  keywords: [
    "Abdullah Al Amin",
    "Visionary Entrepreneur",
    "Digital Transformation Leader",
    "Ecosystem Builder",
    "Bangladesh",
    "Leadership",
    "Legacy",
  ],
  authors: [{ name: "Abdullah Al Amin" }],
  openGraph: {
    title: "Abdullah Al Amin — Legacy is Greater Than Currency",
    description:
      "Building companies, empowering people, and shaping the future through innovation.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#F5F1E8" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <Grain />
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}