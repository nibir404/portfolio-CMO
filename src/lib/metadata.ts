import type { Metadata } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import type { MetadataInput } from "@/types/seo";

export type { MetadataInput };

const DEFAULT_OG = "/images/og-default.png";

export function buildPageMetadata(input: MetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const image = absoluteUrl(input.image ?? DEFAULT_OG);

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      type: input.type ?? "website",
      siteName: site.name,
      locale: site.locale,
      images: [{ url: image }],
      ...(input.publishedAt ? { publishedTime: input.publishedAt } : {}),
      ...(input.updatedAt ? { modifiedTime: input.updatedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function buildMetadataBase(): Metadata {
  return {
    metadataBase: new URL(site.origin),
    title: {
      default: `${site.name} — ${site.description.split(".")[0]}`,
      template: `%s · ${site.name}`,
    },
    description: site.description,
    openGraph: {
      siteName: site.name,
      type: "website",
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}
