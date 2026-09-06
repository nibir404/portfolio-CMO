"use client";

import { useEffect, useState } from "react";

interface SiteData {
  origin: string;
  name: string;
  description: string;
  locale: string;
  officeEmail: string;
  speakingEmail: string;
  pressEmail: string;
  phone?: string;
  calCom: string;
  social: Array<{ label: string; href: string }>;
  sameAs: string[];
  navItems: Array<{ label: string; href: string }>;
  footerGroups: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
}

export default function SiteSettingsAdmin() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { fetch("/api/admin/site_settings").then(r => r.json()).then(j => { if (j.data) setData(j.data); setLoading(false); }); }, []);

  const save = async () => {
    if (!data) return; setSaving(true); setMessage("");
    const res = await fetch("/api/admin/site_settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setMessage(res.ok ? "Saved successfully!" : "Save failed"); setSaving(false);
  };

  if (loading) return <div className="adm-loading">Loading...</div>;
  if (!data) return <div className="adm-empty">No site settings found. Seed the database first.</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div><h1 className="adm-page-title">Site Settings</h1><p className="adm-page-desc" style={{ margin: 0 }}>Global site configuration</p></div>
        <button className="adm-btn adm-btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
      </div>
      {message && <div className={message.includes("success") ? "adm-success" : "adm-error"}>{message}</div>}

      <div className="adm-card">
        <h3 className="adm-card-title">General</h3>
        <div className="adm-field"><label>Site Name</label><input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} /></div>
        <div className="adm-field"><label>Origin URL</label><input value={data.origin} onChange={e => setData({ ...data, origin: e.target.value })} /></div>
        <div className="adm-field"><label>Description</label><textarea value={data.description} onChange={e => setData({ ...data, description: e.target.value })} /></div>
        <div className="adm-field"><label>Locale</label><input value={data.locale} onChange={e => setData({ ...data, locale: e.target.value })} /></div>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">Emails</h3>
        <div className="adm-field"><label>Office Email</label><input value={data.officeEmail} onChange={e => setData({ ...data, officeEmail: e.target.value })} /></div>
        <div className="adm-field"><label>Speaking Email</label><input value={data.speakingEmail} onChange={e => setData({ ...data, speakingEmail: e.target.value })} /></div>
        <div className="adm-field"><label>Press Email</label><input value={data.pressEmail} onChange={e => setData({ ...data, pressEmail: e.target.value })} /></div>
        <div className="adm-field"><label>Cal.com URL</label><input value={data.calCom} onChange={e => setData({ ...data, calCom: e.target.value })} /></div>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">Navigation Items</h3>
        {data.navItems.map((item, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "end" }}>
            <div className="adm-field"><label>Label</label><input value={item.label} onChange={e => { const navItems = [...data.navItems]; navItems[i] = { ...navItems[i], label: e.target.value }; setData({ ...data, navItems }); }} /></div>
            <div className="adm-field"><label>URL</label><input value={item.href} onChange={e => { const navItems = [...data.navItems]; navItems[i] = { ...navItems[i], href: e.target.value }; setData({ ...data, navItems }); }} /></div>
            <button className="adm-btn adm-btn-danger" onClick={() => setData({ ...data, navItems: data.navItems.filter((_, j) => j !== i) })}>×</button>
          </div>
        ))}
        <button className="adm-btn adm-btn-secondary" onClick={() => setData({ ...data, navItems: [...data.navItems, { label: "", href: "" }] })}>+ Add Nav Item</button>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">Footer Groups</h3>
        {data.footerGroups.map((group, gi) => (
          <div key={gi} style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", marginBottom: "1rem" }}>
            <div className="adm-field"><label>Group Title</label><input value={group.title} onChange={e => { const footerGroups = [...data.footerGroups]; footerGroups[gi] = { ...footerGroups[gi], title: e.target.value }; setData({ ...data, footerGroups }); }} /></div>
            {group.links.map((link, li) => (
              <div key={li} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: "0.5rem", marginBottom: "0.25rem", alignItems: "end" }}>
                <div className="adm-field"><label>Label</label><input value={link.label} onChange={e => { const fg = [...data.footerGroups]; fg[gi] = { ...fg[gi], links: fg[gi].links.map((l, j) => j === li ? { ...l, label: e.target.value } : l) }; setData({ ...data, footerGroups: fg }); }} /></div>
                <div className="adm-field"><label>URL</label><input value={link.href} onChange={e => { const fg = [...data.footerGroups]; fg[gi] = { ...fg[gi], links: fg[gi].links.map((l, j) => j === li ? { ...l, href: e.target.value } : l) }; setData({ ...data, footerGroups: fg }); }} /></div>
                <button className="adm-btn adm-btn-danger" onClick={() => { const fg = [...data.footerGroups]; fg[gi] = { ...fg[gi], links: fg[gi].links.filter((_, j) => j !== li) }; setData({ ...data, footerGroups: fg }); }}>×</button>
              </div>
            ))}
            <button className="adm-btn adm-btn-secondary" style={{ marginTop: "0.5rem" }} onClick={() => { const fg = [...data.footerGroups]; fg[gi] = { ...fg[gi], links: [...fg[gi].links, { label: "", href: "" }] }; setData({ ...data, footerGroups: fg }); }}>+ Add Link</button>
          </div>
        ))}
      </div>
    </div>
  );
}
