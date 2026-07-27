import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function ImmersiveHero() {
  return (
    <section className="immersive-hero" aria-labelledby="home-hero-title">
      <div className="immersive-hero__bg">
        <Image
          src="/images/boss-final-image.jpg"
          alt="Abdullah Al Alamin"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="immersive-hero__overlay" aria-hidden="true" />
      <Container>
        <div className="immersive-hero__copy">
          <h1 id="home-hero-title" className="immersive-hero__title">
            Abdullah Al <em>Alamin.</em>
          </h1>
          <p className="immersive-hero__subhead">
            Building brands that outlast the businesses that made them. Group Chief Marketing Officer at
            Betopia Group — with 14+ years turning FMCG, building-materials, and education portfolios into market leaders.
          </p>
          <div className="immersive-hero__actions">
            <ButtonLink href="/contact">Let&rsquo;s Connect</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

// WCAG AAA definitions: FMCG = Fast-Moving Consumer Goods
