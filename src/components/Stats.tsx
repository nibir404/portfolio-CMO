const stats = [
  { num: "01", value: 15, suffix: "+", label: "Years of Leadership", desc: "Building, scaling, and transforming organizations across multiple industries." },
  { num: "02", value: 10, suffix: "+", label: "Ventures Built", desc: "From startups to established brands — creating platforms that empower people." },
  { num: "03", value: 500, suffix: "K+", label: "Lives Impacted", desc: "Through direct engagement, mentorship, and ecosystem-wide programs." },
  { num: "04", value: 100, suffix: "+", label: "Talks & Engagements", desc: "Keynotes, panels, and podcasts across international stages." },
];

export default function Stats() {
  return (
    <section className="stats snap-section" aria-labelledby="stats-heading">
      <div className="container">
        <div className="chapter-h reveal">
          <span className="num">03</span>
          <span className="name">The Impact</span>
        </div>

        <h2 id="stats-heading" className="display-section reveal" style={{ marginBottom: "var(--space-5)" }}>
          Numbers That{" "}
          <span style={{ fontStyle: "italic", fontFamily: "var(--font-quote)", color: "var(--accent)" }}>
            speak
          </span>.
        </h2>

        <ol className="stats-list reveal-stagger">
          {stats.map((s) => (
            <li key={s.num} className="stat-row">
              <div className="stat-row-num">{s.num}</div>
              <div className="stat-row-value">
                <span data-counter={s.value}>0</span>
                <span>{s.suffix}</span>
              </div>
              <div className="stat-row-text">
                <div className="stat-row-label">{s.label}</div>
                <p className="stat-row-desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}