import { MongoClient, Db } from "mongodb";

const DB_NAME = process.env.DB_NAME || "abdullah_db";

interface MongoCache {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

// Use global to preserve connection across hot reloads in dev
const globalWithMongo = globalThis as typeof globalThis & {
  _mongoCache?: MongoCache;
};

if (!globalWithMongo._mongoCache) {
  globalWithMongo._mongoCache = { client: null, promise: null };
}

const cached = globalWithMongo._mongoCache;

export async function getMongoClient(): Promise<MongoClient> {
  if (cached.client) return cached.client;

  const MONGODB_URL = process.env["MONGODB_URL"] || "";
  if (!MONGODB_URL) {
    throw new Error("Please define the MONGODB_URL environment variable");
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(MONGODB_URL);
  }

  cached.client = await cached.promise;
  return cached.client;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(DB_NAME);
}
