import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";

export function ExperienceTimeline() {
  const roles = profile.career.slice(0, 4);

  return (
    <section className="exec-section" id="experience" aria-labelledby="experience-title">
      <Container>
        <div className="exec-head">
          <span className="eyebrow">Experience</span>
          <h2 id="experience-title">Where the work has happened.</h2>
        </div>
        <div className="experience-timeline">
          {roles.map((item) => (
            <article key={item.role + item.organisation} className="experience-item">
              <div className="experience-item__head">
                <span className="experience-item__years">{item.year}</span>
                <h3 className="experience-item__role">{item.role}</h3>
                <p className="experience-item__company">{item.organisation}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/work" className="meet-link">
            See the full case-study archive →
          </Link>
        </div>
      </Container>
    </section>
  );
}