"use client";
import { useEffect, useState } from "react";
interface PrincipleItem { _id?: string; n: string; title: string; description: string; }
const empty: PrincipleItem = { n: "", title: "", description: "" };
export default function PrinciplesAdmin() {
  const [items, setItems] = useState<PrincipleItem[]>([]); const [loading, setLoading] = useState(true); const [editing, setEditing] = useState<PrincipleItem | null>(null); const [saving, setSaving] = useState(false); const [message, setMessage] = useState("");
  const load = () => { fetch("/api/admin/principles").then(r => r.json()).then(j => { setItems(j.data || []); setLoading(false); }); };
  useEffect(() => { load(); }, []);
  const save = async () => { if (!editing) return; setSaving(true); setMessage(""); const method = editing._id ? "PUT" : "POST"; const res = await fetch("/api/admin/principles", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) }); if (res.ok) { setMessage("Saved!"); setEditing(null); load(); } else setMessage("Save failed"); setSaving(false); };
  const del = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/principles?id=${id}`, { method: "DELETE" }); load(); };
  if (loading) return <div className="adm-loading">Loading...</div>;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div><h1 className="adm-page-title">Operating Principles</h1><p className="adm-page-desc" style={{ margin: 0 }}>{items.length} principles</p></div>
        <button className="adm-btn adm-btn-primary" onClick={() => setEditing({ ...empty })}>+ Add</button>
      </div>
      {message && <div className="adm-success">{message}</div>}
      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table"><thead><tr><th>#</th><th>Title</th><th>Actions</th></tr></thead>
          <tbody>{items.map(item => (<tr key={item._id}><td>{item.n}</td><td style={{ fontWeight: 500 }}>{item.title}</td>
            <td><div style={{ display: "flex", gap: "0.5rem" }}><button className="adm-btn adm-btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => setEditing({ ...item })}>Edit</button><button className="adm-btn adm-btn-danger" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => del(item._id!)}>Delete</button></div></td></tr>))}</tbody>
        </table>
      </div>
      {editing && (
        <div className="adm-modal-overlay" onClick={() => setEditing(null)}><div className="adm-modal" onClick={e => e.stopPropagation()}>
          <h2 className="adm-modal-title">{editing._id ? "Edit" : "New"} Principle</h2>
          <div className="adm-field"><label>Number</label><input value={editing.n} onChange={e => setEditing({ ...editing, n: e.target.value })} placeholder="/01" /></div>
          <div className="adm-field"><label>Title</label><input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
          <div className="adm-field"><label>Description</label><textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} /></div>
          <div className="adm-btn-row"><button className="adm-btn adm-btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</button><button className="adm-btn adm-btn-secondary" onClick={() => setEditing(null)}>Cancel</button></div>
        </div></div>
      )}
    </div>
  );
}
