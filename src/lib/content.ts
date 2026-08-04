import { insights } from "@/content/insights";
import { services } from "@/content/services";
import { work } from "@/content/work";
import { speakingTopics } from "@/content/speaking";
import { recognition } from "@/content/recognition";
import { routes, insightCategories } from "@/lib/routes";
import { reportWarning } from "@/lib/logging";
import { site } from "@/content/site";
import { profile } from "@/content/profile";
import { recognitionSummary } from "@/content/recognition";
import type {
  Insight,
  InsightCategory,
  Service,
  WorkCaseStudy,
  SpeakingTopic,
  RecognitionGroup,
} from "@/types/content";

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllWork(): WorkCaseStudy[] {
  return [...work].sort((a, b) => a.chapter.localeCompare(b.chapter));
}

export function getWorkBySlug(slug: string): WorkCaseStudy | undefined {
  return work.find((item) => item.slug === slug);
}

export function getFeaturedWork(): WorkCaseStudy[] {
  return getAllWork().slice(0, 3);
}

export function getAdjacentWork(slug: string): {
  prev?: WorkCaseStudy;
  next?: WorkCaseStudy;
} {
  const ordered = getAllWork();
  const index = ordered.findIndex((item) => item.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? ordered[index - 1] : ordered[ordered.length - 1],
    next: index < ordered.length - 1 ? ordered[index + 1] : ordered[0],
  };
}

export function getAllInsights(): Insight[] {
  return [...insights].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((item) => item.slug === slug);
}

export function getFeaturedInsights(): Insight[] {
  const featured = insights.find((item) => item.featured);
  const rest = getAllInsights().filter((item) => !item.featured);
  return [featured, ...rest].filter(Boolean) as Insight[];
}

export function getInsightsByCategory(category: InsightCategory): Insight[] {
  return getAllInsights().filter((item) => item.category === category);
}

export function getRelatedInsights(slugs: string[]): Insight[] {
  return resolveSlugs(slugs, getInsightBySlug, "insight");
}

export function getRelatedWork(slugs: string[]): WorkCaseStudy[] {
  return resolveSlugs(slugs, getWorkBySlug, "work");
}

export function getRelatedServices(slugs: string[]): Service[] {
  return resolveSlugs(slugs, getServiceBySlug, "service");
}

function resolveSlugs<T>(
  slugs: string[],
  lookup: (slug: string) => T | undefined,
  collection: string,
): T[] {
  if (!slugs?.length) return [];
  const resolved: T[] = [];
  for (const slug of slugs) {
    const item = lookup(slug);
    if (item) {
      resolved.push(item);
      continue;
    }
    reportWarning("content", "Related entry references an unknown slug.", { collection, slug });
  }
  return resolved;
}

export function isInsightCategory(value: string): value is InsightCategory {
  return (insightCategories as readonly string[]).includes(value);
}

export function getAllSpeakingTopics(): SpeakingTopic[] {
  return speakingTopics;
}

export function getSpeakingTopicBySlug(slug: string): SpeakingTopic | undefined {
  return speakingTopics.find((topic) => topic.slug === slug);
}

export function getRecognition(): RecognitionGroup[] {
  return recognition;
}

export function getRecognitionSummary() {
  return recognitionSummary;
}

export function getSite() {
  return site;
}

export function getProfile() {
  return profile;
}

export function getAllIndexableRoutes(): Array<{
  path: string;
  lastModified?: string;
  priority?: number;
}> {
  const staticRoutes: Array<{ path: string; priority: number }> = [
    { path: routes.home, priority: 1 },
    { path: routes.about, priority: 0.9 },
    { path: routes.work, priority: 0.9 },
    { path: routes.services, priority: 0.9 },
    { path: routes.insights, priority: 0.8 },
    { path: routes.speaking, priority: 0.7 },
    { path: routes.recognition, priority: 0.5 },
    { path: routes.press, priority: 0.5 },
    { path: routes.playbook, priority: 0.7 },
    { path: routes.contact, priority: 0.9 },
    { path: routes.newsletter, priority: 0.4 },
  ];

  const workRoutes = work.map((item) => ({ path: `/work/${item.slug}`, priority: 0.8 }));
  const serviceRoutes = services.map((item) => ({ path: `/services/${item.slug}`, priority: 0.8 }));
  const insightRoutes = insights.map((item) => ({ path: `/insights/${item.slug}`, priority: 0.6 }));
  const categoryRoutes = insightCategories.map((category) => ({
    path: `/insights/category/${category}`,
    priority: 0.6,
  }));

  return [...staticRoutes, ...workRoutes, ...serviceRoutes, ...insightRoutes, ...categoryRoutes];
}
