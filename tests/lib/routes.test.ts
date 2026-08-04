import { describe, expect, it } from "vitest";
import {
  insightCategories,
  insightCategoryDescriptions,
  insightCategoryLabels,
  routes,
} from "@/lib/routes";

describe("routes", () => {
  it("declares page paths with a leading slash", () => {
    const pagePaths = Object.entries(routes)
      .filter(([key]) => key !== "sitemap" && key !== "robots")
      .map(([, path]) => path);

    for (const path of pagePaths) {
      expect(path.startsWith("/")).toBe(true);
    }
    expect(routes.home).toBe("/");
    expect(routes.sitemap).toBe("/sitemap.xml");
    expect(routes.robots).toBe("/robots.txt");
  });

  it("has no duplicate paths", () => {
    const paths = Object.values(routes);
    expect(new Set(paths).size).toBe(paths.length);
  });
});

describe("insight categories", () => {
  it("labels and describes every category", () => {
    for (const category of insightCategories) {
      expect(insightCategoryLabels[category]).toBeTruthy();
      expect(insightCategoryDescriptions[category]).toBeTruthy();
    }
  });

  it("uses lowercase hyphenated slugs", () => {
    for (const category of insightCategories) {
      expect(category).toMatch(/^[a-z]+(-[a-z]+)*$/);
    }
  });

  it("has no label or description keys beyond the declared categories", () => {
    expect(Object.keys(insightCategoryLabels).sort()).toEqual([...insightCategories].sort());
    expect(Object.keys(insightCategoryDescriptions).sort()).toEqual([...insightCategories].sort());
  });
});
