import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DraftClaimNotice } from "@/components/sections/DraftClaimNotice";
import { WorkCard } from "@/components/cards/WorkCard";
import { getWorkBySlug, getAllWork, getAdjacentWork, getRelatedWork, getRelatedServices } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { caseStudySchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllWork().map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }): Metadata {
  const item = getWorkBySlug(params.slug);
  if (!item) return {};
  return buildPageMetadata({
    title: `${item.title} — ${item.company} Case Study | Abdullah Al Alamin`,
    description: item.summary,
    path: item.seo.path,
    type: "article",
    image: item.image,
    publishedAt: item.seo.publishedAt,
  });
}

export default function CaseStudyPage({ params }: { params: Params }) {
  const item = getWorkBySlug(params.slug);
  if (!item) notFound();
  const { prev, next } = getAdjacentWork(item.slug);
  const relatedWork = getRelatedWork(item.relatedWorkSlugs ?? []).filter(
    (entry) => entry.slug !== item.slug,
  );
  const relatedServices = getRelatedServices(item.relatedServiceSlugs);

  return (
    <>
      <JsonLd
        data={[
          caseStudySchema(item),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Work", href: "/work" },
            { name: item.title, href: item.seo.path },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
          { name: item.title, href: item.seo.path },
        ]}
      />
      <Section compact ariaLabelledBy="case-title">
        <Container>
          <div className="page-hero__grid">
            <div>
              <span className="eyebrow">
                Chapter {item.chapter} · {item.company}
              </span>
              <h1 id="case-title">{item.title}.</h1>
              <p className="page-hero__intro">{item.summary}</p>
              <div className="page-hero__meta">
                <span>{item.company}</span>
                <span>{item.sector}</span>
                <span>{item.timeframe}</span>
                <span>Role: {item.role}</span>
              </div>
            </div>
            <figure className="image-frame image-frame--landscape">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                priority
                sizes="(min-width: 900px) 50vw, 100vw"
              />
            </figure>
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="at-a-glance">
        <Container>
          <SectionHeading
            eyebrow="At a glance"
            title="Scope, role, and timeframe."
            id="at-a-glance"
          />
          <div className="at-a-glance">
            <div className="at-a-glance__item">
              <span className="at-a-glance__label">Client</span>
              <span className="at-a-glance__value">{item.company}</span>
            </div>
            <div className="at-a-glance__item">
              <span className="at-a-glance__label">Sector</span>
              <span className="at-a-glance__value">{item.sector}</span>
            </div>
            <div className="at-a-glance__item">
              <span className="at-a-glance__label">Timeframe</span>
              <span className="at-a-glance__value">{item.timeframe}</span>
            </div>
            <div className="at-a-glance__item">
              <span className="at-a-glance__label">Scope</span>
              <span className="at-a-glance__value">{item.scope}</span>
            </div>
            <div className="at-a-glance__item">
              <span className="at-a-glance__label">Role</span>
              <span className="at-a-glance__value">{item.role}</span>
            </div>
            <div className="at-a-glance__item">
              <span className="at-a-glance__label">Outcome</span>
              <span className="at-a-glance__value">{item.outcome}</span>
            </div>
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="situation-title">
        <Container>
          <div className="prose">
            <h2 id="situation-title">The situation.</h2>
            <p>{item.situation}</p>
            <h2>The decision.</h2>
            <p>{item.decision}</p>
            <h2>The execution.</h2>
            <ul>
              {item.execution.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="metrics-title">
        <Container>
          <SectionHeading
            eyebrow="The outcome"
            title="What the work produced."
            id="metrics-title"
          />
          <div className="stats-grid">
            {item.metrics.map((metric) => (
              <div key={metric.label} className="stat">
                <span className="stat__value">{metric.value}</span>
                <span className="stat__label">{metric.label}</span>
                {metric.context ? (
                  <p className="form-note mt-2">
                    {metric.context}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <DraftClaimNotice />
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="transferred-title">
        <Container>
          <div className="prose">
            <h2 id="transferred-title">What transferred.</h2>
            <p>{item.whatTransferred}</p>
          </div>
        </Container>
      </Section>

      {relatedServices.length ? (
        <Section surface="surface" ariaLabelledBy="related-services">
          <Container>
            <SectionHeading
              eyebrow="Related services"
              title="Where this work continues."
              id="related-services"
            />
            <ul className="prose">
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <a href={`/services/${service.slug}`}>
                    {service.name}
                  </a>{" "}
                  — {service.shortDescription}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {relatedWork.length ? (
        <Section ariaLabelledBy="related-work">
          <Container>
            <SectionHeading
              eyebrow="Related work"
              title="More from the office."
              id="related-work"
            />
            <div className="grid grid--3">
              {relatedWork.map((entry, index) => (
                <WorkCard key={entry.slug} item={entry} index={index} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <div className="prev-next">
            {prev ? (
              <a href={`/work/${prev.slug}`} aria-label={`Previous case study: ${prev.title}`}>
                <span className="prev-next__label">← Previous case</span>
                <span className="prev-next__title">{prev.title}</span>
              </a>
            ) : null}
            {next ? (
              <a href={`/work/${next.slug}`} aria-label={`Next case study: ${next.title}`}>
                <span className="prev-next__label">Next case →</span>
                <span className="prev-next__title">{next.title}</span>
              </a>
            ) : null}
          </div>
          <div className="actions mt-6">
            <ButtonLink href="/contact">Discuss a similar mandate</ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              Back to all case studies
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
