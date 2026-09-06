import type { MetadataRoute } from "next";
import { getAllIndexableRoutes, getSite } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [routes, site] = await Promise.all([
    getAllIndexableRoutes(),
    getSite(),
  ]);
  return routes.map((entry) => ({
    url: `${site.origin}${entry.path}`,
    changeFrequency: "monthly",
    priority: entry.priority,
  }));
}
