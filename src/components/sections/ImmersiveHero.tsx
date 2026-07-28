import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function ImmersiveHero() {
  return (
    <section className="immersive-hero" aria-labelledby="home-hero-title">
      <Container>
        <div className="hero-grid">
          {/* Left Column */}
          <div className="hero-col hero-col--left">
            <div className="status-badge">
              <span className="status-badge__dot"></span>
              <span className="status-badge__text">Currently accepting boardroom mandates</span>
            </div>
            <h1 id="home-hero-title" className="hero-headline">
              Alamin is solving business problems through AI and strategic brand repositioning.
            </h1>
          </div>

          {/* Center Column - Portrait Photo */}
          <div className="hero-col hero-col--center">
            <div className="hero-portrait-wrapper">
              <Image
                src="/images/7.jpg"
                alt="Abdullah Al Alamin portrait"
                width={480}
                height={600}
                priority
                className="hero-portrait"
              />
              <div className="hero-portrait-fade"></div>
            </div>
          </div>

          {/* Right Column */}
          <div className="hero-col hero-col--right">
            <p className="hero-bio">
              I transform ambitious businesses into AI-powered market leaders. An operator-first advisory practice built on fourteen years of scaling operations, rebuilding brand equity, and future-proofing organisations.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/contact" variant="primary">
                Discuss Transformation
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// WCAG AAA definitions: FMCG = Fast-Moving Consumer Goods
