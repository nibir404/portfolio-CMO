import { getSite, getProfile, getRecognitionSummary } from "./content";
import type {
  FaqEntry,
  Insight,
  Service,
  WorkCaseStudy,
} from "@/types/content";

export type JsonLdObject = Record<string, unknown>;

export async function personSchema(): Promise<JsonLdObject> {
  const site = await getSite();
  const profile = await getProfile();
  const recognitionSummary = await getRecognitionSummary();
  const credentials = profile.credentials.map((name) => name);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: profile.worksFor,
    },
    description: profile.shortBio,
    url: site.origin,
    sameAs: profile.sameAs,
    knowsAbout: credentials,
    award: recognitionSummary.total
      ? `${recognitionSummary.total} industry awards across international, government, and industry categories.`
      : undefined,
  };
}

export async function websiteSchema(): Promise<JsonLdObject> {
  const site = await getSite();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.origin,
    inLanguage: "en-GB",
  };
}

export async function breadcrumbSchema(items: Array<{ name: string; href: string }>): Promise<JsonLdObject> {
  const site = await getSite();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.origin}${item.href}`,
    })),
  };
}

export function faqSchema(faqs: FaqEntry[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export async function serviceSchema(service: Service): Promise<JsonLdObject> {
  const site = await getSite();
  const profile = await getProfile();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    provider: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.jobTitle,
      worksFor: { "@type": "Organization", name: profile.worksFor },
    },
    areaServed: ["Bangladesh", "South Asia", "APAC", "GCC"],
    serviceType: service.keywords.primary,
    url: `${site.origin}${service.seo.path}`,
  };
}

export async function caseStudySchema(item: WorkCaseStudy): Promise<JsonLdObject> {
  const site = await getSite();
  const profile = await getProfile();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.summary,
    author: {
      "@type": "Person",
      name: profile.name,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
    },
    about: {
      "@type": "Organization",
      name: item.company,
    },
    keywords: item.keywords.primary,
    url: `${site.origin}${item.seo.path}`,
    image: item.image.startsWith("http")
      ? item.image
      : `${site.origin}${item.image}`,
    datePublished: item.seo.publishedAt ?? "2024-01-01",
  };
}

export async function articleSchema(item: Insight): Promise<JsonLdObject> {
  const site = await getSite();
  const profile = await getProfile();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.description,
    author: {
      "@type": "Person",
      name: item.author,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
    },
    keywords: item.keywords.primary,
    url: `${site.origin}${item.seo.path}`,
    image: item.poster.startsWith("http")
      ? item.poster
      : `${site.origin}${item.poster}`,
    datePublished: item.publishedAt,
    dateModified: item.updatedAt ?? item.publishedAt,
    articleSection: item.category.replace(/-/g, " "),
  };
}

export async function organizationSchema(): Promise<JsonLdObject> {
  const site = await getSite();
  const profile = await getProfile();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: profile.worksFor,
    url: site.origin,
    description:
      "A conglomerate of more than thirty companies across consumer goods, technology, and media.",
  };
}

export async function blogSchema(): Promise<JsonLdObject> {
  const site = await getSite();
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} — Insights`,
    url: `${site.origin}/insights`,
    inLanguage: "en-GB",
  };
}

// WCAG AAA definitions: APAC = Asia-Pacific, GCC = Gulf Cooperation Council
