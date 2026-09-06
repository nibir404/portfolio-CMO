"use client";
import { useEffect, useState, useRef } from "react";

interface InsightItem { _id?: string; slug: string; title: string; description: string; category: string; format: string; duration: string; publishedAt: string; author: string; featured: boolean; poster: string; posterAlt: string; keyTakeaways: string[]; }
const empty: InsightItem = { slug: "", title: "", description: "", category: "brand-strategy", format: "Essay", duration: "", publishedAt: new Date().toISOString().split("T")[0], author: "Abdullah Al Alamin", featured: false, poster: "", posterAlt: "", keyTakeaways: [] };

export default function InsightsAdmin() {
  const [items, setItems] = useState<InsightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<InsightItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => { fetch("/api/admin/insights").then(r => r.json()).then(j => { setItems(j.data || []); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const save = async () => { if (!editing) return; setSaving(true); setMessage(""); const method = editing._id ? "PUT" : "POST"; const res = await fetch("/api/admin/insights", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) }); if (res.ok) { setMessage("Saved!"); setEditing(null); load(); } else setMessage("Save failed"); setSaving(false); };
  const del = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/insights?id=${id}`, { method: "DELETE" }); load(); };
  const uploadImage = async (file: File) => { setUploading(true); const fd = new FormData(); fd.append("file", file); const res = await fetch("/api/upload", { method: "POST", body: fd }); const data = await res.json(); if (data.url && editing) setEditing({ ...editing, poster: data.url }); setUploading(false); };

  if (loading) return <div className="adm-loading">Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div><h1 className="adm-page-title">Insights</h1><p className="adm-page-desc" style={{ margin: 0 }}>{items.length} articles</p></div>
        <button className="adm-btn adm-btn-primary" onClick={() => setEditing({ ...empty })}>+ Add Insight</button>
      </div>
      {message && <div className="adm-success">{message}</div>}

      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table">
          <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id}>
                <td style={{ fontWeight: 500 }}>{item.title}</td>
                <td><span className="adm-badge adm-badge-green">{item.category}</span></td>
                <td>{item.publishedAt}</td>
                <td><div style={{ display: "flex", gap: "0.5rem" }}><button className="adm-btn adm-btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => setEditing({ ...item })}>Edit</button><button className="adm-btn adm-btn-danger" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => del(item._id!)}>Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="adm-modal-overlay" onClick={() => setEditing(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h2 className="adm-modal-title">{editing._id ? "Edit Insight" : "New Insight"}</h2>
            <div className="adm-field"><label>Title</label><input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
            <div className="adm-field"><label>Slug</label><input value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} /></div>
            <div className="adm-field"><label>Description</label><textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <div className="adm-field"><label>Category</label>
                <select value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}>
                  <option value="brand-strategy">Brand Strategy</option><option value="ai-in-marketing">AI in Marketing</option><option value="leadership">Leadership</option><option value="crisis-communication">Crisis Communication</option><option value="growth">Growth</option>
                </select>
              </div>
              <div className="adm-field"><label>Format</label>
                <select value={editing.format} onChange={e => setEditing({ ...editing, format: e.target.value })}>
                  <option value="Essay">Essay</option><option value="Reel">Reel</option><option value="Short">Short</option><option value="Podcast">Podcast</option><option value="LinkedIn">LinkedIn</option><option value="Note">Note</option>
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
              <div className="adm-field"><label>Duration</label><input value={editing.duration} onChange={e => setEditing({ ...editing, duration: e.target.value })} /></div>
              <div className="adm-field"><label>Published At</label><input type="date" value={editing.publishedAt} onChange={e => setEditing({ ...editing, publishedAt: e.target.value })} /></div>
              <div className="adm-field"><label>Author</label><input value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })} /></div>
            </div>
            <div className="adm-field" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" checked={editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked })} />
              <label style={{ margin: 0 }}>Featured</label>
            </div>
            <div className="adm-field">
              <label>Poster Image</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                <input type="file" ref={fileRef} accept="image/*" style={{ display: "none" }} onChange={e => { if (e.target.files?.[0]) uploadImage(e.target.files[0]); }} />
                <button type="button" className="adm-btn adm-btn-secondary" onClick={() => fileRef.current?.click()} disabled={uploading}>{uploading ? "Uploading..." : "Upload Image"}</button>
                {editing.poster && (
                  <div style={{ flexBasis: "100%", marginTop: "0.5rem" }}>
                    <img src={editing.poster} alt="Preview" style={{ maxWidth: "200px", borderRadius: "6px" }} />
                  </div>
                )}
              </div>
            </div>
            <div className="adm-field"><label>Poster Alt</label><input value={editing.posterAlt} onChange={e => setEditing({ ...editing, posterAlt: e.target.value })} /></div>
            <div className="adm-field"><label>Key Takeaways (one per line)</label><textarea value={editing.keyTakeaways.join("\n")} onChange={e => setEditing({ ...editing, keyTakeaways: e.target.value.split("\n") })} /></div>
            <div className="adm-btn-row">
              <button className="adm-btn adm-btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
              <button className="adm-btn adm-btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
