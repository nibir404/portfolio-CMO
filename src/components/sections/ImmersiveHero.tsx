import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function ImmersiveHero() {
  return (
    <section className="immersive-hero" aria-labelledby="home-hero-title">
      <div className="immersive-hero__bg">
        <Image
          src="/images/7.jpg"
          alt="Abdullah Al Alamin"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="immersive-hero__overlay" aria-hidden="true" />
      <Container>
        <div className="immersive-hero__copy">
          <span className="eyebrow" style={{ color: "var(--color-accent)", display: "block", marginBottom: "var(--space-2)" }}>
            Business Transformation Advisor & AI Business Strategist
          </span>
          <h1 id="home-hero-title" className="immersive-hero__title">
            Abdullah Al <em>Alamin.</em>
          </h1>
          <p className="immersive-hero__subhead">
            I transform ambitious businesses into AI-powered market leaders. An operator-first advisory practice built on fourteen years of scaling operations, rebuilding brand equity, and future-proofing organisations.
          </p>
          <div className="immersive-hero__actions">
            <ButtonLink href="/contact">Discuss Transformation</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

// WCAG AAA definitions: FMCG = Fast-Moving Consumer Goods
