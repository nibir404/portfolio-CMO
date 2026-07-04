import Image from "next/image";

const metrics = [
  { value: "+38%", label: "Average brand recall lift across retained mandates over 12 months." },
  { value: "2.4M", label: "Reach per major campaign through owned, earned, and paid ecosystems." },
  { value: "55+", label: "Strategic mandates led across FMCG, media, education, and tech." },
  { value: "11M+", label: "Lifetime impressions engineered across brand and growth surfaces." },
];

export default function Impact() {
  return (
    <section id="impact" className="impact snap-section" aria-labelledby="impact-heading">
      <div className="container">
        <div className="chapter-h reveal">
          <span className="num">/08</span>
          <span className="name">The Impact</span>
        </div>

        <h2 id="impact-heading" className="display-section reveal" style={{ marginBottom: "var(--space-5)" }}>
          Numbers that{" "}
          <span className="italic-serif accent">compound.</span>
        </h2>

        <ol className="impact-grid reveal-stagger">
          {metrics.map((m, i) => (
            <li key={i} className="impact-cell">
              <span className="impact-cell-value">{m.value}</span>
              <p className="impact-cell-label">{m.label}</p>
            </li>
          ))}
        </ol>

        <figure className="impact-feature reveal">
          <div className="impact-feature-img">
            <Image
              src="/images/all side photo/bf36be97-595f-4f03-b208-7f93513e1080 (1).png"
              alt="Abdullah Al Amin — featured portrait"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="impact-feature-body">
            <blockquote className="impact-feature-quote">
              <p>
                &ldquo;A CMO&rsquo;s job is to compound — every campaign, every
                hire, every quarter should make the next one cheaper.&rdquo;
              </p>
            </blockquote>
            <div className="impact-feature-stats">
              <div>
                <span className="impact-feature-value">
                  11<small>M+</small>
                </span>
                <span className="impact-feature-label">Lifetime impressions</span>
              </div>
              <div>
                <span className="impact-feature-value">47%</span>
                <span className="impact-feature-label">Avg. engagement rate</span>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}