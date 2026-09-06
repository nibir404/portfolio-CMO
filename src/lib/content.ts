import { getDb } from "./mongodb";
import { routes, insightCategories } from "@/lib/routes";
import type {
  Insight,
  InsightCategory,
  Service,
  WorkCaseStudy,
  SpeakingTopic,
  RecognitionGroup,
} from "@/types/content";

// ── Fallback imports (used if DB is empty) ──
import { services as staticServices } from "@/content/services";
import { work as staticWork } from "@/content/work";
import { insights as staticInsights } from "@/content/insights";
import { speakingTopics as staticSpeaking, pastStages as staticPastStages } from "@/content/speaking";
import { recognition as staticRecognition } from "@/content/recognition";
import { site as staticSite } from "@/content/site";
import { profile as staticProfile } from "@/content/profile";
import { editorial as staticEditorial } from "@/content/editorial";
import { newsletter as staticNewsletter } from "@/content/newsletter";
import { playbook as staticPlaybook } from "@/content/playbook";
import { pressCoverage as staticPressCoverage, pressKit as staticPressKit, interviewTopics as staticInterviewTopics } from "@/content/press";

// Helper: get collection data with fallback
async function getCollectionData<T>(collectionName: string, fallback: T[]): Promise<T[]> {
  try {
    const db = await getDb();
    const docs = await db.collection(collectionName).find({}).toArray();
    if (docs.length > 0) {
      return docs.map((doc) => {
        const { _id, createdAt, updatedAt, ...rest } = doc;
        void _id; void createdAt; void updatedAt;
        return rest as T;
      });
    }
    return fallback;
  } catch {
    return fallback;
  }
}

async function getSingletonData<T>(collectionName: string, fallback: T): Promise<T> {
  try {
    const db = await getDb();
    const doc = await db.collection(collectionName).findOne({});
    if (doc) {
      const { _id, createdAt, updatedAt, ...rest } = doc;
      void _id; void createdAt; void updatedAt;
      return rest as T;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

// ── Services ──
export async function getAllServices(): Promise<Service[]> {
  return getCollectionData<Service>("services", staticServices);
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const services = await getAllServices();
  return services.find((service) => service.slug === slug);
}

// ── Work ──
export async function getAllWork(): Promise<WorkCaseStudy[]> {
  const work = await getCollectionData<WorkCaseStudy>("work", staticWork);
  return [...work].sort((a, b) => a.chapter.localeCompare(b.chapter));
}

export async function getWorkBySlug(slug: string): Promise<WorkCaseStudy | undefined> {
  const work = await getAllWork();
  return work.find((item) => item.slug === slug);
}

export async function getFeaturedWork(): Promise<WorkCaseStudy[]> {
  const work = await getAllWork();
  return work.slice(0, 3);
}

export async function getAdjacentWork(slug: string): Promise<{
  prev?: WorkCaseStudy;
  next?: WorkCaseStudy;
}> {
  const ordered = await getAllWork();
  const index = ordered.findIndex((item) => item.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? ordered[index - 1] : ordered[ordered.length - 1],
    next: index < ordered.length - 1 ? ordered[index + 1] : ordered[0],
  };
}

// ── Insights ──
export async function getAllInsights(): Promise<Insight[]> {
  const insights = await getCollectionData<Insight>("insights", staticInsights);
  return [...insights].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getInsightBySlug(slug: string): Promise<Insight | undefined> {
  const insights = await getAllInsights();
  return insights.find((item) => item.slug === slug);
}

export async function getFeaturedInsights(): Promise<Insight[]> {
  const insights = await getAllInsights();
  const featured = insights.find((item) => item.featured);
  const rest = insights.filter((item) => !item.featured);
  return [featured, ...rest].filter(Boolean) as Insight[];
}

export async function getInsightsByCategory(category: InsightCategory): Promise<Insight[]> {
  const insights = await getAllInsights();
  return insights.filter((item) => item.category === category);
}

export async function getRelatedInsights(slugs: string[]): Promise<Insight[]> {
  if (!slugs.length) return [];
  const insights = await getAllInsights();
  return slugs
    .map((slug) => insights.find((i) => i.slug === slug))
    .filter((item): item is Insight => Boolean(item));
}

export async function getRelatedWork(slugs: string[]): Promise<WorkCaseStudy[]> {
  if (!slugs.length) return [];
  const work = await getAllWork();
  return slugs
    .map((slug) => work.find((w) => w.slug === slug))
    .filter((item): item is WorkCaseStudy => Boolean(item));
}

export async function getRelatedServices(slugs: string[]): Promise<Service[]> {
  if (!slugs.length) return [];
  const services = await getAllServices();
  return slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((item): item is Service => Boolean(item));
}

export function isInsightCategory(value: string): value is InsightCategory {
  return (insightCategories as readonly string[]).includes(value);
}

// ── Speaking ──
export async function getAllSpeakingTopics(): Promise<SpeakingTopic[]> {
  try {
    const db = await getDb();
    const docs = await db.collection("speaking").find({ $or: [{ type: "topic" }, { type: { $exists: false } }] }).toArray();
    if (docs.length > 0) {
      return docs.map((doc) => {
        const { _id, createdAt, updatedAt, type, ...rest } = doc;
        void _id; void createdAt; void updatedAt; void type;
        return rest as SpeakingTopic;
      });
    }
    return staticSpeaking;
  } catch {
    return staticSpeaking;
  }
}

export async function getSpeakingTopicBySlug(slug: string): Promise<SpeakingTopic | undefined> {
  const topics = await getAllSpeakingTopics();
  return topics.find((topic) => topic.slug === slug);
}

export async function getAllPastStages() {
  try {
    const db = await getDb();
    const docs = await db.collection("speaking").find({ type: "stage" }).toArray();
    if (docs.length > 0) {
      return docs.map((doc) => {
        const { _id, createdAt, updatedAt, type, ...rest } = doc;
        return rest;
      });
    }
    return staticPastStages;
  } catch {
    return staticPastStages;
  }
}

// ── Recognition ──
export async function getRecognition(): Promise<RecognitionGroup[]> {
  return getCollectionData<RecognitionGroup>("recognition", staticRecognition);
}

export async function getRecognitionSummary() {
  const recognition = await getRecognition();
  return {
    total: recognition.reduce((acc, group) => acc + group.items.length, 0),
    international: recognition[0]?.items.length ?? 0,
    government: recognition[1]?.items.length ?? 0,
    industry: recognition[2]?.items.length ?? 0,
  };
}

// ── Singletons ──
export async function getSite() {
  return getSingletonData("site_settings", staticSite);
}

export async function getProfile() {
  return getSingletonData("profile", staticProfile);
}

export async function getEditorial() {
  return getSingletonData("editorial", staticEditorial);
}

export async function getNewsletter() {
  return getSingletonData("newsletter", staticNewsletter);
}

export async function getPlaybook() {
  return getSingletonData("playbook", staticPlaybook);
}

export async function getPressData() {
  try {
    const db = await getDb();
    const docs = await db.collection("press").find({}).toArray();
    if (docs.length > 0) {
      const pressCoverage = docs.filter(d => ["coverage", "feature", "mention", "interview", "appearance"].includes(d.type as string)) as any[];
      // For pressKit and interviewTopics, we fallback to static if not stored in DB, or if stored as separate type
      const pressKit = docs.filter(d => d.type === "kit").length > 0 ? (docs.filter(d => d.type === "kit")[0] as any) : staticPressKit;
      const interviewTopics = docs.filter(d => d.type === "interview_topics").length > 0 ? (docs.filter(d => d.type === "interview_topics")[0].topics as any) : staticInterviewTopics;
      return { pressCoverage, pressKit, interviewTopics };
    }
  } catch {}
  return { pressCoverage: staticPressCoverage, pressKit: staticPressKit, interviewTopics: staticInterviewTopics };
}

// ── Indexable routes (for sitemap) ──
export async function getAllIndexableRoutes(): Promise<Array<{
  path: string;
  lastModified?: string;
  priority?: number;
}>> {
  const [work, services, insights] = await Promise.all([
    getAllWork(),
    getAllServices(),
    getAllInsights(),
  ]);

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
