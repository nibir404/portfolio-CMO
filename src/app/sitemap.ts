import type { MetadataRoute } from "next";
import { getAllIndexableRoutes } from "@/lib/content";
import { absoluteUrl } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getAllIndexableRoutes();
  return routes.map((entry) => ({
    url: absoluteUrl(entry.path),
    changeFrequency: "monthly",
    priority: entry.priority,
  }));
}
