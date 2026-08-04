import { site } from "@/content/site";
import { profile } from "@/content/profile";
import { recognitionSummary } from "@/content/recognition";
import { absoluteUrl } from "@/lib/url";
import type {
  FaqEntry,
  Insight,
  Service,
  WorkCaseStudy,
} from "@/types/content";

export type JsonLdObject = Record<string, unknown>;

export function personSchema(): JsonLdObject {
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

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.origin,
    inLanguage: "en-GB",
  };
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
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

export function serviceSchema(service: Service): JsonLdObject {
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
    url: absoluteUrl(service.seo.path),
  };
}

export function caseStudySchema(item: WorkCaseStudy): JsonLdObject {
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
    url: absoluteUrl(item.seo.path),
    image: absoluteUrl(item.image),
    datePublished: item.seo.publishedAt ?? "2024-01-01",
  };
}

export function articleSchema(item: Insight): JsonLdObject {
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
    url: absoluteUrl(item.seo.path),
    image: absoluteUrl(item.poster),
    datePublished: item.publishedAt,
    dateModified: item.updatedAt ?? item.publishedAt,
    articleSection: item.category.replace(/-/g, " "),
  };
}

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: profile.worksFor,
    url: site.origin,
    description:
      "A conglomerate of more than thirty companies across consumer goods, technology, and media.",
  };
}

export function blogSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} — Insights`,
    url: absoluteUrl("/insights"),
    inLanguage: "en-GB",
  };
}

// WCAG AAA definitions: APAC = Asia-Pacific, GCC = Gulf Cooperation Council
