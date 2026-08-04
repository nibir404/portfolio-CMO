import { describe, expect, it } from "vitest";
import { insightCategories, routes } from "@/lib/routes";
import {
  getAdjacentWork,
  getAllIndexableRoutes,
  getAllInsights,
  getAllServices,
  getAllSpeakingTopics,
  getAllWork,
  getFeaturedInsights,
  getFeaturedWork,
  getInsightBySlug,
  getInsightsByCategory,
  getProfile,
  getRecognition,
  getRecognitionSummary,
  getRelatedInsights,
  getRelatedServices,
  getRelatedWork,
  getServiceBySlug,
  getSite,
  getSpeakingTopicBySlug,
  getWorkBySlug,
  isInsightCategory,
} from "@/lib/content";

describe("services", () => {
  it("exposes every service", () => {
    expect(getAllServices().length).toBeGreaterThan(0);
  });

  it("looks services up by slug", () => {
    const slug = getAllServices()[0].slug;
    expect(getServiceBySlug(slug)?.slug).toBe(slug);
    expect(getServiceBySlug("missing-service")).toBeUndefined();
  });
});

describe("work", () => {
  it("orders case studies by chapter", () => {
    const chapters = getAllWork().map((item) => item.chapter);
    expect(chapters).toEqual([...chapters].sort((a, b) => a.localeCompare(b)));
  });

  it("does not mutate the underlying collection when sorting", () => {
    const first = getAllWork();
    expect(getAllWork()).toEqual(first);
  });

  it("looks case studies up by slug", () => {
    const slug = getAllWork()[0].slug;
    expect(getWorkBySlug(slug)?.slug).toBe(slug);
    expect(getWorkBySlug("missing-case-study")).toBeUndefined();
  });

  it("features the first three case studies", () => {
    expect(getFeaturedWork()).toEqual(getAllWork().slice(0, 3));
    expect(getFeaturedWork().length).toBeLessThanOrEqual(3);
  });
});

describe("getAdjacentWork", () => {
  const ordered = getAllWork();

  it("returns the neighbours of a middle case study", () => {
    const { prev, next } = getAdjacentWork(ordered[1].slug);
    expect(prev?.slug).toBe(ordered[0].slug);
    expect(next?.slug).toBe(ordered[2].slug);
  });

  it("wraps around at both ends", () => {
    const first = getAdjacentWork(ordered[0].slug);
    expect(first.prev?.slug).toBe(ordered[ordered.length - 1].slug);
    expect(first.next?.slug).toBe(ordered[1].slug);

    const last = getAdjacentWork(ordered[ordered.length - 1].slug);
    expect(last.prev?.slug).toBe(ordered[ordered.length - 2].slug);
    expect(last.next?.slug).toBe(ordered[0].slug);
  });

  it("returns nothing for an unknown slug", () => {
    expect(getAdjacentWork("missing-case-study")).toEqual({});
  });
});

describe("insights", () => {
  it("orders insights newest first", () => {
    const dates = getAllInsights().map((item) => item.publishedAt);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });

  it("looks insights up by slug", () => {
    const slug = getAllInsights()[0].slug;
    expect(getInsightBySlug(slug)?.slug).toBe(slug);
    expect(getInsightBySlug("missing-insight")).toBeUndefined();
  });

  it("puts the featured insight first without duplicating it", () => {
    const featured = getFeaturedInsights();
    const all = getAllInsights();
    expect(featured[0].featured).toBe(true);
    expect(featured).toHaveLength(all.length);
    expect(new Set(featured.map((item) => item.slug)).size).toBe(all.length);
  });

  it("filters by category", () => {
    const category = getAllInsights()[0].category;
    const filtered = getInsightsByCategory(category);
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((item) => item.category === category)).toBe(true);
  });

  it("recognises known insight categories", () => {
    expect(isInsightCategory(insightCategories[0])).toBe(true);
    expect(isInsightCategory("not-a-category")).toBe(false);
  });
});

describe("related content", () => {
  it("returns an empty list when no slugs are given", () => {
    expect(getRelatedInsights([])).toEqual([]);
    expect(getRelatedWork([])).toEqual([]);
    expect(getRelatedServices([])).toEqual([]);
  });

  it("resolves known slugs and drops unknown ones", () => {
    const insightSlug = getAllInsights()[0].slug;
    const workSlug = getAllWork()[0].slug;
    const serviceSlug = getAllServices()[0].slug;

    expect(getRelatedInsights([insightSlug, "missing"]).map((i) => i.slug)).toEqual([insightSlug]);
    expect(getRelatedWork([workSlug, "missing"]).map((i) => i.slug)).toEqual([workSlug]);
    expect(getRelatedServices([serviceSlug, "missing"]).map((i) => i.slug)).toEqual([serviceSlug]);
  });
});

describe("speaking, recognition, and site data", () => {
  it("looks speaking topics up by slug", () => {
    const topics = getAllSpeakingTopics();
    expect(topics.length).toBeGreaterThan(0);
    expect(getSpeakingTopicBySlug(topics[0].slug)?.slug).toBe(topics[0].slug);
    expect(getSpeakingTopicBySlug("missing-topic")).toBeUndefined();
  });

  it("exposes recognition, site, and profile records", () => {
    expect(getRecognition().length).toBeGreaterThan(0);
    expect(getRecognitionSummary()).toBeDefined();
    expect(getSite().origin).toMatch(/^https:\/\//);
    expect(getProfile().name.length).toBeGreaterThan(0);
  });
});

describe("getAllIndexableRoutes", () => {
  const all = getAllIndexableRoutes();

  it("includes every static route", () => {
    const paths = all.map((entry) => entry.path);
    for (const path of [routes.home, routes.about, routes.work, routes.services, routes.contact]) {
      expect(paths).toContain(path);
    }
  });

  it("includes a route per work, service, insight, and category", () => {
    const paths = all.map((entry) => entry.path);
    expect(paths).toContain(`/work/${getAllWork()[0].slug}`);
    expect(paths).toContain(`/services/${getAllServices()[0].slug}`);
    expect(paths).toContain(`/insights/${getAllInsights()[0].slug}`);
    expect(paths).toContain(`/insights/category/${insightCategories[0]}`);
  });

  it("has unique paths and priorities within range", () => {
    const paths = all.map((entry) => entry.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const entry of all) {
      expect(entry.priority).toBeGreaterThan(0);
      expect(entry.priority).toBeLessThanOrEqual(1);
    }
  });
});
