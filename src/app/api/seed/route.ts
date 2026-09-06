import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";

// Import all static content
import { site } from "@/content/site";
import { profile } from "@/content/profile";
import { editorial } from "@/content/editorial";
import { services } from "@/content/services";
import { work } from "@/content/work";
import { insights } from "@/content/insights";
import { speakingTopics, pastStages } from "@/content/speaking";
import { pressCoverage, pressKit, interviewTopics } from "@/content/press";
import { recognition } from "@/content/recognition";
import { education } from "@/content/education";
import { principles } from "@/content/principles";
import { navigation } from "@/content/navigation";
import { newsletter } from "@/content/newsletter";
import { playbook } from "@/content/playbook";

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json();

    if (secret !== process.env.SEED_SECRET) {
      return NextResponse.json({ error: "Invalid seed secret" }, { status: 401 });
    }

    const db = await getDb();
    const results: Record<string, string> = {};

    // 1. Seed admin user
    const adminCol = db.collection("admin_users");
    const existingAdmin = await adminCol.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      const hashedPw = await hashPassword(process.env.ADMIN_PASSWORD || "admin123");
      await adminCol.insertOne({
        email: process.env.ADMIN_EMAIL,
        password: hashedPw,
        role: "admin",
        createdAt: new Date(),
      });
      results.admin_users = "Created admin user";
    } else {
      results.admin_users = "Admin user already exists";
    }

    // 2. Seed singleton collections (upsert)
    const singletons = [
      { name: "site_settings", data: { ...site } },
      { name: "profile", data: { ...profile } },
      { name: "editorial", data: JSON.parse(JSON.stringify(editorial)) },
      { name: "navigation", data: { ...navigation } },
      { name: "newsletter", data: { ...newsletter } },
      { name: "playbook", data: { ...playbook } },
    ];

    for (const s of singletons) {
      const col = db.collection(s.name);
      const existing = await col.findOne({});
      if (!existing) {
        await col.insertOne({ ...s.data, createdAt: new Date(), updatedAt: new Date() });
        results[s.name] = "Seeded";
      } else {
        results[s.name] = "Already exists, skipped";
      }
    }

    // 3. Seed array collections
    const arrays = [
      { name: "services", data: services.map((s) => ({ ...s })) },
      { name: "work", data: work.map((w) => ({ ...w })) },
      { name: "insights", data: insights.map((i) => ({ ...i })) },
      {
        name: "speaking",
        data: speakingTopics.map((t) => ({ ...t, type: "topic" })),
        extra: pastStages.map((s) => ({ ...s, type: "stage" })),
      },
      {
        name: "press",
        data: pressCoverage.map((p) => ({ ...p, type: "coverage" })),
        extra: [
          { ...pressKit, type: "kit" },
          { topics: interviewTopics, type: "interview_topics" },
        ],
      },
      {
        name: "recognition",
        data: recognition.map((r) => ({ ...r })),
      },
      { name: "education", data: education.map((e) => ({ ...e })) },
      { name: "principles", data: principles.map((p) => ({ ...p })) },
    ];

    for (const arr of arrays) {
      const col = db.collection(arr.name);
      const count = await col.countDocuments();
      if (count === 0) {
        const docs: any[] = [...arr.data.map((d) => ({ ...d, createdAt: new Date(), updatedAt: new Date() }))];
        if ("extra" in arr && arr.extra) {
          docs.push(
            ...arr.extra.map((d) => ({ ...d, createdAt: new Date(), updatedAt: new Date() }))
          );
        }
        if (docs.length > 0) {
          await col.insertMany(docs);
        }
        results[arr.name] = `Seeded ${docs.length} documents`;
      } else {
        results[arr.name] = `Already has ${count} documents, skipped`;
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed", details: String(error) }, { status: 500 });
  }
}
