import { describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { getAllInsights, getAllServices, getAllWork } from "@/lib/content";
import {
  articleSchema,
  blogSchema,
  breadcrumbSchema,
  caseStudySchema,
  faqSchema,
  organizationSchema,
  personSchema,
  serviceSchema,
  websiteSchema,
} from "@/lib/schema";

describe("static schemas", () => {
  it("describes the person", () => {
    const schema = personSchema();
    expect(schema["@type"]).toBe("Person");
    expect(schema.name).toBe(profile.name);
    expect(schema.url).toBe(site.origin);
    expect(schema.sameAs).toEqual(profile.sameAs);
    expect(schema.knowsAbout).toEqual(profile.credentials);
  });

  it("describes the website, organization, and blog", () => {
    expect(websiteSchema()).toMatchObject({
      "@type": "WebSite",
      name: site.name,
      url: site.origin,
      inLanguage: "en-GB",
    });
    expect(organizationSchema()).toMatchObject({
      "@type": "Organization",
      name: profile.worksFor,
      url: site.origin,
    });
    expect(blogSchema()).toMatchObject({
      "@type": "Blog",
      url: `${site.origin}/insights`,
    });
  });

  it("tags every schema with the schema.org context", () => {
    for (const schema of [personSchema(), websiteSchema(), organizationSchema(), blogSchema()]) {
      expect(schema["@context"]).toBe("https://schema.org");
    }
  });
});

describe("breadcrumbSchema", () => {
  it("numbers items from one and absolutises hrefs", () => {
    const schema = breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Work", href: "/work" },
    ]);

    expect(schema.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.origin}/` },
      { "@type": "ListItem", position: 2, name: "Work", item: `${site.origin}/work` },
    ]);
  });

  it("handles an empty trail", () => {
    expect(breadcrumbSchema([]).itemListElement).toEqual([]);
  });
});

describe("faqSchema", () => {
  it("maps entries to Question and Answer nodes", () => {
    const schema = faqSchema([{ question: "How long?", answer: "Ninety days." }]);
    expect(schema.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "How long?",
        acceptedAnswer: { "@type": "Answer", text: "Ninety days." },
      },
    ]);
  });

  it("handles an empty list", () => {
    expect(faqSchema([]).mainEntity).toEqual([]);
  });
});

describe("content schemas", () => {
  it("describes a service", () => {
    const service = getAllServices()[0];
    const schema = serviceSchema(service);

    expect(schema).toMatchObject({
      "@type": "Service",
      name: service.name,
      description: service.shortDescription,
      serviceType: service.keywords.primary,
      url: `${site.origin}${service.seo.path}`,
    });
    expect(schema.areaServed).toContain("Bangladesh");
  });

  it("describes a case study", () => {
    const item = getAllWork()[0];
    const schema = caseStudySchema(item);

    expect(schema).toMatchObject({
      "@type": "Article",
      headline: item.title,
      description: item.summary,
      url: `${site.origin}${item.seo.path}`,
    });
    expect(schema.about).toEqual({ "@type": "Organization", name: item.company });
    expect(schema.image).toBe(
      item.image.startsWith("http") ? item.image : `${site.origin}${item.image}`,
    );
    expect(schema.datePublished).toBeTruthy();
  });

  it("prefixes relative case study images with the origin", () => {
    const item = getAllWork()[0];
    expect(caseStudySchema({ ...item, image: "/images/work.png" }).image).toBe(
      `${site.origin}/images/work.png`,
    );
    expect(caseStudySchema({ ...item, image: "https://cdn.example.com/w.png" }).image).toBe(
      "https://cdn.example.com/w.png",
    );
  });

  it("describes an insight article", () => {
    const item = getAllInsights()[0];
    const schema = articleSchema(item);

    expect(schema).toMatchObject({
      "@type": "Article",
      headline: item.title,
      description: item.description,
      datePublished: item.publishedAt,
      url: `${site.origin}${item.seo.path}`,
    });
    expect(schema.author).toEqual({ "@type": "Person", name: item.author });
    expect(schema.articleSection).toBe(item.category.replace(/-/g, " "));
  });

  it("prefixes relative insight posters with the origin", () => {
    const item = getAllInsights()[0];
    expect(articleSchema({ ...item, poster: "/images/insight.png" }).image).toBe(
      `${site.origin}/images/insight.png`,
    );
    expect(articleSchema({ ...item, poster: "https://cdn.example.com/i.png" }).image).toBe(
      "https://cdn.example.com/i.png",
    );
  });

  it("falls back to publishedAt when an insight has no update date", () => {
    const item = getAllInsights()[0];
    expect(articleSchema({ ...item, updatedAt: undefined }).dateModified).toBe(item.publishedAt);
    expect(articleSchema({ ...item, updatedAt: "2025-01-02" }).dateModified).toBe("2025-01-02");
  });
});
