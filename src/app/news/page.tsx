import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, ArticleData } from "@/lib/models";

export const metadata: Metadata = {
  title: "News & Insights | Abdullah Al Alamin",
  description: "Latest news, articles, and insights on AI, brand transformation, and business growth.",
};

export const revalidate = 60; // revalidate every minute

async function getPublishedArticles() {
  const db = await getDb();
  const articles = await db.collection<ArticleData>(COLLECTIONS.ARTICLES)
    .find({ status: "published" })
    .sort({ publishedAt: -1 })
    .toArray();
  return articles;
}

export default async function NewsPage() {
  const articles = await getPublishedArticles();

  return (
    <main style={{ paddingTop: "120px", paddingBottom: "120px", minHeight: "100vh", background: "var(--color-bg)" }}>
      <Container>
        <div style={{ marginBottom: "4rem" }}>
          <span className="eyebrow">Insights</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-ink)", marginBottom: "1.5rem" }}>
            News & Articles
          </h1>
          <p style={{ fontSize: "1.25rem", color: "var(--color-ink-soft)", maxWidth: "600px", lineHeight: 1.6 }}>
            Field notes, strategies, and updates from the intersection of AI, brand, and global business growth.
          </p>
        </div>

        {articles.length === 0 ? (
          <p style={{ color: "var(--color-ink-soft)" }}>No articles published yet. Check back soon.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {articles.map((article) => (
              <article key={article._id?.toString()} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Link href={`/news/${article.slug}`} style={{ display: "block", aspectRatio: "16/9", overflow: "hidden", borderRadius: "12px", background: "var(--color-bg-alt)" }}>
                  {article.coverImage ? (
                    <img 
                      src={article.coverImage} 
                      alt={article.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      className="hover:scale-105"
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-ink-soft)" }}>
                      No Cover
                    </div>
                  )}
                </Link>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>
                    {article.category && (
                      <span style={{ color: "var(--color-accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {article.category}
                      </span>
                    )}
                    {article.publishedAt && (
                      <span>{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                    )}
                  </div>
                  <Link href={`/news/${article.slug}`} style={{ textDecoration: "none" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                      {article.title}
                    </h2>
                  </Link>
                  <p style={{ color: "var(--color-ink-soft)", lineHeight: 1.6, fontSize: "0.95rem" }}>
                    {article.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
