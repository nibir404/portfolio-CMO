import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function EditorialHero() {
  const { hero } = editorial;

  return (
    <section className="section-card" id="top" style={{ marginTop: "110px" }}>
      <div className="hero-pipely">
        
        {/* Left Column: Text + CTA + Avatars */}
        <div className="hero-left-pipely">
          <Reveal>
            <span className="kicker" style={{ marginBottom: "12px" }}>{hero.kicker}</span>
          </Reveal>
          <Reveal>
            <h1 dangerouslySetInnerHTML={{ __html: hero.titleHtml }} />
          </Reveal>

          <Reveal>
            <p className="lead">
              {hero.lead}
            </p>
          </Reveal>

          <Reveal>
            <div className="btn-row-pipely">
              <Link className="btn btn--lime" href="#contact">
                {hero.primaryCta.label}
              </Link>
            </div>
          </Reveal>

          <Reveal>
            {/* Brand Logo Stack Strip */}
            <div className="avatar-row-wrap" style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "24px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "26px", padding: "0 6px", backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid rgba(8, 8, 10, 0.08)" }}>
                  <Image src="/images/Brand-1.png" alt="Board 1" width={48} height={16} style={{ objectFit: "contain" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "26px", padding: "0 6px", backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid rgba(8, 8, 10, 0.08)" }}>
                  <Image src="/images/Brand-2.png" alt="Board 2" width={48} height={16} style={{ objectFit: "contain" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "26px", padding: "0 6px", backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid rgba(8, 8, 10, 0.08)" }}>
                  <Image src="/images/Brand-3.png" alt="Board 3" width={48} height={16} style={{ objectFit: "contain" }} />
                </div>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--color-surface)", backgroundColor: "var(--color-ink)", padding: "3px 8px", borderRadius: "999px", lineHeight: "1" }}>+10</span>
              </div>
              <span className="avatar-row-text" style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--color-ink-soft)" }}>
                10+ global corporate boards shaped by Abdullah
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Vertical Rounded Portrait */}
        <div className="hero-right-pipely">
          <Reveal>
            <div className="hero-portrait-card-pipely">
              <Image
                src="/images/Hero-abdullah-CMO.avif"
                alt="Abdullah Al Alamin — Group Chief Marketing Officer of Betopia Group and Doctoral AI Researcher"
                width={380}
                height={480}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
                priority
              />
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence