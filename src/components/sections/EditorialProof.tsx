import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { editorial } from "@/content/editorial";

export function EditorialProof() {
  const { proof } = editorial;
  
  const brandLogos = [
    "Brand-1.png",
    "Brand-2.png",
    "Brand-3.png",
    "Brand-4.png",
    "Brand-5.png",
    "Brand-6.png",
    "Brand-7.png",
    "Brand-8.png"
  ];

  return (
    <section
      className="section-card section-card--cream"
      id="proof"
      aria-labelledby="proof-title"
    >
      {/* Top Client Logos Strip */}
      <Reveal>
        <div className="logos-strip-pipely">
          <h3>World-class corporate groups shaped by Abdullah</h3>
          <div className="logo-marquee-container">
            <div className="logo-marquee-track" aria-hidden="true">
              {/* Copy 1 */}
              {brandLogos.map((brandFile, index) => (
                <Image
                  key={`c1-${brandFile}`}
                  src={`/images/${brandFile}`}
                  alt=""
                  width={140}
                  height={45}
                  className="brand-logo-img"
                />
              ))}
              {/* Copy 2 for Seamless Loop */}
              {brandLogos.map((brandFile, index) => (
                <Image
                  key={`c2-${brandFile}`}
                  src={`/images/${brandFile}`}
                  alt=""
                  width={140}
                  height={45}
                  className="brand-logo-img"
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Bottom Split Stats Layout */}
      <div className="stats-split-pipely">
        
        {/* Left Column: Bio / Pitch */}
        <Reveal>
          <div>
            <span className="kicker" style={{ marginBottom: "16px" }}>{proof.kicker}</span>
            <h2 id="proof-title" className="stats-bio-pipely">
              With over a decade of executive growth and P&amp;L leadership, Abdullah delivers scale-up solutions that empower corporate groups.
            </h2>
            <p className="sectors" style={{ color: "var(--color-ink-soft)", fontSize: "14px", marginTop: "24px" }}>
              {proof.sectors}
            </p>
          </div>
        </Reveal>

        {/* Right Column: 2x2 Metric Grid */}
        <Reveal>
          <div className="stats-grid-pipely" aria-label="Commercial outcomes">
            {proof.stats.map((stat) => (
              <div key={stat.label} className="stat-card-pipely">
                <span className="kicker-stat">{stat.label}</span>
                <div className="metric-stat">
                  <CountUp value={stat.value} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

// WCAG AAA definitions: FMCG = Fast-Moving Consumer Goods, APAC = Asia-Pacific,
// GCC = Gulf Cooperation Council, AI = Artificial Intelligence