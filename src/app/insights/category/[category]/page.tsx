import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InsightCard } from "@/components/cards/InsightCard";
import { getInsightsByCategory, isInsightCategory } from "@/lib/content";
import { insightCategories, insightCategoryLabels, insightCategoryDescriptions } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { trail } from "@/lib/breadcrumbs";

type Params = { category: string };

const categoryImages: Record<string, string> = {
  "brand-strategy": "/images/all side photo/281c4ba9-98ef-4e55-9218-1c70669e5558.png",
  "ai-in-marketing": "/images/all side photo/60b933f1-ce48-40db-8e69-d47caddbf9c3.png",
  "leadership": "/images/all side photo/69ad2fc3-8a45-4119-82fe-5e94b9675ddd.png",
  "reputation-crisis": "/images/all side photo/7f48d23f-b588-426c-86b7-05ca1b3bfab5.png",
  "national-branding": "/images/all side photo/bf36be97-595f-4f03-b208-7f93513e1080 (1).png",
};

export function generateStaticParams() {
  return insightCategories.map((category) => ({ category }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isInsightCategory(params.category)) return {};
  const label = insightCategoryLabels[params.category];
  const description = insightCategoryDescriptions[params.category];
  return buildPageMetadata({ title: `${label} Insights | Abdullah Al Alamin`, description, path: `/insights/category/${params.category}` });
}

export default function InsightCategoryPage({ params }: { params: Params }) {
  if (!isInsightCategory(params.category)) notFound();
  const label = insightCategoryLabels[params.category];
  const description = insightCategoryDescriptions[params.category];
  const items = getInsightsByCategory(params.category);
  const heroImage = categoryImages[params.category] ?? "/images/all side photo/c5307815-15e9-4005-addb-f5450988e31e.png";

  const crumbs = trail(
    { name: "Insights", href: "/insights" },
    { name: label, href: `/insights/category/${params.category}` },
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        id="category"
        kicker={`Insights · ${label}`}
        title={<>{label}.</>}
        lead={description}
        image={{ src: heroImage, alt: `${label} insights.` }}
      />

      <Section surface="surface" ariaLabelledBy="category-grid-title">
        <Container>
          <EyebrowHeading eyebrow={`${items.length} ${items.length === 1 ? "piece" : "pieces"}`} title={`All ${label.toLowerCase()} insights.`} id="category-grid-title" />
          <div className="filter-row" aria-label="Insight categories">
            {insightCategories.map((category) => (
              <a key={category} className="filter-chip" aria-current={category === params.category ? "page" : undefined} href={`/insights/category/${category}`}>{insightCategoryLabels[category]}</a>
            ))}
          </div>
          <div className="grid grid--3">
            {items.map((insight) => (<InsightCard key={insight.slug} insight={insight} />))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="category-cta-title">
        <Container>
          <div className="split" style={{ alignItems: "center" }}>
            <div>
              <h2 id="category-cta-title">One insight a week.</h2>
              <p className="section-heading__copy">AlaminWeekly lands every Monday with one framework from the operator&rsquo;s desk.</p>
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