import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const arc = [
  { stage: "Marketing Leader", years: "2012 — 2018" },
  { stage: "Business Strategist", years: "2018 — 2020" },
  { stage: "Chief Marketing Officer", years: "2020 — 2024" },
  { stage: "Strategic Growth Consultant", years: "2024 — Present" },
];

export function MeetAbdullah() {
  return (
    <section className="exec-section" id="about" aria-labelledby="meet-title">
      <Container>
        <div className="meet-grid">
          <figure className="meet-portrait">
            <Image
              src="/images/abdullah2.jpg"
              alt="Abdullah Al Alamin on the TEDxBUET stage, powered by Betopia Group."
              fill
              sizes="(max-width: 900px) 100vw, 480px"
            />
          </figure>
          <div className="meet-copy">
            <span className="eyebrow">Meet Abdullah</span>
            <h2 id="meet-title">An operator in the boardroom.</h2>
            <p>
              Group CMO of Betopia Group. Fourteen years inside Bangladesh&rsquo;s most demanding
              marketing environments &mdash; FMCG turnarounds, conglomerate portfolios, AI
              transformation.
            </p>
            <p>
              The work is operator-first: brand as a business discipline, AI as a craft tool, and a
              small set of principles that have produced measurable outcomes across nine businesses
              and forty brands.
            </p>
            <Link href="/about" className="meet-link">
              Read the full bio →
            </Link>
          </div>
        </div>

        <div className="meet-arc" aria-label="Career arc">
          {arc.map((item) => (
            <div key={item.stage} className="meet-arc__item">
              <span className="meet-arc__years">{item.years}</span>
              <span className="meet-arc__stage">{item.stage}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
// WCAG AAA definitions: AI = Artificial Intelligence, FMCG = Fast-Moving Consumer Goods
