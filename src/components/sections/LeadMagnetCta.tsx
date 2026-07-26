import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { playbook } from "@/content/playbook";

export function LeadMagnetCta() {
  return (
    <Section surface="accent" ariaLabelledBy="lead-magnet-title">
      <Container>
        <div className="playbook-cta">
          <div className="playbook-cta__copy">
            <span className="eyebrow">{playbook.title}</span>
            <h2 id="lead-magnet-title">Day one, day thirty, day sixty.</h2>
            <p className="section-heading__copy">{playbook.subtitle}</p>
            <ul className="playbook-cta__list" aria-label="What's inside the playbook">
              {playbook.chapters.slice(0, 4).map((chapter) => (
                <li key={chapter.title}>{chapter.title}</li>
              ))}
            </ul>
            <div className="playbook-cta__actions">
              <ButtonLink href="/playbook" variant="white">
                Request the playbook
              </ButtonLink>
              <ButtonLink
                href="mailto:office@abdullahalamin.me?subject=Playbook%20request"
                variant="ghost"
              >
                Email the office
              </ButtonLink>
            </div>
          </div>
          <figure className="playbook-cover" aria-hidden="true">
            <div className="playbook-cover__inner">
              <p className="playbook-cover__eyebrow">A working playbook</p>
              <p className="playbook-cover__title">
                Three frameworks I run on day one of every new mandate.
              </p>
            </div>
          </figure>
        </div>
      </Container>
    </Section>
  );
}
