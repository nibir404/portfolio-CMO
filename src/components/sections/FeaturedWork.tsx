import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkCard } from "@/components/cards/WorkCard";
import { getFeaturedWork } from "@/lib/content";

export function FeaturedWork() {
  const items = getFeaturedWork();
  return (
    <Section ariaLabelledBy="featured-work-title">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Seven businesses rebuilt. One compounding arc.
            </>
          }
          copy="Each chapter is a business, a scope, a decision, and the measurable outcome it produced."
          id="featured-work-title"
        />
        <div className="grid grid--3">
          {items.map((item, index) => (
            <WorkCard item={item} key={item.slug} index={index} />
          ))}
        </div>
        <p className="mt-6">
          <Link className="text-link" href="/work">
            View all case studies →
          </Link>
        </p>
      </Container>
    </Section>
  );
}
