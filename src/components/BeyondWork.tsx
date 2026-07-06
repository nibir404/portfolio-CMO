import Image from "next/image";

type Entry = {
  n: string;
  title: string;
  desc: string;
};

const entries: Entry[] = [
  {
    n: "/01",
    title: "AI Enthusiast & Futurist",
    desc: "1,000+ completed courses in AI and machine learning; regular speaker on AI-powered marketing transformation.",
  },
  {
    n: "/02",
    title: "Marathon Runner",
    desc: "21km, 10km, and 7.5km finishes in national and international marathons.",
  },
  {
    n: "/03",
    title: "20+ Years in Scouting",
    desc: "Senior Scout Leader, Bangladesh Scout Naval Region; holder of the Scout Wood Badge leadership award.",
  },
  {
    n: "/04",
    title: "Rotary International",
    desc: "Committed to Service Above Self through health, education, and community-building initiatives.",
  },
  {
    n: "/05",
    title: "Community & Disaster Relief",
    desc: "Active contributor to youth empowerment and disaster relief programs across Bangladesh.",
  },
];

export default function BeyondWork() {
  return (
    <section id="beyond" className="beyond" aria-labelledby="beyond-heading">
      <div className="container">
        <div className="beyond-head">
          <span className="text-eyebrow chapter-h">
            <span className="num">/08</span>
            <span className="name">Beyond the Boardroom</span>
          </span>
          <h2 id="beyond-heading" className="display-section">
            The person behind the title<span className="italic-serif accent">.</span>
          </h2>
          <p>
            The chapters that don&rsquo;t fit on a deck &mdash; the running, the
            service, the lifelong learning.
          </p>
        </div>

        <figure className="beyond-portrait fx-scale-in">
          <Image
            src="/images/boss-2.jpg"
            alt="Abdullah Al Alamin — marathon and community service"
            fill
            sizes="(min-width: 768px) 480px, 90vw"
          />
        </figure>

        <div className="beyond-grid fx-stagger">
          {entries.map((e) => (
            <div className="beyond-card" key={e.n}>
              <span className="beyond-n">{e.n}</span>
              <div>
                <h3 className="beyond-title">{e.title}</h3>
                <p className="beyond-desc">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="beyond-principle fx-fade-up" style={{ marginTop: "var(--space-5)" }}>
          <p
            className="italic-serif"
            style={{
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              lineHeight: 1.4,
              color: "var(--ink)",
              margin: 0,
              maxWidth: "720px",
            }}
          >
            &ldquo;Legacy is Greater than Currency&rdquo;
            <span className="accent">.</span>
            <span
              style={{
                display: "block",
                marginTop: "var(--space-2)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--ink-soft)",
              }}
            >
              The principle that threads every chapter above
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}