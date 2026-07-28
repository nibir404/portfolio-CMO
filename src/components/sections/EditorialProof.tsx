import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { editorial } from "@/content/editorial";

export function EditorialProof() {
  const { proof } = editorial;
  return (
    <section
      className="editorial-section editorial-section--proof"
      id="proof"
      aria-labelledby="proof-title"
    >
      <div className="wrap">
        <Reveal>
          <div className="proof-head">
            <span className="kicker">{proof.kicker}</span>
            <h2 id="proof-title" className="section-title">
              {proof.title}
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="stat-grid" aria-label="Commercial outcomes">
            {proof.stats.map((stat) => (
              <div key={stat.label}>
                <div className="stat__n">
                  <CountUp value={stat.value} />
                </div>
                <div className="stat__l">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="logos-strip" aria-label="Past and current leadership roles">
            {proof.logos.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
          <p className="sectors">{proof.sectors}</p>
        </Reveal>
      </div>
    </section>
  );
}

// WCAG AAA definitions: FMCG = Fast-Moving Consumer Goods, APAC = Asia-Pacific,
// GCC = Gulf Cooperation Council, AI = Artificial Intelligence