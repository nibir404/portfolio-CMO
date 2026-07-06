import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--font-quote",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdullah Al Alamin | CMO, Betopia Group & AI Researcher",
  description:
    "Abdullah Al Alamin is CMO of Betopia Group and a doctoral AI researcher at Carnegie Mellon. 14+ years building category-defining brands with AI-powered growth.",
  keywords: [
    "Abdullah Al Alamin",
    "Chief Marketing Officer Bangladesh",
    "AI marketing strategist Bangladesh",
    "CMO Betopia Group",
    "brand architect Bangladesh",
    "AI-driven growth strategist",
  ],
  authors: [{ name: "Abdullah Al Alamin" }],
  openGraph: {
    title: "Abdullah Al Alamin | CMO, Betopia Group & AI Researcher",
    description:
      "CMO of Betopia Group and doctoral AI researcher at Carnegie Mellon. 14+ years building category-defining brands with AI-powered growth.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Al Alamin | CMO, Betopia Group & AI Researcher",
    description:
      "CMO of Betopia Group and doctoral AI researcher at Carnegie Mellon. 14+ years building category-defining brands with AI-powered growth.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdullah Al Alamin",
  jobTitle: "Chief Marketing Officer",
  worksFor: {
    "@type": "Organization",
    name: "Betopia Group",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Carnegie Mellon University",
    },
    {
      "@type": "EducationalOrganization",
      name: "University of Illinois Urbana-Champaign — Gies College of Business",
    },
    {
      "@type": "EducationalOrganization",
      name: "Daffodil Institute of IT (DIIT)",
    },
  ],
  award: [
    "Global Brand Leadership Award — World Brand Congress (2024)",
    "Asia Pacific Marketing Excellence Award — Asia Marketing Federation (2023)",
    "International Corporate Communication Excellence Award — IABC (2022)",
    "Digital Bangladesh Innovation Award — ICT Division, Government of Bangladesh (2023)",
    "National Marketing Excellence Award — Ministry of Commerce, Government of Bangladesh (2022)",
    "Outstanding Brand Builder Award — FMCG & Consumer Goods Marketing Summit (2021)",
  ],
  description:
    "Bangladesh-based Chief Marketing Officer and doctoral AI researcher at Carnegie Mellon, building category-defining brands with AI-powered growth.",
  url: "https://abdullah-al-alamin.vercel.app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark"
      className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}