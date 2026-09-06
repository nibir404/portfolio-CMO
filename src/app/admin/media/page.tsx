"use client";
import { useEffect, useState, useRef } from "react";

interface MediaItem { url: string; publicId: string; width: number; height: number; format: string; bytes?: number; createdAt?: string; }

export default function MediaAdmin() {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/media-list");
      const json = await res.json();
      setImages(json.data || []);
    } catch { setImages([]); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const upload = async (files: FileList) => {
    setUploading(true); setMessage("");
    for (const file of Array.from(files)) {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) { setMessage("Upload failed for " + file.name); }
    }
    setMessage("Upload complete!");
    setUploading(false); load();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setMessage("URL copied!");
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading) return <div className="adm-loading">Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div><h1 className="adm-page-title">Media Library</h1><p className="adm-page-desc" style={{ margin: 0 }}>{images.length} images on Cloudinary</p></div>
        <div>
          <input type="file" ref={fileRef} accept="image/*" multiple style={{ display: "none" }} onChange={e => { if (e.target.files?.length) upload(e.target.files); }} />
          <button className="adm-btn adm-btn-primary" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Images"}
          </button>
        </div>
      </div>
      {message && <div className="adm-success">{message}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {images.map((img) => (
          <div key={img.publicId} className="adm-card" style={{ padding: "0.5rem", margin: 0 }}>
            <div style={{ aspectRatio: "16/10", borderRadius: "8px", overflow: "hidden", background: "#1a1a24", marginBottom: "0.5rem" }}>
              <img src={img.url} alt={img.publicId} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <p style={{ fontSize: "0.75rem", color: "#888", margin: "0 0 0.25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{img.publicId}</p>
            <p style={{ fontSize: "0.7rem", color: "#666", margin: 0 }}>{img.width}×{img.height} · {img.format}{img.bytes ? ` · ${(img.bytes / 1024).toFixed(0)}KB` : ""}</p>
            <button className="adm-btn adm-btn-secondary" style={{ width: "100%", marginTop: "0.5rem", fontSize: "0.78rem", padding: "0.4rem" }} onClick={() => copyUrl(img.url)}>Copy URL</button>
          </div>
        ))}
        {images.length === 0 && <div className="adm-empty" style={{ gridColumn: "1/-1" }}>No images found. Upload your first image above.</div>}
      </div>
    </div>
  );
}
