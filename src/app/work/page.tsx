import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ImageBlock } from "@/components/ui/ImageBlock";
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
      <PageHero
        id="work"
        kicker="Case studies"
        title={<>Seven businesses <em>rebuilt</em>.</>}
        lead="Each chapter is a business, a scope, a decision, and the outcome it produced."
        actions={<ButtonLink href="/contact">Discuss a mandate</ButtonLink>}
        meta="Open any case study for the situation, the decision, the execution, and the outcome."
        image={{ src: "/images/hero-bg.jpeg", alt: "Working field texture — case studies." }}
        imagePosition="below"
      />

      <Section>
        <Container>
          <div className="filter-row" aria-label="Filter by sector">
            <span className="tag" aria-current="page">All</span>
            <span className="tag">FMCG</span>
            <span className="tag">Building Materials</span>
            <span className="tag">Conglomerate</span>
            <span className="tag">Education</span>
            <span className="tag">AI &amp; Technology</span>
          </div>
          <div className="grid grid--3">
            {items.map((item, index) => (<WorkCard key={item.slug} item={item} index={index} />))}
          </div>
          <div className="mt-6">
            <DraftClaimNotice />
          </div>
        </Container>
      </Section>

      <Section surface="surface">
        <Container>
          <ImageBlock src="/images/all side photo/bf36be97-595f-4f03-b208-7f93513e1080 (1).png" alt="Sector focus." aspect="21:9" caption="The credential is the work." />
        </Container>
      </Section>
    </>
  );
}

// WCAG AAA definitions: AI = Artificial Intelligence, FMCG = Fast-Moving Consumer Goods