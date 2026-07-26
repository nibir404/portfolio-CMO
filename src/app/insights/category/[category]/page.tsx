import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InsightCard } from "@/components/cards/InsightCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getInsightsByCategory, isInsightCategory } from "@/lib/content";
import {
  insightCategories,
  insightCategoryLabels,
  insightCategoryDescriptions,
} from "@/lib/routes";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

type Params = { category: string };

export function generateStaticParams() {
  return insightCategories.map((category) => ({ category }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isInsightCategory(params.category)) return {};
  const label = insightCategoryLabels[params.category];
  const description = insightCategoryDescriptions[params.category];
  return buildPageMetadata({
    title: `${label} Insights | Abdullah Al Alamin`,
    description,
    path: `/insights/category/${params.category}`,
  });
}

export default function InsightCategoryPage({ params }: { params: Params }) {
  if (!isInsightCategory(params.category)) notFound();
  const label = insightCategoryLabels[params.category];
  const description = insightCategoryDescriptions[params.category];
  const items = getInsightsByCategory(params.category);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
          { name: label, href: `/insights/category/${params.category}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
          { name: label, href: `/insights/category/${params.category}` },
        ]}
      />
      <Section compact ariaLabelledBy="category-title">
        <Container>
          <span className="eyebrow">Insights · {label}</span>
          <h1 id="category-title">{label}.</h1>
          <p className="page-hero__intro">{description}</p>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="category-grid-title">
        <Container>
          <SectionHeading
            eyebrow={`${items.length} ${items.length === 1 ? "piece" : "pieces"}`}
            title={`All ${label.toLowerCase()} insights.`}
            id="category-grid-title"
          />
          <div className="filter-row" aria-label="Insight categories">
            {insightCategories.map((category) => (
              <a
                key={category}
                className="filter-chip"
                aria-current={category === params.category ? "page" : undefined}
                href={`/insights/category/${category}`}
              >
                {insightCategoryLabels[category]}
              </a>
            ))}
          </div>
          <div className="grid grid--3">
            {items.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="category-cta-title">
        <Container>
          <div className="split" style={{ alignItems: "center" }}>
            <div>
              <h2 id="category-cta-title">One insight a week.</h2>
              <p className="section-heading__copy">
                AlaminWeekly lands every Monday with one framework from the operator&rsquo;s desk.
              </p>
            </div>
            <div className="actions">
              <ButtonLink href="/newsletter">Join AlaminWeekly</ButtonLink>
              <ButtonLink href="/insights" variant="ghost">All insights</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
