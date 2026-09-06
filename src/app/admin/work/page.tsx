"use client";
import { useEffect, useState, useRef } from "react";

interface WorkItem {
  _id?: string;
  slug: string;
  chapter: string;
  title: string;
  company: string;
  sector: string;
  timeframe: string;
  role: string;
  summary: string;
  scope: string;
  situation: string;
  decision: string;
  approach: string[];
  execution: string[];
  outcome: string;
  metrics: Array<{ label: string; value: string; context?: string }>;
  whatTransferred: string;
  image: string;
  imageAlt: string;
}

const empty: WorkItem = { slug: "", chapter: "", title: "", company: "", sector: "", timeframe: "", role: "", summary: "", scope: "", situation: "", decision: "", approach: [], execution: [], outcome: "", metrics: [], whatTransferred: "", image: "", imageAlt: "" };

export default function WorkAdmin() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<WorkItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => { fetch("/api/admin/work").then(r => r.json()).then(j => { setItems(j.data || []); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return; setSaving(true); setMessage("");
    const method = editing._id ? "PUT" : "POST";
    const res = await fetch("/api/admin/work", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (res.ok) { setMessage("Saved!"); setEditing(null); load(); } else setMessage("Save failed");
    setSaving(false);
  };

  const del = async (id: string) => {
    if (!confirm("Delete this work item?")) return;
    await fetch(`/api/admin/work?id=${id}`, { method: "DELETE" }); load();
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url && editing) setEditing({ ...editing, image: data.url });
    setUploading(false);
  };

  if (loading) return <div className="adm-loading">Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div><h1 className="adm-page-title">Work / Case Studies</h1><p className="adm-page-desc" style={{ margin: 0 }}>{items.length} case studies</p></div>
        <button className="adm-btn adm-btn-primary" onClick={() => setEditing({ ...empty })}>+ Add Case Study</button>
      </div>
      {message && <div className="adm-success">{message}</div>}

      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table">
          <thead><tr><th>Ch</th><th>Title</th><th>Company</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id}>
                <td>{item.chapter}</td>
                <td style={{ fontWeight: 500 }}>{item.title}</td>
                <td>{item.company}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="adm-btn adm-btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => setEditing({ ...item })}>Edit</button>
                    <button className="adm-btn adm-btn-danger" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => del(item._id!)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="adm-modal-overlay" onClick={() => setEditing(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h2 className="adm-modal-title">{editing._id ? "Edit Case Study" : "New Case Study"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <div className="adm-field"><label>Chapter</label><input value={editing.chapter} onChange={e => setEditing({ ...editing, chapter: e.target.value })} /></div>
              <div className="adm-field"><label>Slug</label><input value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} /></div>
            </div>
            <div className="adm-field"><label>Title</label><input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <div className="adm-field"><label>Company</label><input value={editing.company} onChange={e => setEditing({ ...editing, company: e.target.value })} /></div>
              <div className="adm-field"><label>Sector</label><input value={editing.sector} onChange={e => setEditing({ ...editing, sector: e.target.value })} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <div className="adm-field"><label>Timeframe</label><input value={editing.timeframe} onChange={e => setEditing({ ...editing, timeframe: e.target.value })} /></div>
              <div className="adm-field"><label>Role</label><input value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })} /></div>
            </div>
            <div className="adm-field"><label>Summary</label><textarea value={editing.summary} onChange={e => setEditing({ ...editing, summary: e.target.value })} /></div>
            <div className="adm-field"><label>Situation</label><textarea value={editing.situation} onChange={e => setEditing({ ...editing, situation: e.target.value })} /></div>
            <div className="adm-field"><label>Decision</label><textarea value={editing.decision} onChange={e => setEditing({ ...editing, decision: e.target.value })} /></div>
            <div className="adm-field"><label>Approach (one per line)</label><textarea value={editing.approach.join("\n")} onChange={e => setEditing({ ...editing, approach: e.target.value.split("\n") })} /></div>
            <div className="adm-field"><label>Execution (one per line)</label><textarea value={editing.execution.join("\n")} onChange={e => setEditing({ ...editing, execution: e.target.value.split("\n") })} /></div>
            <div className="adm-field"><label>Outcome</label><textarea value={editing.outcome} onChange={e => setEditing({ ...editing, outcome: e.target.value })} /></div>
            <div className="adm-field"><label>What Transferred</label><textarea value={editing.whatTransferred} onChange={e => setEditing({ ...editing, whatTransferred: e.target.value })} /></div>
            <div className="adm-field">
              <label>Image</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                <input type="file" ref={fileRef} accept="image/*" style={{ display: "none" }} onChange={e => { if (e.target.files?.[0]) uploadImage(e.target.files[0]); }} />
                <button type="button" className="adm-btn adm-btn-secondary" onClick={() => fileRef.current?.click()} disabled={uploading}>{uploading ? "Uploading..." : "Upload Image"}</button>
                {editing.image && (
                  <div style={{ flexBasis: "100%", marginTop: "0.5rem" }}>
                    <img src={editing.image} alt="Preview" style={{ maxWidth: "200px", borderRadius: "6px" }} />
                  </div>
                )}
              </div>
            </div>
            <div className="adm-field"><label>Image Alt Text</label><input value={editing.imageAlt} onChange={e => setEditing({ ...editing, imageAlt: e.target.value })} /></div>

            <h4 style={{ color: "#aaa", fontSize: "0.85rem", marginTop: "1rem" }}>Metrics</h4>
            {editing.metrics.map((m, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "end" }}>
                <div className="adm-field"><label>Label</label><input value={m.label} onChange={e => { const metrics = [...editing.metrics]; metrics[i] = { ...metrics[i], label: e.target.value }; setEditing({ ...editing, metrics }); }} /></div>
                <div className="adm-field"><label>Value</label><input value={m.value} onChange={e => { const metrics = [...editing.metrics]; metrics[i] = { ...metrics[i], value: e.target.value }; setEditing({ ...editing, metrics }); }} /></div>
                <div className="adm-field"><label>Context</label><input value={m.context || ""} onChange={e => { const metrics = [...editing.metrics]; metrics[i] = { ...metrics[i], context: e.target.value }; setEditing({ ...editing, metrics }); }} /></div>
                <button className="adm-btn adm-btn-danger" onClick={() => setEditing({ ...editing, metrics: editing.metrics.filter((_, j) => j !== i) })}>×</button>
              </div>
            ))}
            <button className="adm-btn adm-btn-secondary" onClick={() => setEditing({ ...editing, metrics: [...editing.metrics, { label: "", value: "", context: "" }] })}>+ Add Metric</button>

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
