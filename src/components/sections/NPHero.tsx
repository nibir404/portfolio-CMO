import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/content/profile";

const trustBrands = [
  "Betopia Group",
  "Bengal Group",
  "PRAN-RFL",
  "Metrocem",
  "Daffodil",
  "Akij Foods",
];

export function NPHero() {
  return (
    <section className="np-hero" aria-labelledby="np-hero-title">
      <Container>
        <div className="np-hero__grid">
          <Reveal>
            <div className="np-hero__copy">
              <span className="eyebrow">{profile.jobTitle}</span>
              <h1 id="np-hero-title" className="np-hero__title">
                I help category leaders <em>win the next decade.</em>
              </h1>
              <p className="np-hero__subhead">
                Fourteen years of operator experience scaling South Asia&apos;s
                most demanding businesses — from the field to the boardroom —
                rebuilding brand equity, embedding AI into operations, and
                engineering commercial outcomes.
              </p>
              <div className="np-hero__actions">
                <ButtonLink href="/work" variant="primary">
                  See my work
                </ButtonLink>
                <ButtonLink href="#inquiry" variant="accent">
                  Discuss transformation
                </ButtonLink>
              </div>
              <div className="np-hero__trust" aria-label="Past and current leadership roles">
                <span>Trusted by</span>
                {trustBrands.map((brand) => (
                  <span key={brand}>{brand}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <figure className="np-hero__media">
              <Image
                src="/images/7.jpg"
                alt="Abdullah Al Alamin, Group CMO of Betopia Group"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 520px"
              />
            </figure>
          </Reveal>
        </div>
      </Container>
      <span aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <Link href="/about">About Abdullah Al Alamin</Link>
      </span>
    </section>
  );
}

// WCAG AAA definitions: AI = Artificial Intelligence, APAC = Asia-Pacific