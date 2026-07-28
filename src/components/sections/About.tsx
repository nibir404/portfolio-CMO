import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function About() {
  const { about } = editorial;
  return (
    <section className="editorial-section editorial-section--surface" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <Reveal>
          <span className="kicker">{about.kicker}</span>
          <h2 id="about-title" className="section-title">
            {about.title}
          </h2>
        </Reveal>

        <Reveal>
          <div className="about-cols">
            <div className="about-copy">
              {about.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            <aside className="beliefs-card" aria-label="Personal operating beliefs">
              <h3>What I believe</h3>
              <ul>
                {about.beliefs.map((b) => (
                  <li key={b.headline}>
                    <strong>{b.headline}</strong>
                    <span className="body">{b.body}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence