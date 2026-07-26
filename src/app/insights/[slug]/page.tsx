import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Prose } from "@/components/ui/Prose";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DraftClaimNotice } from "@/components/sections/DraftClaimNotice";
import { InsightCard } from "@/components/cards/InsightCard";
import { WorkCard } from "@/components/cards/WorkCard";
import {
  getInsightBySlug,
  getAllInsights,
  getRelatedInsights,
  getRelatedWork,
  getRelatedServices,
} from "@/lib/content";
import { insightCategoryLabels } from "@/lib/routes";
import { formatDate } from "@/lib/format";
import { buildPageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllInsights().map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }): Metadata {
  const insight = getInsightBySlug(params.slug);
  if (!insight) return {};
  return buildPageMetadata({
    title: insight.seo.title,
    description: insight.seo.description,
    path: insight.seo.path,
    type: "article",
    publishedAt: insight.publishedAt,
    updatedAt: insight.updatedAt,
    image: insight.poster,
  });
}

export default function InsightDetailPage({ params }: { params: Params }) {
  const insight = getInsightBySlug(params.slug);
  if (!insight) notFound();

  const related = getRelatedInsights(insight.relatedInsightSlugs ?? [])
    .filter((item) => item.slug !== insight.slug)
    .slice(0, 3);
  const relatedWork = getRelatedWork(insight.relatedWorkSlugs).slice(0, 3);
  const relatedServices = getRelatedServices(insight.relatedServiceSlugs);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(insight),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Insights", href: "/insights" },
            {
              name: insightCategoryLabels[insight.category],
              href: `/insights/category/${insight.category}`,
            },
            { name: insight.title, href: insight.seo.path },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
          {
            name: insightCategoryLabels[insight.category],
            href: `/insights/category/${insight.category}`,
          },
          { name: insight.title, href: insight.seo.path },
        ]}
      />
      <Section compact ariaLabelledBy="insight-title">
        <Container>
          <div className="page-hero__grid">
            <div>
              <span className="eyebrow">
                {insightCategoryLabels[insight.category]} · {insight.format}
              </span>
              <h1 id="insight-title">{insight.title}</h1>
              <p className="page-hero__intro">{insight.description}</p>
              <div className="page-hero__meta">
                <span>By {insight.author}</span>
                <span>{formatDate(insight.publishedAt)}</span>
                <span>{insight.duration}</span>
              </div>
            </div>
            <figure className="image-frame image-frame--landscape">
              <Image
                src={insight.poster}
                alt={insight.posterAlt}
                fill
                priority
                sizes="(min-width: 900px) 50vw, 100vw"
              />
            </figure>
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="takeaways-title">
        <Container>
          <aside className="key-takeaways">
            <h2 id="takeaways-title">Key takeaways.</h2>
            <ul>
              {insight.keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </Container>
      </Section>

      <Section ariaLabelledBy="body-title">
        <Container>
          <Prose as="article">
            {insight.body.map((section, index) => (
              <section key={`${section.heading}-${index}`}>
                <h2 id={`body-${index}`}>{section.heading}</h2>
                {section.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p key={`${section.heading}-p-${paragraphIndex}`}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.pullQuote ? <blockquote>{section.pullQuote}</blockquote> : null}
              </section>
            ))}
          </Prose>
          {insight.verificationStatus !== "verified" ? (
            <div style={{ marginTop: "2rem" }}>
              <DraftClaimNotice />
            </div>
          ) : null}
        </Container>
      </Section>

      {relatedWork.length || relatedServices.length ? (
        <Section surface="surface" ariaLabelledBy="links-title">
          <Container>
            <SectionHeading
              eyebrow="Where this lands"
              title="Related work and services."
              id="links-title"
            />
            {relatedServices.length ? (
              <ul className="prose" style={{ marginBottom: "1.5rem" }}>
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`}>{service.name}</Link> —{" "}
                    {service.shortDescription}
                  </li>
                ))}
              </ul>
            ) : null}
            {relatedWork.length ? (
              <div className="grid grid--3">
                {relatedWork.map((item, index) => (
                  <WorkCard key={item.slug} item={item} index={index} />
                ))}
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {related.length ? (
        <Section ariaLabelledBy="related-title">
          <Container>
            <SectionHeading eyebrow="Related insights" title="Keep reading." id="related-title" />
            <div className="grid grid--3">
              {related.map((item) => (
                <InsightCard key={item.slug} insight={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section surface="accent" ariaLabelledBy="insight-cta-title">
        <Container>
          <div className="split" style={{ alignItems: "center" }}>
            <div>
              <h2 id="insight-cta-title">Work with Abdullah.</h2>
              <p style={{ color: "rgba(255,255,255,0.84)" }}>
                If this piece maps to a problem you are working on, brief the office.
              </p>
            </div>
            <div className="actions">
              <ButtonLink href="/contact" variant="white">Book a call</ButtonLink>
              <ButtonLink href="/insights" variant="ghost">All insights</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
