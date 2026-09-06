import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { getSite } from "@/lib/content";
import { buildMetadataBase } from "@/lib/metadata";
import { personSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileContactCta } from "@/components/layout/MobileContactCta";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeSync } from "@/components/layout/ThemeSync";
import { RevealInit } from "@/components/motion/RevealInit";
import { HideOnAdmin } from "@/components/layout/HideOnAdmin";
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
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const base = await buildMetadataBase();
  return {
    ...base,
    authors: [{ name: site.name, url: site.origin }],
    creator: site.name,
    publisher: site.name,
    openGraph: {
      ...base.openGraph,
      url: site.origin,
    },
    twitter: {
      ...base.twitter,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [personData, websiteData, site] = await Promise.all([
    personSchema(),
    websiteSchema(),
    getSite(),
  ]);

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
        <JsonLd data={personData} />
        <JsonLd data={websiteData} />
        <HideOnAdmin>
          <SiteHeader officeEmail={site.officeEmail} speakingEmail={site.speakingEmail} />
        </HideOnAdmin>
        <main id="main">{children}</main>
        <HideOnAdmin>
          <SiteFooter />
          <MobileContactCta />
        </HideOnAdmin>
        <ThemeSync />
        <RevealInit />
      </body>
    </html>
  );
}
