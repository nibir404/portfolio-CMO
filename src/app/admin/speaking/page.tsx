"use client";
import { useEffect, useState } from "react";

interface SpeakingItem { _id?: string; slug: string; title: string; shortAbstract: string; fullAbstract: string; audiences: string[]; takeaways: string[]; formats: string[]; durationOptions: string[]; customizationNote: string; type?: string; name?: string; location?: string; year?: string; description?: string; }
const emptyTopic: SpeakingItem = { slug: "", title: "", shortAbstract: "", fullAbstract: "", audiences: [], takeaways: [], formats: [], durationOptions: [], customizationNote: "", type: "topic" };

export default function SpeakingAdmin() {
  const [items, setItems] = useState<SpeakingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<SpeakingItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => { fetch("/api/admin/speaking").then(r => r.json()).then(j => { setItems(j.data || []); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const save = async () => { if (!editing) return; setSaving(true); setMessage(""); const method = editing._id ? "PUT" : "POST"; const res = await fetch("/api/admin/speaking", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) }); if (res.ok) { setMessage("Saved!"); setEditing(null); load(); } else setMessage("Save failed"); setSaving(false); };
  const del = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/speaking?id=${id}`, { method: "DELETE" }); load(); };

  const topics = items.filter(i => i.type === "topic" || !i.type);
  const stages = items.filter(i => i.type === "stage");

  if (loading) return <div className="adm-loading">Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div><h1 className="adm-page-title">Speaking</h1><p className="adm-page-desc" style={{ margin: 0 }}>{topics.length} topics, {stages.length} past stages</p></div>
        <button className="adm-btn adm-btn-primary" onClick={() => setEditing({ ...emptyTopic })}>+ Add Topic</button>
      </div>
      {message && <div className="adm-success">{message}</div>}

      <h3 style={{ color: "#e4e4e7", fontSize: "1rem", margin: "0 0 0.75rem" }}>Topics</h3>
      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table">
          <thead><tr><th>Title</th><th>Slug</th><th>Actions</th></tr></thead>
          <tbody>
            {topics.map(item => (
              <tr key={item._id}><td style={{ fontWeight: 500 }}>{item.title}</td><td><span className="adm-badge adm-badge-blue">{item.slug}</span></td>
                <td><div style={{ display: "flex", gap: "0.5rem" }}><button className="adm-btn adm-btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => setEditing({ ...item })}>Edit</button><button className="adm-btn adm-btn-danger" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => del(item._id!)}>Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ color: "#e4e4e7", fontSize: "1rem", margin: "1.5rem 0 0.75rem" }}>Past Stages</h3>
      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table">
          <thead><tr><th>Name</th><th>Location</th><th>Year</th><th>Actions</th></tr></thead>
          <tbody>
            {stages.map(item => (
              <tr key={item._id}><td>{item.name}</td><td>{item.location}</td><td>{item.year}</td>
                <td><div style={{ display: "flex", gap: "0.5rem" }}><button className="adm-btn adm-btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => setEditing({ ...item })}>Edit</button><button className="adm-btn adm-btn-danger" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => del(item._id!)}>Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="adm-modal-overlay" onClick={() => setEditing(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h2 className="adm-modal-title">{editing._id ? "Edit" : "New"} {editing.type === "stage" ? "Stage" : "Topic"}</h2>
            {editing.type !== "stage" ? (<>
              <div className="adm-field"><label>Title</label><input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
              <div className="adm-field"><label>Slug</label><input value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} /></div>
              <div className="adm-field"><label>Short Abstract</label><textarea value={editing.shortAbstract} onChange={e => setEditing({ ...editing, shortAbstract: e.target.value })} /></div>
              <div className="adm-field"><label>Full Abstract</label><textarea value={editing.fullAbstract} onChange={e => setEditing({ ...editing, fullAbstract: e.target.value })} /></div>
              <div className="adm-field"><label>Audiences (one per line)</label><textarea value={editing.audiences.join("\n")} onChange={e => setEditing({ ...editing, audiences: e.target.value.split("\n") })} /></div>
              <div className="adm-field"><label>Takeaways (one per line)</label><textarea value={editing.takeaways.join("\n")} onChange={e => setEditing({ ...editing, takeaways: e.target.value.split("\n") })} /></div>
              <div className="adm-field"><label>Formats (one per line)</label><textarea value={editing.formats.join("\n")} onChange={e => setEditing({ ...editing, formats: e.target.value.split("\n") })} /></div>
              <div className="adm-field"><label>Customization Note</label><textarea value={editing.customizationNote} onChange={e => setEditing({ ...editing, customizationNote: e.target.value })} /></div>
            </>) : (<>
              <div className="adm-field"><label>Name</label><input value={editing.name || ""} onChange={e => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="adm-field"><label>Location</label><input value={editing.location || ""} onChange={e => setEditing({ ...editing, location: e.target.value })} /></div>
              <div className="adm-field"><label>Year</label><input value={editing.year || ""} onChange={e => setEditing({ ...editing, year: e.target.value })} /></div>
              <div className="adm-field"><label>Description</label><textarea value={editing.description || ""} onChange={e => setEditing({ ...editing, description: e.target.value })} /></div>
            </>)}
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
