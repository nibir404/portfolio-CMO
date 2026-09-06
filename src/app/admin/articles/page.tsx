"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  status: string;
  views: number;
  publishedAt: string | null;
}

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/articles")
      .then(res => res.json())
      .then(json => {
        if (json.data) setArticles(json.data);
        setLoading(false);
      });
  }, []);

  const deleteArticle = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    const res = await fetch(`/api/admin/articles?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setArticles(articles.filter(a => a._id !== id));
    } else {
      alert("Failed to delete article");
    }
  };

  if (loading) return <div className="adm-loading">Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 className="adm-page-title">Articles & News</h1>
          <p className="adm-page-desc" style={{ margin: 0 }}>Manage your blog and news posts</p>
        </div>
        <Link href="/admin/articles/write" className="adm-btn adm-btn-primary" style={{ textDecoration: "none" }}>
          + New Article
        </Link>
      </div>

      <div className="adm-card">
        {articles.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No articles found. Click "New Article" to create one.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <th style={{ padding: "0.75rem 1rem", color: "#374151", fontWeight: 600, fontSize: "0.85rem" }}>Title</th>
                  <th style={{ padding: "0.75rem 1rem", color: "#374151", fontWeight: 600, fontSize: "0.85rem" }}>Status</th>
                  <th style={{ padding: "0.75rem 1rem", color: "#374151", fontWeight: 600, fontSize: "0.85rem" }}>Views</th>
                  <th style={{ padding: "0.75rem 1rem", color: "#374151", fontWeight: 600, fontSize: "0.85rem" }}>Date</th>
                  <th style={{ padding: "0.75rem 1rem", color: "#374151", fontWeight: 600, fontSize: "0.85rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "1rem", color: "#111827", fontWeight: 500 }}>
                      <Link href={`/admin/articles/write?id=${article._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {article.title}
                      </Link>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ 
                        padding: "0.25rem 0.5rem", 
                        borderRadius: "9999px", 
                        fontSize: "0.75rem", 
                        fontWeight: 600,
                        background: article.status === "published" ? "#d1fae5" : "#f3f4f6",
                        color: article.status === "published" ? "#065f46" : "#4b5563"
                      }}>
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", color: "#6b7280" }}>{article.views || 0}</td>
                    <td style={{ padding: "1rem", color: "#6b7280" }}>
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "-"}
                    </td>
                    <td style={{ padding: "1rem", textAlign: "right" }}>
                      <Link href={`/admin/articles/write?id=${article._id}`} className="adm-btn adm-btn-secondary" style={{ marginRight: "0.5rem", textDecoration: "none", display: "inline-block" }}>
                        Edit
                      </Link>
                      <button onClick={() => deleteArticle(article._id)} className="adm-btn adm-btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
