import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WorkCard } from "@/components/cards/WorkCard";
import { getAllWork } from "@/lib/content";

export function FeaturedWorks() {
  const allWork = getAllWork();
  const displayItems = allWork.slice(0, 4); // Display first 4 case studies

  return (
    <section className="exec-section" aria-labelledby="featured-works-title">
      <Container>
        <div className="section-header-split">
          <h2 id="featured-works-title" className="section-title">Featured works</h2>
          <Link href="/work" className="btn btn--secondary pill-btn">
            All Works &rarr;
          </Link>
        </div>
        
        <div className="grid grid--2 featured-works-grid">
          {displayItems.map((item, index) => (
            <WorkCard key={item.slug} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
