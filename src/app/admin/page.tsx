"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  services: number;
  work: number;
  insights: number;
  speaking: number;
  press: number;
  recognition: number;
  education: number;
  principles: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const collections = ["services", "work", "insights", "speaking", "press", "recognition", "education", "principles"];
    const results: Record<string, number> = {};

    for (const col of collections) {
      try {
        const res = await fetch(`/api/admin/${col}`);
        const json = await res.json();
        results[col] = Array.isArray(json.data) ? json.data.length : json.data ? 1 : 0;
      } catch {
        results[col] = 0;
      }
    }
    setStats(results as unknown as Stats);
  };

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: "seed_abdullah_portfolio_2026" }),
      });
      const data = await res.json();
      if (data.success) {
        setSeedResult("✅ Database seeded successfully! All content has been migrated.");
        loadStats();
      } else {
        setSeedResult("❌ Seed failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setSeedResult("❌ Seed failed: " + String(err));
    } finally {
      setSeeding(false);
    }
  };

  const statCards = [
    { label: "Services", value: stats?.services ?? "—", href: "/admin/services", color: "#10b981" },
    { label: "Case Studies", value: stats?.work ?? "—", href: "/admin/work", color: "#3b82f6" },
    { label: "Insights", value: stats?.insights ?? "—", href: "/admin/insights", color: "#8b5cf6" },
    { label: "Speaking Topics", value: stats?.speaking ?? "—", href: "/admin/speaking", color: "#f59e0b" },
    { label: "Press Items", value: stats?.press ?? "—", href: "/admin/press", color: "#ef4444" },
    { label: "Recognition", value: stats?.recognition ?? "—", href: "/admin/recognition", color: "#ec4899" },
    { label: "Education", value: stats?.education ?? "—", href: "/admin/education", color: "#06b6d4" },
    { label: "Principles", value: stats?.principles ?? "—", href: "/admin/principles", color: "#84cc16" },
  ];

  const quickLinks = [
    { label: "Edit Homepage", href: "/admin/editorial", desc: "Hero, audience, services, proof, about, process" },
    { label: "Edit Profile", href: "/admin/profile", desc: "Name, bio, career, credentials" },
    { label: "Site Settings", href: "/admin/site-settings", desc: "Site name, emails, social links" },
    { label: "Manage Media", href: "/admin/media", desc: "Upload & manage images on Cloudinary" },
  ];

  return (
    <div>
      <h1 className="adm-page-title">Dashboard</h1>
      <p className="adm-page-desc">Overview of your portfolio content</p>

      {/* Seed Button */}
      <div className="adm-card" style={{ background: "rgba(16, 185, 129, 0.04)", borderColor: "rgba(16, 185, 129, 0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h3 className="adm-card-title" style={{ margin: 0 }}>Seed Database</h3>
            <p style={{ color: "#888", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
              First time? Click to migrate all existing content into the database.
            </p>
          </div>
          <button
            className="adm-btn adm-btn-primary"
            onClick={handleSeed}
            disabled={seeding}
          >
            {seeding ? "Seeding..." : "Seed Now"}
          </button>
        </div>
        {seedResult && (
          <div style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: seedResult.startsWith("✅") ? "#34d399" : "#f87171" }}>
            {seedResult}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="adm-stat-grid">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} style={{ textDecoration: "none" }}>
            <div className="adm-stat-card" style={{ cursor: "pointer", transition: "border-color 0.2s" }}>
              <div className="adm-stat-value" style={{ color: card.color }}>
                {card.value}
              </div>
              <div className="adm-stat-label">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#e4e4e7", margin: "0 0 1rem" }}>Quick Actions</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
        {quickLinks.map((link) => (
          <Link key={link.label} href={link.href} style={{ textDecoration: "none" }}>
            <div className="adm-card" style={{ cursor: "pointer", margin: 0, transition: "border-color 0.2s" }}>
              <h3 className="adm-card-title" style={{ margin: "0 0 0.25rem" }}>{link.label}</h3>
              <p style={{ color: "#888", fontSize: "0.82rem", margin: 0 }}>{link.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
