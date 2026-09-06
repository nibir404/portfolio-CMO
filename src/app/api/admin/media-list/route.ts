import { NextResponse } from "next/server";
import { getAuthFromCookies } from "@/lib/auth";
import { listImages } from "@/lib/cloudinary";

export async function GET() {
  const admin = await getAuthFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const images = await listImages();
    return NextResponse.json({ data: images });
  } catch (error) {
    console.error("Media list error:", error);
    return NextResponse.json({ data: [] });
  }
}
