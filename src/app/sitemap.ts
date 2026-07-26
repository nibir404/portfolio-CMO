import type { MetadataRoute } from "next";
import { getAllIndexableRoutes } from "@/lib/content";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getAllIndexableRoutes();
  return routes.map((entry) => ({
    url: `${site.origin}${entry.path}`,
    changeFrequency: "monthly",
    priority: entry.priority,
  }));
}
