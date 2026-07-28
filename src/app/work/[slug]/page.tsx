import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { PageHero } from "@/components/ui/PageHero";
import { Prose } from "@/components/ui/Prose";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DraftClaimNotice } from "@/components/sections/DraftClaimNotice";
import { WorkCard } from "@/components/cards/WorkCard";
import { getWorkBySlug, getAllWork, getAdjacentWork, getRelatedWork, getRelatedServices } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { caseStudySchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { site } from "@/content/site";

type Params = { slug: string };

const inlineImages = [
  "/images/all side photo/281c4ba9-98ef-4e55-9218-1c70669e5558.png",
  "/images/all side photo/60b933f1-ce48-40db-8e69-d47caddbf9c3.png",
  "/images/all side photo/69ad2fc3-8a45-4119-82fe-5e94b9675ddd.png",
  "/images/all side photo/7f48d23f-b588-426c-86b7-05ca1b3bfab5.png",
  "/images/all side photo/bf36be97-595f-4f03-b208-7f93513e1080 (1).png",
];

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
  const relatedWork = getRelatedWork(item.relatedWorkSlugs ?? []).filter((entry) => entry.slug !== item.slug);
  const relatedServices = getRelatedServices(item.relatedServiceSlugs);
  const inline = inlineImages[Math.abs(item.slug.length) % inlineImages.length];

  return (
    <>
      <JsonLd data={[caseStudySchema(item), breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Work", href: "/work" }, { name: item.title, href: item.seo.path }])]} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }, { name: item.title, href: item.seo.path }]} />
      <PageHero
        id="case"
        kicker={`Chapter ${item.chapter} · ${item.company}`}
        title={<>{item.title}.</>}
        lead={item.summary}
        meta={`${item.company} · ${item.sector} · ${item.timeframe} · Role: ${item.role}`}
        actions={<ShareButtons url={`${site.origin}${item.seo.path}`} title={item.title} variant="minimal" />}
        image={{ src: item.image, alt: item.imageAlt }}
        imagePosition="below"
      />

      <Section surface="surface" ariaLabelledBy="at-a-glance">
        <Container>
          <EyebrowHeading eyebrow="At a glance" title="Scope, role, and timeframe." id="at-a-glance" />
          <div className="at-a-glance">
            <div className="at-a-glance__item"><span className="at-a-glance__label">Client</span><span className="at-a-glance__value">{item.company}</span></div>
            <div className="at-a-glance__item"><span className="at-a-glance__label">Sector</span><span className="at-a-glance__value">{item.sector}</span></div>
            <div className="at-a-glance__item"><span className="at-a-glance__label">Timeframe</span><span className="at-a-glance__value">{item.timeframe}</span></div>
            <div className="at-a-glance__item"><span className="at-a-glance__label">Scope</span><span className="at-a-glance__value">{item.scope}</span></div>
            <div className="at-a-glance__item"><span className="at-a-glance__label">Role</span><span className="at-a-glance__value">{item.role}</span></div>
            <div className="at-a-glance__item"><span className="at-a-glance__label">Outcome</span><span className="at-a-glance__value">{item.outcome}</span></div>
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="situation-title">
        <Container>
          <Prose>
            <h2 id="situation-title">The situation.</h2>
            <p>{item.situation}</p>
            <h2>The decision.</h2>
            <p>{item.decision}</p>
            <h2>The execution.</h2>
            <ul>{item.execution.map((line) => (<li key={line}>{line}</li>))}</ul>
          </Prose>
        </Container>
      </Section>

      <ImageBlock src={inline} alt="Working visual for the case study." aspect="21:9" caption="From the operating room." />

      <Section surface="surface" ariaLabelledBy="metrics-title">
        <Container>
          <EyebrowHeading eyebrow="The outcome" title="What the work produced." id="metrics-title" />
          <div className="stats-grid">
            {item.metrics.map((metric) => (
              <div key={metric.label} className="stat">
                <span className="stat__value">{metric.value}</span>
                <span className="stat__label">{metric.label}</span>
                {metric.context ? (<p className="form-note mt-2">{metric.context}</p>) : null}
              </div>
            ))}
          </div>
          <div className="mt-6"><DraftClaimNotice /></div>
        </Container>
      </Section>

      <Section ariaLabelledBy="transferred-title">
        <Container>
          <div className="prose">
            <h2 id="transferred-title">What transferred.</h2>
            <p>{item.whatTransferred}</p>
          </div>
          <ShareButtons url={`${site.origin}${item.seo.path}`} title={item.title} variant="default" label="Share this case study" />
        </Container>
      </Section>

      {relatedServices.length ? (
        <Section surface="surface" ariaLabelledBy="related-services">
          <Container>
            <EyebrowHeading eyebrow="Related services" title="Where this work continues." id="related-services" />
            <ul className="prose">
              {relatedServices.map((service) => (
                <li key={service.slug}><a href={`/services/${service.slug}`}>{service.name}</a> — {service.shortDescription}</li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {relatedWork.length ? (
        <Section ariaLabelledBy="related-work">
          <Container>
            <EyebrowHeading eyebrow="Related work" title="More from the office." id="related-work" />
            <div className="grid grid--3">
              {relatedWork.map((entry, index) => (<WorkCard key={entry.slug} item={entry} index={index} />))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <div className="prev-next">
            {prev ? (<a href={`/work/${prev.slug}`} aria-label={`Previous case study: ${prev.title}`}><span className="prev-next__label">← Previous case</span><span className="prev-next__title">{prev.title}</span></a>) : null}
            {next ? (<a href={`/work/${next.slug}`} aria-label={`Next case study: ${next.title}`}><span className="prev-next__label">Next case →</span><span className="prev-next__title">{next.title}</span></a>) : null}
          </div>
          <div className="actions mt-6">
            <ButtonLink href="/contact">Discuss a similar mandate</ButtonLink>
            <ButtonLink href="/work" variant="ghost">Back to all case studies</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}