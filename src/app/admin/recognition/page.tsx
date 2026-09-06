"use client";
import { useEffect, useState } from "react";
interface RecItem { _id?: string; category: string; items: Array<{ title: string; issuer: string; year: string; context?: string; }>; }
export default function RecognitionAdmin() {
  const [items, setItems] = useState<RecItem[]>([]); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [message, setMessage] = useState("");
  const load = () => { fetch("/api/admin/recognition").then(r => r.json()).then(j => { setItems(j.data || []); setLoading(false); }); };
  useEffect(() => { load(); }, []);
  const save = async (item: RecItem) => { setSaving(true); setMessage(""); const method = item._id ? "PUT" : "POST"; const res = await fetch("/api/admin/recognition", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) }); setMessage(res.ok ? "Saved!" : "Failed"); setSaving(false); load(); };
  if (loading) return <div className="adm-loading">Loading...</div>;
  return (
    <div>
      <h1 className="adm-page-title">Recognition & Awards</h1>
      <p className="adm-page-desc">{items.length} groups</p>
      {message && <div className="adm-success">{message}</div>}
      {items.map((group, gi) => (
        <div key={group._id || gi} className="adm-card">
          <h3 className="adm-card-title">{group.category}</h3>
          {group.items.map((item, ii) => (
            <div key={ii} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr auto", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "end" }}>
              <div className="adm-field"><label>Title</label><input value={item.title} onChange={e => { const g = [...items]; g[gi] = { ...g[gi], items: g[gi].items.map((it, j) => j === ii ? { ...it, title: e.target.value } : it) }; setItems(g); }} /></div>
              <div className="adm-field"><label>Issuer</label><input value={item.issuer} onChange={e => { const g = [...items]; g[gi] = { ...g[gi], items: g[gi].items.map((it, j) => j === ii ? { ...it, issuer: e.target.value } : it) }; setItems(g); }} /></div>
              <div className="adm-field"><label>Year</label><input value={item.year} onChange={e => { const g = [...items]; g[gi] = { ...g[gi], items: g[gi].items.map((it, j) => j === ii ? { ...it, year: e.target.value } : it) }; setItems(g); }} /></div>
              <button className="adm-btn adm-btn-danger" onClick={() => { const g = [...items]; g[gi] = { ...g[gi], items: g[gi].items.filter((_, j) => j !== ii) }; setItems(g); }}>×</button>
            </div>
          ))}
          <div className="adm-btn-row">
            <button className="adm-btn adm-btn-secondary" onClick={() => { const g = [...items]; g[gi] = { ...g[gi], items: [...g[gi].items, { title: "", issuer: "", year: "" }] }; setItems(g); }}>+ Add Award</button>
            <button className="adm-btn adm-btn-primary" onClick={() => save(items[gi])} disabled={saving}>{saving ? "Saving..." : "Save Group"}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
