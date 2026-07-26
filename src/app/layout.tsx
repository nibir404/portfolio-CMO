import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/content/site";
import { buildMetadataBase } from "@/lib/metadata";
import { personSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileContactCta } from "@/components/layout/MobileContactCta";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeSync } from "@/components/layout/ThemeSync";
import { RevealInit } from "@/components/motion/RevealInit";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  ...buildMetadataBase(),
  authors: [{ name: site.name, url: site.origin }],
  creator: site.name,
  publisher: site.name,
  openGraph: {
    ...buildMetadataBase().openGraph,
    url: site.origin,
  },
  twitter: {
    ...buildMetadataBase().twitter,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(p?'dark':'light');document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();document.documentElement.classList.add('js');",
          }}
        />
      </head>
      <body>
        <SkipLink href="#main" />
        <JsonLd data={personSchema()} />
        <JsonLd data={websiteSchema()} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileContactCta />
        <ThemeSync />
        <RevealInit />
      </body>
    </html>
  );
}
