"use client";
import { useEffect, useState } from "react";
interface EduItem { _id?: string; year: string; institution: string; program: string; status: string; }
const empty: EduItem = { year: "", institution: "", program: "", status: "Graduate" };
export default function EducationAdmin() {
  const [items, setItems] = useState<EduItem[]>([]); const [loading, setLoading] = useState(true); const [editing, setEditing] = useState<EduItem | null>(null); const [saving, setSaving] = useState(false); const [message, setMessage] = useState("");
  const load = () => { fetch("/api/admin/education").then(r => r.json()).then(j => { setItems(j.data || []); setLoading(false); }); };
  useEffect(() => { load(); }, []);
  const save = async () => { if (!editing) return; setSaving(true); setMessage(""); const method = editing._id ? "PUT" : "POST"; const res = await fetch("/api/admin/education", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) }); if (res.ok) { setMessage("Saved!"); setEditing(null); load(); } else setMessage("Save failed"); setSaving(false); };
  const del = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/education?id=${id}`, { method: "DELETE" }); load(); };
  if (loading) return <div className="adm-loading">Loading...</div>;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div><h1 className="adm-page-title">Education</h1><p className="adm-page-desc" style={{ margin: 0 }}>{items.length} entries</p></div>
        <button className="adm-btn adm-btn-primary" onClick={() => setEditing({ ...empty })}>+ Add</button>
      </div>
      {message && <div className="adm-success">{message}</div>}
      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table"><thead><tr><th>Program</th><th>Institution</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{items.map(item => (<tr key={item._id}><td style={{ fontWeight: 500 }}>{item.program}</td><td>{item.institution}</td><td>{item.status}</td>
            <td><div style={{ display: "flex", gap: "0.5rem" }}><button className="adm-btn adm-btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => setEditing({ ...item })}>Edit</button><button className="adm-btn adm-btn-danger" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => del(item._id!)}>Delete</button></div></td></tr>))}</tbody>
        </table>
      </div>
      {editing && (
        <div className="adm-modal-overlay" onClick={() => setEditing(null)}><div className="adm-modal" onClick={e => e.stopPropagation()}>
          <h2 className="adm-modal-title">{editing._id ? "Edit" : "New"} Education</h2>
          <div className="adm-field"><label>Institution</label><input value={editing.institution} onChange={e => setEditing({ ...editing, institution: e.target.value })} /></div>
          <div className="adm-field"><label>Program</label><input value={editing.program} onChange={e => setEditing({ ...editing, program: e.target.value })} /></div>
          <div className="adm-field"><label>Year</label><input value={editing.year} onChange={e => setEditing({ ...editing, year: e.target.value })} /></div>
          <div className="adm-field"><label>Status</label><input value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })} /></div>
          <div className="adm-btn-row"><button className="adm-btn adm-btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</button><button className="adm-btn adm-btn-secondary" onClick={() => setEditing(null)}>Cancel</button></div>
        </div></div>
      )}
    </div>
  );
}
