import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InsightCard } from "@/components/cards/InsightCard";
import { getAllInsights, getFeaturedInsights } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { insightCategories, insightCategoryLabels } from "@/lib/routes";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { trail } from "@/lib/breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "Insights on Brand Strategy, AI Marketing & Leadership | Abdullah Al Alamin",
  description: "Frameworks and field notes on brand strategy, AI in marketing, crisis communication, and marketing leadership — from fourteen years of operator work.",
  path: "/insights",
});

export default function InsightsIndexPage() {
  const featured = getFeaturedInsights()[0];
  const rest = getAllInsights();
  const crumbs = trail({ name: "Insights", href: "/insights" });
  return (
    <>
      <JsonLd data={[blogSchema(), breadcrumbSchema(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        id="insights"
        kicker="Field notes"
        title={<>Field notes from the <em>operator&rsquo;s desk</em>.</>}
        lead="Frameworks, reversals, and the principle that earned its keep — from fourteen years of operator work."
        image={{ src: "/images/all side photo/c5307815-15e9-4005-addb-f5450988e31e.png", alt: "Working notes." }}
        imagePosition="below"
      />

      {featured ? (
        <Section surface="surface" ariaLabelledBy="featured-title">
          <Container>
            <div className="featured-blog-layout">
              <div className="featured-blog-image">
                <ImageBlock src={featured.poster} alt={featured.posterAlt} aspect="16:9" priority />
              </div>
              <div className="featured-blog-content">
                <span className="card__meta" style={{ display: "inline-block", marginBottom: "var(--space-2)" }}>
                  {insightCategoryLabels[featured.category]} &middot; {featured.format} &middot; {featured.duration}
                </span>
                <h2 id="featured-title" style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)", lineHeight: "1.15", fontWeight: 600, margin: "0 0 var(--space-3) 0" }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: "1.06rem", color: "var(--color-ink-soft)", lineHeight: "1.6", margin: "0 0 var(--space-5) 0" }}>
                  {featured.description}
                </p>
                <div>
                  <ButtonLink href={`/insights/${featured.slug}`} variant="primary">Read insight</ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section ariaLabelledBy="categories-title">
        <Container>
          <EyebrowHeading eyebrow="Browse by topic" title="Five categories." id="categories-title" />
          <div className="filter-row" aria-label="Insight categories">
            {insightCategories.map((category) => (
              <a key={category} className="filter-chip" href={`/insights/category/${category}`} aria-label={`Browse ${insightCategoryLabels[category]}`}>
                {insightCategoryLabels[category]}
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <ImageBlock src="/images/all side photo/e0c1ea85-745c-46e4-9b2c-121171f2d09c.png" alt="Working library." aspect="21:9" />

      <Section surface="surface" ariaLabelledBy="all-title">
        <Container>
          <EyebrowHeading eyebrow="All insights" title="The full library." id="all-title" />
          <div className="grid grid--3">
            {rest.map((insight) => (<InsightCard key={insight.slug} insight={insight} />))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="newsletter-title">
        <Container>
          <div className="split" style={{ alignItems: "center" }}>
            <div>
              <h2 id="newsletter-title">AlaminWeekly.</h2>
              <p className="section-heading__copy">One brand-strategy insight a week — in your inbox every Monday.</p>
            </div>
            <div className="actions">
              <ButtonLink href="/newsletter">Join the list</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

// WCAG AAA definitions: AI = Artificial Intelligence