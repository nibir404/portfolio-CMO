import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { speakingTopics } from "@/content/speaking";
import { pastStages } from "@/content/speaking";

export function SpeakingMedia() {
  return (
    <section className="exec-section" id="speaking" aria-labelledby="speaking-title">
      <Container>
        <div className="exec-head">
          <span className="eyebrow">Speaking &amp; Media</span>
          <h2 id="speaking-title">On stage, on the record, on the page.</h2>
          <p>
            Keynotes, board sessions, and podcast conversations for senior leadership audiences —
            built around the operator&rsquo;s point of view, not the content calendar.
          </p>
        </div>
        <div className="media-grid">
          {speakingTopics.slice(0, 3).map((topic) => (
            <article key={topic.slug} className="media-card">
              <span className="media-card__kind">Keynote talk</span>
              <h3 className="media-card__title">{topic.title}</h3>
              <p className="media-card__venue">{topic.shortAbstract}</p>
              <span className="media-card__year">{topic.formats[0]}</span>
            </article>
          ))}
        </div>
        <div className="mt-7">
          <span className="eyebrow mb-4" style={{ display: "block" }}>
            Past stages
          </span>
          <ul className="stage-list">
            {pastStages.map((stage) => (
              <li key={stage.name} className="stage-item">
                <span>
                  <strong>{stage.name}</strong> · {stage.location}
                </span>
                <span className="stage-item__year">{stage.year}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-7">
          <Link href="/speaking" className="btn btn--ghost">
            See speaking topics →
          </Link>
        </div>
      </Container>
    </section>
  );
}
