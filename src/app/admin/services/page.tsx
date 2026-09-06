"use client";

import { useEffect, useState } from "react";

interface ServiceItem {
  _id?: string;
  slug: string;
  name: string;
  shortDescription: string;
  intro: string;
  audience: string[];
  problems: string[];
  deliverables: string[];
  process: string[];
  outcomes: string[];
  engagementModels: string[];
  faqs: Array<{ question: string; answer: string }>;
}

const empty: ServiceItem = { slug: "", name: "", shortDescription: "", intro: "", audience: [], problems: [], deliverables: [], process: [], outcomes: [], engagementModels: [], faqs: [] };

export default function ServicesAdmin() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => { fetch("/api/admin/services").then(r => r.json()).then(j => { setItems(j.data || []); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return; setSaving(true); setMessage("");
    const method = editing._id ? "PUT" : "POST";
    const res = await fetch("/api/admin/services", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (res.ok) { setMessage("Saved!"); setEditing(null); load(); } else setMessage("Save failed");
    setSaving(false);
  };

  const del = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    load();
  };

  if (loading) return <div className="adm-loading">Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div><h1 className="adm-page-title">Services</h1><p className="adm-page-desc" style={{ margin: 0 }}>{items.length} services</p></div>
        <button className="adm-btn adm-btn-primary" onClick={() => setEditing({ ...empty })}>+ Add Service</button>
      </div>
      {message && <div className="adm-success">{message}</div>}

      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table">
          <thead><tr><th>Name</th><th>Slug</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id}>
                <td style={{ fontWeight: 500 }}>{item.name}</td>
                <td><span className="adm-badge adm-badge-blue">{item.slug}</span></td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="adm-btn adm-btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => setEditing({ ...item })}>Edit</button>
                    <button className="adm-btn adm-btn-danger" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => del(item._id!)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={3} className="adm-empty">No services yet</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="adm-modal-overlay" onClick={() => setEditing(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h2 className="adm-modal-title">{editing._id ? "Edit Service" : "New Service"}</h2>
            <div className="adm-field"><label>Name</label><input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></div>
            <div className="adm-field"><label>Slug</label><input value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} /></div>
            <div className="adm-field"><label>Short Description</label><textarea value={editing.shortDescription} onChange={e => setEditing({ ...editing, shortDescription: e.target.value })} /></div>
            <div className="adm-field"><label>Intro</label><textarea value={editing.intro} onChange={e => setEditing({ ...editing, intro: e.target.value })} /></div>
            <div className="adm-field"><label>Audience (one per line)</label><textarea value={editing.audience.join("\n")} onChange={e => setEditing({ ...editing, audience: e.target.value.split("\n") })} /></div>
            <div className="adm-field"><label>Problems (one per line)</label><textarea value={editing.problems.join("\n")} onChange={e => setEditing({ ...editing, problems: e.target.value.split("\n") })} /></div>
            <div className="adm-field"><label>Deliverables (one per line)</label><textarea value={editing.deliverables.join("\n")} onChange={e => setEditing({ ...editing, deliverables: e.target.value.split("\n") })} /></div>
            <div className="adm-field"><label>Process (one per line)</label><textarea value={editing.process.join("\n")} onChange={e => setEditing({ ...editing, process: e.target.value.split("\n") })} /></div>
            <div className="adm-field"><label>Outcomes (one per line)</label><textarea value={editing.outcomes.join("\n")} onChange={e => setEditing({ ...editing, outcomes: e.target.value.split("\n") })} /></div>
            <div className="adm-field"><label>Engagement Models (one per line)</label><textarea value={editing.engagementModels.join("\n")} onChange={e => setEditing({ ...editing, engagementModels: e.target.value.split("\n") })} /></div>
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
