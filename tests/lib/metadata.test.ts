import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { buildMetadataBase, buildPageMetadata } from "@/lib/metadata";

describe("buildPageMetadata", () => {
  const base = { title: "Work", description: "Case studies.", path: "/work" };

  it("builds canonical, Open Graph, and Twitter metadata", () => {
    const meta = buildPageMetadata(base);

    expect(meta.alternates?.canonical).toBe(`${site.origin}/work`);
    expect(meta.openGraph).toMatchObject({
      title: "Work",
      description: "Case studies.",
      url: `${site.origin}/work`,
      type: "website",
      siteName: site.name,
      locale: site.locale,
    });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", title: "Work" });
  });

  it("normalises paths without a leading slash", () => {
    expect(buildPageMetadata({ ...base, path: "work" }).alternates?.canonical).toBe(
      `${site.origin}/work`,
    );
  });

  it("defaults to the site Open Graph image", () => {
    const meta = buildPageMetadata(base);
    expect(meta.openGraph?.images).toEqual([{ url: `${site.origin}/images/og-default.png` }]);
    expect(meta.twitter?.images).toEqual([`${site.origin}/images/og-default.png`]);
  });

  it("prefixes relative images with the origin and leaves absolute ones alone", () => {
    const relative = buildPageMetadata({ ...base, image: "/images/work.png" });
    expect(relative.openGraph?.images).toEqual([{ url: `${site.origin}/images/work.png` }]);

    const absolute = buildPageMetadata({ ...base, image: "https://cdn.example.com/og.png" });
    expect(absolute.openGraph?.images).toEqual([{ url: "https://cdn.example.com/og.png" }]);
    expect(absolute.twitter?.images).toEqual(["https://cdn.example.com/og.png"]);
  });

  it("adds article timestamps only when supplied", () => {
    expect(buildPageMetadata(base).openGraph).not.toHaveProperty("publishedTime");

    const article = buildPageMetadata({
      ...base,
      type: "article",
      publishedAt: "2024-09-12",
      updatedAt: "2024-10-01",
    });
    expect(article.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2024-09-12",
      modifiedTime: "2024-10-01",
    });
  });

  it("switches robots directives when noIndex is set", () => {
    expect(buildPageMetadata(base).robots).toEqual({ index: true, follow: true });
    expect(buildPageMetadata({ ...base, noIndex: true }).robots).toEqual({
      index: false,
      follow: false,
    });
  });
});

describe("buildMetadataBase", () => {
  it("sets the metadata base URL and title template", () => {
    const meta = buildMetadataBase();

    expect(meta.metadataBase?.origin).toBe(new URL(site.origin).origin);
    expect(meta.title).toEqual({
      default: `${site.name} — ${site.description.split(".")[0]}`,
      template: `%s · ${site.name}`,
    });
    expect(meta.description).toBe(site.description);
    expect(meta.openGraph).toMatchObject({ siteName: site.name, locale: site.locale });
  });
});
