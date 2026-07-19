import type { Metadata, Viewport } from "next";
import { Anton, Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

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
  title: "Abdullah Al Alamin | Chief Marketing Officer, Betopia Group",
  description:
    "Abdullah Al Alamin is the Chief Marketing Officer of Betopia Group and a doctoral AI researcher at Carnegie Mellon. He builds category-defining brands, leads AI-powered marketing transformation, and advises boards on growth strategy.",
  keywords: [
    "Abdullah Al Alamin",
    "Chief Marketing Officer Betopia Group",
    "Group CMO Bangladesh",
    "AI marketing strategist",
    "brand architect Bangladesh",
    "AI-driven growth strategist",
    "executive brand advisor",
    "marketing transformation leader",
  ],
  authors: [{ name: "Abdullah Al Alamin" }],
  openGraph: {
    title: "Abdullah Al Alamin | Chief Marketing Officer, Betopia Group",
    description:
      "The personal headquarters of Abdullah Al Alamin — Group CMO of Betopia Group and doctoral AI researcher at Carnegie Mellon. Strategic thinking, business transformations, and AI-powered marketing leadership.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Al Alamin | Chief Marketing Officer, Betopia Group",
    description:
      "Group CMO of Betopia Group. Doctoral AI researcher at Carnegie Mellon. Building category-defining brands with AI-powered marketing strategy.",
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
  ],
  award: [
    "Global Brand Leadership Award — World Brand Congress (2024)",
    "Asia Pacific Marketing Excellence Award — Asia Marketing Federation (2023)",
    "International Corporate Communication Excellence Award — IABC (2022)",
    "Digital Bangladesh Innovation Award — ICT Division, Government of Bangladesh (2023)",
    "National Marketing Excellence Award — Ministry of Commerce, Government of Bangladesh (2022)",
  ],
  description:
    "Chief Marketing Officer of Betopia Group and doctoral AI researcher at Carnegie Mellon. Fourteen years building category-defining brands with AI-powered marketing strategy.",
  url: "https://abdullahalamin.me",
  sameAs: [
    "https://www.linkedin.com/in/abdullah-al-alamin",
    "https://x.com/abdullah_alamin",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark"
      className={`${anton.variable} ${inter.variable} ${cormorant.variable} ${jetbrains.variable}`}
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