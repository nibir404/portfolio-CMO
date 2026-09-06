import { NextRequest, NextResponse } from "next/server";
import { getAuthFromCookies } from "@/lib/auth";
import {
  findAll,
  findById,
  insertOne,
  updateOne,
  deleteOne,
  getSingleton,
  upsertSingleton,
  COLLECTIONS,
} from "@/lib/models";

// Singleton collections (only one document)
const SINGLETON_COLLECTIONS = new Set([
  COLLECTIONS.SITE_SETTINGS,
  COLLECTIONS.PROFILE,
  COLLECTIONS.EDITORIAL,
  COLLECTIONS.NAVIGATION,
  COLLECTIONS.NEWSLETTER,
  COLLECTIONS.PLAYBOOK,
]);

type RouteParams = { params: Promise<{ collection: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { collection } = await params;

  // Validate collection name
  const validCollections = Object.values(COLLECTIONS);
  if (!validCollections.includes(collection as typeof validCollections[number])) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  try {
    if (SINGLETON_COLLECTIONS.has(collection as any)) {
      const data = await getSingleton(collection as any);
      return NextResponse.json({ data: data || null });
    }
    const { searchParams } = new URL(_request.url);
    const id = searchParams.get("id");
    if (id) {
      const data = await findById(collection, id);
      return NextResponse.json({ data });
    }
    const data = await findAll(collection);
    return NextResponse.json({ data });
  } catch (error) {
    console.error(`GET ${collection} error:`, error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const admin = await getAuthFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { collection } = await params;
  const validCollections = Object.values(COLLECTIONS);
  if (!validCollections.includes(collection as typeof validCollections[number])) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  try {
    const body = await request.json();

    if (SINGLETON_COLLECTIONS.has(collection as any)) {
      await upsertSingleton(collection as any, body);
      return NextResponse.json({ success: true });
    }

    const id = await insertOne(collection, body);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error(`POST ${collection} error:`, error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const admin = await getAuthFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { collection } = await params;
  const validCollections = Object.values(COLLECTIONS);
  if (!validCollections.includes(collection as typeof validCollections[number])) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  try {
    const body = await request.json();

    if (SINGLETON_COLLECTIONS.has(collection as any)) {
      await upsertSingleton(collection as any, body);
      return NextResponse.json({ success: true });
    }

    const { _id, ...data } = body;
    if (!_id) {
      return NextResponse.json({ error: "ID required for update" }, { status: 400 });
    }
    await updateOne(collection, _id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`PUT ${collection} error:`, error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const admin = await getAuthFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { collection } = await params;
  const validCollections = Object.values(COLLECTIONS);
  if (!validCollections.includes(collection as typeof validCollections[number])) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required for delete" }, { status: 400 });
    }

    const existing = await findById(collection, id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await deleteOne(collection, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`DELETE ${collection} error:`, error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
