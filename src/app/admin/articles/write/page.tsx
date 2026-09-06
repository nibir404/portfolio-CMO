"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import slugify from "slugify";

interface ArticleData {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  styling?: {
    bgColor?: string;
    accentColor?: string;
    coverStyle?: "standard" | "full" | "minimal";
  };
  status: "draft" | "published";
  views?: number;
  publishedAt?: string | null;
}

export default function WriteArticle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<ArticleData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "<p>Write your article here...</p>",
    coverImage: "",
    category: "",
    tags: [],
    styling: {
      bgColor: "",
      accentColor: "",
      coverStyle: "standard",
    },
    status: "draft",
  });
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/articles?id=${id}`)
        .then(res => res.json())
        .then(json => {
          if (json.data) setData(json.data);
          setLoading(false);
        });
    }
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Auto-generate slug if it's a new article and user hasn't manually edited slug much
    if (!id && (data.slug === "" || data.slug === slugify(data.title, { lower: true, strict: true }))) {
      setData({ ...data, title, slug: slugify(title, { lower: true, strict: true }) });
    } else {
      setData({ ...data, title });
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    
    setUploadingCover(true);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (res.ok && json.url) {
        setData({ ...data, coverImage: json.url });
      } else {
        alert("Upload failed: " + (json.error || "Unknown error"));
      }
    } catch (error) {
      alert("Upload failed");
    } finally {
      setUploadingCover(false);
      // Reset input
      e.target.value = "";
    }
  };

  const save = async (status: "draft" | "published") => {
    setSaving(true);
    setMessage("");
    
    const payload = {
      ...data,
      status,
      publishedAt: status === "published" && !data.publishedAt ? new Date().toISOString() : data.publishedAt,
    };

    try {
      const method = id ? "PUT" : "POST";
      const res = await fetch("/api/admin/articles", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const json = await res.json();
      if (res.ok) {
        setMessage("Saved successfully!");
        if (!id && json.id) {
          router.replace(`/admin/articles/write?id=${json.id}`);
        } else {
          setData(payload);
        }
      } else {
        setMessage(json.error || "Save failed");
      }
    } catch (error) {
      setMessage("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="adm-loading">Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 className="adm-page-title">{id ? "Edit Article" : "Write Article"}</h1>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="adm-btn adm-btn-secondary" onClick={() => save("draft")} disabled={saving}>
            {saving && data.status === "draft" ? "Saving..." : "Save Draft"}
          </button>
          <button className="adm-btn adm-btn-primary" onClick={() => save("published")} disabled={saving}>
            {saving && data.status === "published" ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      {message && <div className={message.includes("success") ? "adm-success" : "adm-error"}>{message}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem", alignItems: "start" }}>
        {/* Main Editor Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="adm-card" style={{ padding: "1.5rem" }}>
            <input 
              type="text" 
              placeholder="Article Title" 
              value={data.title}
              onChange={handleTitleChange}
              style={{ 
                width: "100%", 
                fontSize: "2rem", 
                fontWeight: 700, 
                border: "none", 
                outline: "none", 
                background: "transparent",
                marginBottom: "1.5rem",
                color: "#111827"
              }}
            />
            
            <RichTextEditor 
              value={data.content} 
              onChange={(html) => setData({ ...data, content: html })} 
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="adm-card">
            <h3 className="adm-card-title">Article Settings</h3>
            
            <div className="adm-field">
              <label>Slug</label>
              <input value={data.slug} onChange={(e) => setData({ ...data, slug: e.target.value })} />
            </div>
            
            <div className="adm-field">
              <label>Category (ID or Slug)</label>
              <input value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })} />
            </div>
            
            <div className="adm-field">
              <label>Cover Image</label>
              <input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploadingCover} />
              {uploadingCover && <span style={{ fontSize: "0.85rem", color: "#6b7280", display: "block", marginTop: "0.25rem" }}>Uploading...</span>}
              {data.coverImage && (
                <div style={{ marginTop: "0.5rem", borderRadius: "6px", overflow: "hidden" }}>
                  <img src={data.coverImage} alt="Cover preview" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              )}
            </div>
            
            <div className="adm-field">
              <label>Excerpt / Summary</label>
              <textarea 
                value={data.excerpt} 
                onChange={(e) => setData({ ...data, excerpt: e.target.value })}
                rows={4} 
              />
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>Shown in article cards and SEO description.</span>
            </div>
            
            <div className="adm-field">
              <label>Tags (comma separated)</label>
              <input 
                value={data.tags.join(", ")} 
                onChange={(e) => setData({ ...data, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })} 
              />
            </div>
          </div>

          <div className="adm-card">
            <h3 className="adm-card-title">Appearance</h3>
            <div className="adm-field">
              <label>Cover Image Style</label>
              <select 
                value={data.styling?.coverStyle || "standard"} 
                onChange={(e) => setData({ ...data, styling: { ...data.styling, coverStyle: e.target.value as "standard" | "full" | "minimal" } })}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #d1d5db" }}
              >
                <option value="standard">Standard (Boxed)</option>
                <option value="full">Full Width</option>
                <option value="minimal">Minimal (No Image)</option>
              </select>
            </div>
            <div className="adm-field">
              <label>Accent / Highlight Color</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input 
                  type="color" 
                  value={data.styling?.accentColor || "#10b981"} 
                  onChange={(e) => setData({ ...data, styling: { ...data.styling, accentColor: e.target.value } })}
                  style={{ width: "40px", height: "40px", padding: 0, border: "none", borderRadius: "4px", overflow: "hidden" }}
                />
                <input 
                  type="text" 
                  value={data.styling?.accentColor || ""} 
                  placeholder="#10b981"
                  onChange={(e) => setData({ ...data, styling: { ...data.styling, accentColor: e.target.value } })}
                  style={{ flex: 1 }}
                />
              </div>
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>Used for tags, links, and highlights.</span>
            </div>
            <div className="adm-field">
              <label>Background Color (Optional)</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input 
                  type="color" 
                  value={data.styling?.bgColor || "#ffffff"} 
                  onChange={(e) => setData({ ...data, styling: { ...data.styling, bgColor: e.target.value } })}
                  style={{ width: "40px", height: "40px", padding: 0, border: "none", borderRadius: "4px", overflow: "hidden" }}
                />
                <input 
                  type="text" 
                  value={data.styling?.bgColor || ""} 
                  placeholder="#ffffff or none"
                  onChange={(e) => setData({ ...data, styling: { ...data.styling, bgColor: e.target.value } })}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
