import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, ArticleData, getSingleton } from "@/lib/models";
import { Container } from "@/components/ui/Container";

export const revalidate = 60;

async function getArticle(slug: string) {
  const db = await getDb();
  const article = await db.collection<ArticleData>(COLLECTIONS.ARTICLES).findOne({ slug });
  if (!article) return null;
  // Increment view count (fire and forget)
  db.collection(COLLECTIONS.ARTICLES).updateOne({ _id: article._id }, { $inc: { views: 1 } }).catch(() => {});
  return article;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Not Found" };

  return {
    title: `${article.title} | Abdullah Al Alamin`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const profile = await getSingleton<{ name: string; jobTitle: string; }>(COLLECTIONS.PROFILE);
  const authorName = profile?.name || "Abdullah Al Alamin";
  const authorRole = profile?.jobTitle || "Business Transformation Advisor";

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": article.coverImage ? [article.coverImage] : [],
    "datePublished": article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
    "dateModified": article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
    "author": [{
      "@type": "Person",
      "name": authorName,
      "url": "https://abdullahalamin.me"
    }]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ paddingTop: "120px", paddingBottom: "120px", minHeight: "100vh", background: article.styling?.bgColor || "var(--color-bg)" }}>
        <Container>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          {/* Breadcrumb / Back */}
          <div style={{ marginBottom: "2rem" }}>
            <Link href="/news" style={{ color: article.styling?.accentColor || "var(--color-accent)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span>←</span> Back to News
            </Link>
          </div>

          {/* Article Header */}
          <header style={{ marginBottom: "3rem" }}>
            {article.category && (
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ color: article.styling?.accentColor || "var(--color-accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.85rem" }}>
                  {article.category}
                </span>
              </div>
            )}
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--color-ink)", marginBottom: "1.5rem", lineHeight: 1.2 }}>
              {article.title}
            </h1>
            
            {/* LinkedIn-style Author Block */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.5rem 0", borderTop: "1px solid var(--color-ink-faint)", borderBottom: "1px solid var(--color-ink-faint)" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: article.styling?.accentColor || "var(--color-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1.2rem" }}>
                {authorName.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--color-ink)", fontSize: "1.05rem" }}>{authorName}</div>
                <div style={{ color: "var(--color-ink-soft)", fontSize: "0.9rem", marginTop: "0.15rem" }}>
                  {authorRole} · {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Draft"} · {article.views || 0} views
                </div>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {article.coverImage && article.styling?.coverStyle === "full" && (
            <div style={{ marginBottom: "3rem", width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw", background: "var(--color-bg-alt)" }}>
              <img src={article.coverImage} alt={article.title} style={{ width: "100%", maxHeight: "600px", objectFit: "cover", display: "block" }} />
            </div>
          )}
          {article.coverImage && (!article.styling?.coverStyle || article.styling?.coverStyle === "standard") && (
            <div style={{ marginBottom: "3rem", borderRadius: "12px", overflow: "hidden", background: "var(--color-bg-alt)" }}>
              <img src={article.coverImage} alt={article.title} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          )}

          {/* Article Content */}
          <article 
            className="tiptap-editor"
            style={{ color: "var(--color-ink-soft)", fontSize: "1.1rem" }}
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--color-ink-faint)", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {article.tags.map(tag => (
                <span key={tag} style={{ background: "var(--color-bg-alt)", color: "var(--color-ink-soft)", padding: "0.4rem 0.8rem", borderRadius: "9999px", fontSize: "0.85rem", fontWeight: 500 }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
          </div>
        </Container>
      </main>
    </>
  );
}
