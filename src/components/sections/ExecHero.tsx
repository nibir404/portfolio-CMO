import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function ExecHero() {
  return (
    <section className="exec-hero" aria-labelledby="exec-hero-title">
      <Container>
        <div className="exec-hero__grid">
          <div className="exec-hero__copy">
            <span className="eyebrow">Group CMO · Betopia Group</span>
            <h1 id="exec-hero-title" className="exec-hero__title">
              I help boards and CEOs grow, lead markets, and expand globally.
            </h1>
            <p className="exec-hero__subhead">
              Operator-led marketing leadership, brand transformation, and AI strategy &mdash; for
              the organisations shaping Bangladesh, South Asia, and the GCC.
            </p>
            <div className="exec-hero__actions">
              <Link href="#inquiry" className="btn btn--primary">
                Discuss Opportunity
              </Link>
            </div>
          </div>
          <figure className="exec-hero__media">
            <Image
              src="/images/4.jpg"
              alt="Abdullah Al Alamin on stage at an executive leadership event."
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
              quality={90}
            />
          </figure>
        </div>
      </Container>
    </section>
  );
}
// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence, GCC = Gulf Cooperation Council
