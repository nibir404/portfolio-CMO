"use client";
import { useEffect, useState } from "react";
interface NavData { primary: Array<{ label: string; href: string }>; footerExplore: Array<{ label: string; href: string }>; footerServices: Array<{ label: string; href: string }>; footerConnect: Array<{ label: string; href: string }>; }
export default function NavigationAdmin() {
  const [data, setData] = useState<NavData | null>(null); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [message, setMessage] = useState("");
  useEffect(() => { fetch("/api/admin/navigation").then(r => r.json()).then(j => { if (j.data) setData(j.data); setLoading(false); }); }, []);
  const save = async () => { if (!data) return; setSaving(true); setMessage(""); const res = await fetch("/api/admin/navigation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); setMessage(res.ok ? "Saved!" : "Failed"); setSaving(false); };
  if (loading) return <div className="adm-loading">Loading...</div>;
  if (!data) return <div className="adm-empty">No navigation data. Seed first.</div>;
  const renderSection = (title: string, key: keyof NavData) => (
    <div className="adm-card">
      <h3 className="adm-card-title">{title}</h3>
      {(data[key] as Array<{ label: string; href: string }>).map((item, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "end" }}>
          <div className="adm-field"><label>Label</label><input value={item.label} onChange={e => { const arr = [...data[key] as Array<{ label: string; href: string }>]; arr[i] = { ...arr[i], label: e.target.value }; setData({ ...data, [key]: arr }); }} /></div>
          <div className="adm-field"><label>URL</label><input value={item.href} onChange={e => { const arr = [...data[key] as Array<{ label: string; href: string }>]; arr[i] = { ...arr[i], href: e.target.value }; setData({ ...data, [key]: arr }); }} /></div>
          <button className="adm-btn adm-btn-danger" onClick={() => { setData({ ...data, [key]: (data[key] as Array<{ label: string; href: string }>).filter((_, j) => j !== i) }); }}>×</button>
        </div>
      ))}
      <button className="adm-btn adm-btn-secondary" onClick={() => { setData({ ...data, [key]: [...data[key] as Array<{ label: string; href: string }>, { label: "", href: "" }] }); }}>+ Add Link</button>
    </div>
  );
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div><h1 className="adm-page-title">Navigation</h1><p className="adm-page-desc" style={{ margin: 0 }}>Header & footer navigation links</p></div>
        <button className="adm-btn adm-btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
      </div>
      {message && <div className={message.includes("Saved") ? "adm-success" : "adm-error"}>{message}</div>}
      {renderSection("Primary Navigation", "primary")}
      {renderSection("Footer — Explore", "footerExplore")}
      {renderSection("Footer — Services", "footerServices")}
      {renderSection("Footer — Connect", "footerConnect")}
    </div>
  );
}
