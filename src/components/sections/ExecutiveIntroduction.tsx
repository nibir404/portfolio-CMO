import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";

export function ExecutiveIntroduction() {
  return (
    <Section surface="surface" compact ariaLabelledBy="exec-intro-title">
      <Container>
        <div className="split">
          <div>
            <span className="eyebrow">The Office of the CMO</span>
            <h2 id="exec-intro-title">A senior marketing voice in the boardroom.</h2>
            <p className="prose">{profile.shortBio}</p>
            <p>
              <Link className="text-link" href="/about">
                Read the full biography →
              </Link>
            </p>
          </div>
          <div>
            <span className="eyebrow">Credentials</span>
            <ul className="prose mt-3">
              {profile.credentials.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
