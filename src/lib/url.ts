import { site } from "@/content/site";

/** Resolves a site-relative path against the canonical origin; absolute URLs pass through. */
export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  return `${site.origin}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}
