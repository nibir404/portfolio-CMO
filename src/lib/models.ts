import { getDb } from "./mongodb";
import { ObjectId, type WithId, type Document, type Collection } from "mongodb";

// Collection names
export const COLLECTIONS = {
  SITE_SETTINGS: "site_settings",
  PROFILE: "profile",
  EDITORIAL: "editorial",
  SERVICES: "services",
  WORK: "work",
  INSIGHTS: "insights",
  SPEAKING: "speaking",
  PRESS: "press",
  RECOGNITION: "recognition",
  EDUCATION: "education",
  PRINCIPLES: "principles",
  NAVIGATION: "navigation",
  NEWSLETTER: "newsletter",
  PLAYBOOK: "playbook",
  ADMIN_USERS: "admin_users",
  ARTICLES: "articles",
  CATEGORIES: "categories",
  COMMENTS: "comments",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

// Blog/News interfaces
export interface ArticleData {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Tiptap HTML
  coverImage: string;
  category: string; // ID of category
  tags: string[];
  styling?: {
    bgColor?: string;
    accentColor?: string;
    coverStyle?: "standard" | "full" | "minimal";
  };
  status: "draft" | "published";
  views: number;
  publishedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryData {
  _id?: ObjectId;
  name: string;
  slug: string;
  description: string;
}

// ── Generic CRUD helpers ──

async function getCollection(name: string): Promise<Collection> {
  const db = await getDb();
  return db.collection(name);
}

export async function findAll<T extends Document>(collectionName: string): Promise<WithId<T>[]> {
  const col = await getCollection(collectionName);
  return col.find({}).toArray() as Promise<WithId<T>[]>;
}

export async function findOne<T extends Document>(
  collectionName: string,
  filter: Record<string, unknown>
): Promise<WithId<T> | null> {
  const col = await getCollection(collectionName);
  return col.findOne(filter) as Promise<WithId<T> | null>;
}

export async function findById<T extends Document>(
  collectionName: string,
  id: string
): Promise<WithId<T> | null> {
  const col = await getCollection(collectionName);
  return col.findOne({ _id: new ObjectId(id) }) as Promise<WithId<T> | null>;
}

export async function insertOne(collectionName: string, data: Record<string, unknown>) {
  const col = await getCollection(collectionName);
  const result = await col.insertOne({ ...data, createdAt: new Date(), updatedAt: new Date() });
  return result.insertedId;
}

export async function updateOne(
  collectionName: string,
  id: string,
  data: Record<string, unknown>
) {
  const col = await getCollection(collectionName);
  // Remove _id from update data if present
  const { _id, ...updateData } = data;
  void _id;
  const result = await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updateData, updatedAt: new Date() } }
  );
  return result.modifiedCount > 0;
}

export async function deleteOne(collectionName: string, id: string) {
  const col = await getCollection(collectionName);
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

// ── Singleton document helpers (for collections like site_settings, profile, editorial) ──

export async function getSingleton<T extends Document>(collectionName: string): Promise<T | null> {
  const col = await getCollection(collectionName);
  return col.findOne({}) as Promise<T | null>;
}

export async function upsertSingleton(
  collectionName: string,
  data: Record<string, unknown>
) {
  const col = await getCollection(collectionName);
  const { _id, createdAt, ...updateData } = data;
  void _id;
  void createdAt;
  const result = await col.updateOne(
    {},
    { $set: { ...updateData, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );
  return result.upsertedId || result.modifiedCount > 0;
}
