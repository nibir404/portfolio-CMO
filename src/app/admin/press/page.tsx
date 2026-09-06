"use client";
import { useEffect, useState } from "react";
interface PressItem { _id?: string; title: string; outlet: string; type: string; date?: string; summary: string; url?: string; }
const empty: PressItem = { title: "", outlet: "", type: "feature", summary: "", url: "" };
export default function PressAdmin() {
  const [items, setItems] = useState<PressItem[]>([]); const [loading, setLoading] = useState(true); const [editing, setEditing] = useState<PressItem | null>(null); const [saving, setSaving] = useState(false); const [message, setMessage] = useState("");
  const load = () => { fetch("/api/admin/press").then(r => r.json()).then(j => { setItems((j.data || []).filter((d: Record<string,unknown>) => d.type === "coverage" || d.type === "feature" || d.type === "interview" || d.type === "appearance" || d.type === "mention")); setLoading(false); }); };
  useEffect(() => { load(); }, []);
  const save = async () => { if (!editing) return; setSaving(true); setMessage(""); const method = editing._id ? "PUT" : "POST"; const body = { ...editing, type: editing.type || "coverage" }; const res = await fetch("/api/admin/press", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); if (res.ok) { setMessage("Saved!"); setEditing(null); load(); } else setMessage("Save failed"); setSaving(false); };
  const del = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/press?id=${id}`, { method: "DELETE" }); load(); };
  if (loading) return <div className="adm-loading">Loading...</div>;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div><h1 className="adm-page-title">Press</h1><p className="adm-page-desc" style={{ margin: 0 }}>{items.length} items</p></div>
        <button className="adm-btn adm-btn-primary" onClick={() => setEditing({ ...empty })}>+ Add Press Item</button>
      </div>
      {message && <div className="adm-success">{message}</div>}
      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table"><thead><tr><th>Title</th><th>Outlet</th><th>Type</th><th>Actions</th></tr></thead>
          <tbody>{items.map(item => (<tr key={item._id}><td style={{ fontWeight: 500 }}>{item.title}</td><td>{item.outlet}</td><td><span className="adm-badge adm-badge-blue">{item.type}</span></td>
            <td><div style={{ display: "flex", gap: "0.5rem" }}><button className="adm-btn adm-btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => setEditing({ ...item })}>Edit</button><button className="adm-btn adm-btn-danger" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => del(item._id!)}>Delete</button></div></td></tr>))}</tbody>
        </table>
      </div>
      {editing && (
        <div className="adm-modal-overlay" onClick={() => setEditing(null)}><div className="adm-modal" onClick={e => e.stopPropagation()}>
          <h2 className="adm-modal-title">{editing._id ? "Edit" : "New"} Press Item</h2>
          <div className="adm-field"><label>Title</label><input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
          <div className="adm-field"><label>Outlet</label><input value={editing.outlet} onChange={e => setEditing({ ...editing, outlet: e.target.value })} /></div>
          <div className="adm-field"><label>Type</label><select value={editing.type} onChange={e => setEditing({ ...editing, type: e.target.value })}><option value="feature">Feature</option><option value="interview">Interview</option><option value="appearance">Appearance</option><option value="mention">Mention</option></select></div>
          <div className="adm-field"><label>Date</label><input type="date" value={editing.date || ""} onChange={e => setEditing({ ...editing, date: e.target.value })} /></div>
          <div className="adm-field"><label>Summary</label><textarea value={editing.summary} onChange={e => setEditing({ ...editing, summary: e.target.value })} /></div>
          <div className="adm-field"><label>URL</label><input value={editing.url || ""} onChange={e => setEditing({ ...editing, url: e.target.value })} /></div>
          <div className="adm-btn-row"><button className="adm-btn adm-btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</button><button className="adm-btn adm-btn-secondary" onClick={() => setEditing(null)}>Cancel</button></div>
        </div></div>
      )}
    </div>
  );
}
