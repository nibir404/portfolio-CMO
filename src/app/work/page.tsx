import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WorkCard } from "@/components/cards/WorkCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DraftClaimNotice } from "@/components/sections/DraftClaimNotice";
import { getAllWork } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies — Brand & Marketing Transformations | Abdullah Al Alamin",
  description:
    "Seven business transformations across FMCG, building materials, education, and conglomerate portfolios — with the scope, the decision, and the measurable outcome.",
  path: "/work",
});

export default function WorkIndexPage() {
  const items = getAllWork();
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }]} />
      <Section compact ariaLabelledBy="work-hero-title">
        <Container>
          <div className="page-hero__grid">
            <div>
              <span className="eyebrow">Case studies</span>
              <h1 id="work-hero-title">Seven businesses rebuilt.</h1>
              <p className="page-hero__intro">
                Each chapter is a business, a scope, a decision, and the outcome it produced.
              </p>
              <div className="actions mt-5">
                <ButtonLink href="/contact">Discuss a mandate</ButtonLink>
              </div>
            </div>
            <div>
              <span className="eyebrow">How to read</span>
              <p className="prose mt-3">
                Open any case study to see the situation, the decision, the execution, and the
                outcome. Each case links to the related service and to other work in the same
                category.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="filter-row" aria-label="Filter by sector">
            <span className="tag" aria-current="page">
              All
            </span>
            <span className="tag">FMCG</span>
            <span className="tag">Building Materials</span>
            <span className="tag">Conglomerate</span>
            <span className="tag">Education</span>
            <span className="tag">AI &amp; Technology</span>
          </div>
          <div className="grid grid--3">
            {items.map((item, index) => (
              <WorkCard key={item.slug} item={item} index={index} />
            ))}
          </div>
          <div className="mt-6">
            <DraftClaimNotice />
          </div>
        </Container>
      </Section>
    </>
  );
}

// WCAG AAA definitions: AI = Artificial Intelligence, FMCG = Fast-Moving Consumer Goods
