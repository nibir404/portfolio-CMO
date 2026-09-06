"use client";

import { useEffect, useState } from "react";

interface EditorialData {
  hero: {
    kicker: string;
    titleHtml: string;
    subtitleHtml: string;
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    role: string;
  };
  audience: {
    kicker: string;
    title: string;
    cards: Array<{ num: string; title: string; body: string }>;
  };
  services: {
    kicker: string;
    title: string;
    items: Array<{ num: string; title: string; tagline: string; who: string; what: string; get: string; engagement: string; cta: string }>;
    footnote: string;
  };
  proof: {
    kicker: string;
    title: string;
    stats: Array<{ value: string; label: string }>;
    logos: string[];
    sectors: string;
  };
  about: {
    kicker: string;
    title: string;
    paragraphs: string[];
    beliefs: Array<{ headline: string; body: string }>;
  };
  process: {
    kicker: string;
    title: string;
    steps: Array<{ n: string; title: string; body: string }>;
  };
  insights: {
    kicker: string;
    title: string;
    posts: Array<{ slug: string; tag: string; title: string; excerpt: string }>;
  };
  contact: {
    kicker: string;
    title: string;
    big: string;
    email: string;
    areaOptions: string[];
    formNote: string;
  };
}

export default function EditorialAdmin() {
  const [data, setData] = useState<EditorialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    fetch("/api/admin/editorial")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) setData(json.data);
        setLoading(false);
      });
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/editorial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setMessage("Saved successfully!");
      else setMessage("Save failed");
    } catch {
      setMessage("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="adm-loading">Loading...</div>;
  if (!data) return <div className="adm-empty">No editorial data found. Please seed the database first.</div>;

  const tabs = [
    { key: "hero", label: "Hero" },
    { key: "audience", label: "Audience" },
    { key: "services", label: "Services" },
    { key: "proof", label: "Proof" },
    { key: "about", label: "About" },
    { key: "process", label: "Process" },
    { key: "insights", label: "Insights" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 className="adm-page-title">Editorial / Homepage</h1>
          <p className="adm-page-desc" style={{ margin: 0 }}>Manage all homepage sections</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && <div className={message.includes("success") ? "adm-success" : "adm-error"}>{message}</div>}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.5rem", flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "0.6rem 1rem",
              background: activeTab === tab.key ? "rgba(16, 185, 129, 0.1)" : "transparent",
              border: "none",
              borderBottom: activeTab === tab.key ? "2px solid #10b981" : "2px solid transparent",
              color: activeTab === tab.key ? "#10b981" : "#888",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Tab */}
      {activeTab === "hero" && (
        <div className="adm-card">
          <h3 className="adm-card-title">Hero Section</h3>
          <div className="adm-field">
            <label>Kicker</label>
            <input value={data.hero.kicker} onChange={(e) => setData({ ...data, hero: { ...data.hero, kicker: e.target.value } })} />
          </div>
          <div className="adm-field">
            <label>Title (Wrap in *asterisks* to highlight text)</label>
            <textarea 
              value={data.hero.titleHtml.replace(/<em>(.*?)<\/em>/g, '*$1*').replace(/<br\s*\/?>/gi, '\n')} 
              onChange={(e) => setData({ ...data, hero: { ...data.hero, titleHtml: e.target.value.replace(/\n/g, '<br />').replace(/\*(.*?)\*/g, '<em>$1</em>') } })} 
            />
          </div>
          <div className="adm-field">
            <label>Subtitle (Wrap in *asterisks* to highlight text)</label>
            <textarea 
              value={data.hero.subtitleHtml.replace(/<em>(.*?)<\/em>/g, '*$1*').replace(/<br\s*\/?>/gi, '\n')} 
              onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitleHtml: e.target.value.replace(/\n/g, '<br />').replace(/\*(.*?)\*/g, '<em>$1</em>') } })} 
            />
          </div>
          <div className="adm-field">
            <label>Lead Paragraph</label>
            <textarea value={data.hero.lead} onChange={(e) => setData({ ...data, hero: { ...data.hero, lead: e.target.value } })} />
          </div>
          <div className="adm-field">
            <label>Primary CTA Label</label>
            <input value={data.hero.primaryCta.label} onChange={(e) => setData({ ...data, hero: { ...data.hero, primaryCta: { ...data.hero.primaryCta, label: e.target.value } } })} />
          </div>
          <div className="adm-field">
            <label>Primary CTA Link</label>
            <input value={data.hero.primaryCta.href} onChange={(e) => setData({ ...data, hero: { ...data.hero, primaryCta: { ...data.hero.primaryCta, href: e.target.value } } })} />
          </div>
          <div className="adm-field">
            <label>Role Line</label>
            <input value={data.hero.role} onChange={(e) => setData({ ...data, hero: { ...data.hero, role: e.target.value } })} />
          </div>
        </div>
      )}

      {/* Audience Tab */}
      {activeTab === "audience" && (
        <div className="adm-card">
          <h3 className="adm-card-title">Audience Section</h3>
          <div className="adm-field">
            <label>Kicker</label>
            <input value={data.audience.kicker} onChange={(e) => setData({ ...data, audience: { ...data.audience, kicker: e.target.value } })} />
          </div>
          <div className="adm-field">
            <label>Title</label>
            <input value={data.audience.title} onChange={(e) => setData({ ...data, audience: { ...data.audience, title: e.target.value } })} />
          </div>
          {data.audience.cards.map((card, i) => (
            <div key={i} style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", marginBottom: "0.75rem" }}>
              <div className="adm-field">
                <label>Card {card.num} — Title</label>
                <input value={card.title} onChange={(e) => {
                  const cards = [...data.audience.cards];
                  cards[i] = { ...cards[i], title: e.target.value };
                  setData({ ...data, audience: { ...data.audience, cards } });
                }} />
              </div>
              <div className="adm-field">
                <label>Body</label>
                <textarea value={card.body} onChange={(e) => {
                  const cards = [...data.audience.cards];
                  cards[i] = { ...cards[i], body: e.target.value };
                  setData({ ...data, audience: { ...data.audience, cards } });
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Services Tab */}
      {activeTab === "services" && (
        <div className="adm-card">
          <h3 className="adm-card-title">Services Section (Homepage Display)</h3>
          <div className="adm-field">
            <label>Kicker</label>
            <input value={data.services.kicker} onChange={(e) => setData({ ...data, services: { ...data.services, kicker: e.target.value } })} />
          </div>
          <div className="adm-field">
            <label>Title</label>
            <input value={data.services.title} onChange={(e) => setData({ ...data, services: { ...data.services, title: e.target.value } })} />
          </div>
          <div className="adm-field">
            <label>Footnote</label>
            <textarea value={data.services.footnote} onChange={(e) => setData({ ...data, services: { ...data.services, footnote: e.target.value } })} />
          </div>
          {data.services.items.map((item, i) => (
            <div key={i} style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", marginBottom: "0.75rem" }}>
              <h4 style={{ color: "#10b981", fontSize: "0.85rem", margin: "0 0 0.75rem" }}>{item.num} — {item.title}</h4>
              <div className="adm-field"><label>Title</label><input value={item.title} onChange={(e) => { const items = [...data.services.items]; items[i] = { ...items[i], title: e.target.value }; setData({ ...data, services: { ...data.services, items } }); }} /></div>
              <div className="adm-field"><label>Tagline</label><input value={item.tagline} onChange={(e) => { const items = [...data.services.items]; items[i] = { ...items[i], tagline: e.target.value }; setData({ ...data, services: { ...data.services, items } }); }} /></div>
              <div className="adm-field"><label>Who</label><textarea value={item.who} onChange={(e) => { const items = [...data.services.items]; items[i] = { ...items[i], who: e.target.value }; setData({ ...data, services: { ...data.services, items } }); }} /></div>
              <div className="adm-field"><label>What</label><textarea value={item.what} onChange={(e) => { const items = [...data.services.items]; items[i] = { ...items[i], what: e.target.value }; setData({ ...data, services: { ...data.services, items } }); }} /></div>
              <div className="adm-field"><label>CTA Text</label><input value={item.cta} onChange={(e) => { const items = [...data.services.items]; items[i] = { ...items[i], cta: e.target.value }; setData({ ...data, services: { ...data.services, items } }); }} /></div>
            </div>
          ))}
        </div>
      )}

      {/* Proof Tab */}
      {activeTab === "proof" && (
        <div className="adm-card">
          <h3 className="adm-card-title">Proof / Track Record Section</h3>
          <div className="adm-field"><label>Kicker</label><input value={data.proof.kicker} onChange={(e) => setData({ ...data, proof: { ...data.proof, kicker: e.target.value } })} /></div>
          <div className="adm-field"><label>Title</label><input value={data.proof.title} onChange={(e) => setData({ ...data, proof: { ...data.proof, title: e.target.value } })} /></div>
          <div className="adm-field"><label>Sectors</label><textarea value={data.proof.sectors} onChange={(e) => setData({ ...data, proof: { ...data.proof, sectors: e.target.value } })} /></div>
          <h4 style={{ color: "#aaa", fontSize: "0.85rem", marginTop: "1rem" }}>Stats</h4>
          {data.proof.stats.map((stat, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <input value={stat.value} placeholder="Value" onChange={(e) => { const stats = [...data.proof.stats]; stats[i] = { ...stats[i], value: e.target.value }; setData({ ...data, proof: { ...data.proof, stats } }); }} style={{ padding: "0.5rem 0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#e4e4e7", fontSize: "0.88rem" }} />
              <input value={stat.label} placeholder="Label" onChange={(e) => { const stats = [...data.proof.stats]; stats[i] = { ...stats[i], label: e.target.value }; setData({ ...data, proof: { ...data.proof, stats } }); }} style={{ padding: "0.5rem 0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#e4e4e7", fontSize: "0.88rem" }} />
            </div>
          ))}
          <h4 style={{ color: "#aaa", fontSize: "0.85rem", marginTop: "1rem" }}>Logos (comma-separated)</h4>
          <div className="adm-field">
            <textarea value={data.proof.logos.join(", ")} onChange={(e) => setData({ ...data, proof: { ...data.proof, logos: e.target.value.split(",").map(s => s.trim()) } })} />
          </div>
        </div>
      )}

      {/* About Tab */}
      {activeTab === "about" && (
        <div className="adm-card">
          <h3 className="adm-card-title">About Section</h3>
          <div className="adm-field"><label>Kicker</label><input value={data.about.kicker} onChange={(e) => setData({ ...data, about: { ...data.about, kicker: e.target.value } })} /></div>
          <div className="adm-field"><label>Title</label><input value={data.about.title} onChange={(e) => setData({ ...data, about: { ...data.about, title: e.target.value } })} /></div>
          {data.about.paragraphs.map((p, i) => (
            <div key={i} className="adm-field">
              <label>Paragraph {i + 1}</label>
              <textarea value={p} onChange={(e) => { const paragraphs = [...data.about.paragraphs]; paragraphs[i] = e.target.value; setData({ ...data, about: { ...data.about, paragraphs } }); }} />
            </div>
          ))}
          <h4 style={{ color: "#aaa", fontSize: "0.85rem", marginTop: "1rem" }}>Beliefs</h4>
          {data.about.beliefs.map((b, i) => (
            <div key={i} style={{ padding: "0.75rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", marginBottom: "0.5rem" }}>
              <div className="adm-field"><label>Headline</label><input value={b.headline} onChange={(e) => { const beliefs = [...data.about.beliefs]; beliefs[i] = { ...beliefs[i], headline: e.target.value }; setData({ ...data, about: { ...data.about, beliefs } }); }} /></div>
              <div className="adm-field"><label>Body</label><input value={b.body} onChange={(e) => { const beliefs = [...data.about.beliefs]; beliefs[i] = { ...beliefs[i], body: e.target.value }; setData({ ...data, about: { ...data.about, beliefs } }); }} /></div>
            </div>
          ))}
        </div>
      )}

      {/* Process Tab */}
      {activeTab === "process" && (
        <div className="adm-card">
          <h3 className="adm-card-title">Process / How It Works</h3>
          <div className="adm-field"><label>Kicker</label><input value={data.process.kicker} onChange={(e) => setData({ ...data, process: { ...data.process, kicker: e.target.value } })} /></div>
          <div className="adm-field"><label>Title</label><input value={data.process.title} onChange={(e) => setData({ ...data, process: { ...data.process, title: e.target.value } })} /></div>
          {data.process.steps.map((step, i) => (
            <div key={i} style={{ padding: "0.75rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", marginBottom: "0.5rem" }}>
              <div className="adm-field"><label>{step.n} — Title</label><input value={step.title} onChange={(e) => { const steps = [...data.process.steps]; steps[i] = { ...steps[i], title: e.target.value }; setData({ ...data, process: { ...data.process, steps } }); }} /></div>
              <div className="adm-field"><label>Body</label><textarea value={step.body} onChange={(e) => { const steps = [...data.process.steps]; steps[i] = { ...steps[i], body: e.target.value }; setData({ ...data, process: { ...data.process, steps } }); }} /></div>
            </div>
          ))}
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === "insights" && (
        <div className="adm-card">
          <h3 className="adm-card-title">Insights Preview (Homepage)</h3>
          <div className="adm-field"><label>Kicker</label><input value={data.insights.kicker} onChange={(e) => setData({ ...data, insights: { ...data.insights, kicker: e.target.value } })} /></div>
          <div className="adm-field"><label>Title</label><input value={data.insights.title} onChange={(e) => setData({ ...data, insights: { ...data.insights, title: e.target.value } })} /></div>
          {data.insights.posts.map((post, i) => (
            <div key={i} style={{ padding: "0.75rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", marginBottom: "0.5rem" }}>
              <div className="adm-field"><label>Slug</label><input value={post.slug} onChange={(e) => { const posts = [...data.insights.posts]; posts[i] = { ...posts[i], slug: e.target.value }; setData({ ...data, insights: { ...data.insights, posts } }); }} /></div>
              <div className="adm-field"><label>Tag</label><input value={post.tag} onChange={(e) => { const posts = [...data.insights.posts]; posts[i] = { ...posts[i], tag: e.target.value }; setData({ ...data, insights: { ...data.insights, posts } }); }} /></div>
              <div className="adm-field"><label>Title</label><input value={post.title} onChange={(e) => { const posts = [...data.insights.posts]; posts[i] = { ...posts[i], title: e.target.value }; setData({ ...data, insights: { ...data.insights, posts } }); }} /></div>
              <div className="adm-field"><label>Excerpt</label><textarea value={post.excerpt} onChange={(e) => { const posts = [...data.insights.posts]; posts[i] = { ...posts[i], excerpt: e.target.value }; setData({ ...data, insights: { ...data.insights, posts } }); }} /></div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === "contact" && (
        <div className="adm-card">
          <h3 className="adm-card-title">Contact Section</h3>
          <div className="adm-field"><label>Kicker</label><input value={data.contact.kicker} onChange={(e) => setData({ ...data, contact: { ...data.contact, kicker: e.target.value } })} /></div>
          <div className="adm-field"><label>Title</label><input value={data.contact.title} onChange={(e) => setData({ ...data, contact: { ...data.contact, title: e.target.value } })} /></div>
          <div className="adm-field"><label>Description</label><textarea value={data.contact.big} onChange={(e) => setData({ ...data, contact: { ...data.contact, big: e.target.value } })} /></div>
          <div className="adm-field"><label>Email</label><input value={data.contact.email} onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })} /></div>
          <div className="adm-field"><label>Form Note</label><textarea value={data.contact.formNote} onChange={(e) => setData({ ...data, contact: { ...data.contact, formNote: e.target.value } })} /></div>
          <div className="adm-field">
            <label>Area Options (one per line)</label>
            <textarea value={data.contact.areaOptions.join("\n")} onChange={(e) => setData({ ...data, contact: { ...data.contact, areaOptions: e.target.value.split("\n") } })} />
          </div>
        </div>
      )}
    </div>
  );
}
