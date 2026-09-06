"use client";

import { useEffect, useState } from "react";

interface ProfileData {
  name: string;
  jobTitle: string;
  worksFor: string;
  location: string;
  shortBio: string;
  paragraphs: string[];
  email: string;
  phone?: string;
  calCom: string;
  social: Array<{ label: string; href: string }>;
  sameAs: string[];
  credentials: string[];
  career: Array<{ year: string; role: string; organisation: string; note?: string }>;
  beyond: string[];
}

export default function ProfileAdmin() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/profile").then((r) => r.json()).then((j) => { if (j.data) setData(j.data); setLoading(false); });
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true); setMessage("");
    const res = await fetch("/api/admin/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setMessage(res.ok ? "Saved successfully!" : "Save failed");
    setSaving(false);
  };

  if (loading) return <div className="adm-loading">Loading...</div>;
  if (!data) return <div className="adm-empty">No profile data. Seed the database first.</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div><h1 className="adm-page-title">Profile</h1><p className="adm-page-desc" style={{ margin: 0 }}>Personal info, bio, career timeline</p></div>
        <button className="adm-btn adm-btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
      </div>
      {message && <div className={message.includes("success") ? "adm-success" : "adm-error"}>{message}</div>}

      <div className="adm-card">
        <h3 className="adm-card-title">Basic Info</h3>
        <div className="adm-field"><label>Name</label><input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} /></div>
        <div className="adm-field"><label>Job Title</label><input value={data.jobTitle} onChange={(e) => setData({ ...data, jobTitle: e.target.value })} /></div>
        <div className="adm-field"><label>Works For</label><input value={data.worksFor} onChange={(e) => setData({ ...data, worksFor: e.target.value })} /></div>
        <div className="adm-field"><label>Location</label><input value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} /></div>
        <div className="adm-field"><label>Email</label><input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /></div>
        <div className="adm-field"><label>Cal.com URL</label><input value={data.calCom} onChange={(e) => setData({ ...data, calCom: e.target.value })} /></div>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">Bio</h3>
        <div className="adm-field"><label>Short Bio</label><textarea value={data.shortBio} onChange={(e) => setData({ ...data, shortBio: e.target.value })} /></div>
        {data.paragraphs.map((p, i) => (
          <div key={i} className="adm-field">
            <label>Paragraph {i + 1}</label>
            <textarea value={p} onChange={(e) => { const paragraphs = [...data.paragraphs]; paragraphs[i] = e.target.value; setData({ ...data, paragraphs }); }} />
          </div>
        ))}
        <button className="adm-btn adm-btn-secondary" onClick={() => setData({ ...data, paragraphs: [...data.paragraphs, ""] })}>+ Add Paragraph</button>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">Career Timeline</h3>
        {data.career.map((c, i) => (
          <div key={i} style={{ padding: "0.75rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", marginBottom: "0.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <div className="adm-field"><label>Year</label><input value={c.year} onChange={(e) => { const career = [...data.career]; career[i] = { ...career[i], year: e.target.value }; setData({ ...data, career }); }} /></div>
              <div className="adm-field"><label>Organisation</label><input value={c.organisation} onChange={(e) => { const career = [...data.career]; career[i] = { ...career[i], organisation: e.target.value }; setData({ ...data, career }); }} /></div>
            </div>
            <div className="adm-field"><label>Role</label><input value={c.role} onChange={(e) => { const career = [...data.career]; career[i] = { ...career[i], role: e.target.value }; setData({ ...data, career }); }} /></div>
            <div className="adm-field"><label>Note</label><input value={c.note || ""} onChange={(e) => { const career = [...data.career]; career[i] = { ...career[i], note: e.target.value }; setData({ ...data, career }); }} /></div>
            <button className="adm-btn adm-btn-danger" style={{ marginTop: "0.25rem" }} onClick={() => { const career = data.career.filter((_, j) => j !== i); setData({ ...data, career }); }}>Remove</button>
          </div>
        ))}
        <button className="adm-btn adm-btn-secondary" onClick={() => setData({ ...data, career: [...data.career, { year: "", role: "", organisation: "", note: "" }] })}>+ Add Career Entry</button>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">Credentials (one per line)</h3>
        <div className="adm-field"><textarea value={data.credentials.join("\n")} onChange={(e) => setData({ ...data, credentials: e.target.value.split("\n") })} /></div>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">Social Links</h3>
        {data.social.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "end" }}>
            <div className="adm-field"><label>Label</label><input value={s.label} onChange={(e) => { const social = [...data.social]; social[i] = { ...social[i], label: e.target.value }; setData({ ...data, social }); }} /></div>
            <div className="adm-field"><label>URL</label><input value={s.href} onChange={(e) => { const social = [...data.social]; social[i] = { ...social[i], href: e.target.value }; setData({ ...data, social }); }} /></div>
            <button className="adm-btn adm-btn-danger" onClick={() => setData({ ...data, social: data.social.filter((_, j) => j !== i) })}>×</button>
          </div>
        ))}
        <button className="adm-btn adm-btn-secondary" onClick={() => setData({ ...data, social: [...data.social, { label: "", href: "" }] })}>+ Add Social Link</button>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">Beyond Work (one per line)</h3>
        <div className="adm-field"><textarea value={data.beyond.join("\n")} onChange={(e) => setData({ ...data, beyond: e.target.value.split("\n") })} /></div>
      </div>
    </div>
  );
}
