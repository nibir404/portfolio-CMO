import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function Audience() {
  const { audience } = editorial;
  return (
    <section className="editorial-section" id="audience" aria-labelledby="audience-title">
      <div className="wrap">
        <Reveal>
          <span className="kicker">{audience.kicker}</span>
          <h2 id="audience-title" className="section-title">
            {audience.title}
          </h2>
          <div className="audience-cards">
            {audience.cards.map((card) => (
              <article key={card.num} className="audience-card">
                <span className="num">{card.num}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// WCAG AAA definitions: SDG = Sustainable Development Goals