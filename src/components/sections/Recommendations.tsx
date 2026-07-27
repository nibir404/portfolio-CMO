import { Container } from "@/components/ui/Container";

const recommendations = [
  {
    quote:
      "He rebuilt our brand architecture across twelve business units in a single quarter &mdash; and left an operating discipline that is still running three years later.",
    name: "Group CEO",
    role: "Listed industrial group, South Asia",
  },
  {
    quote:
      "Most advisors draw the future on a slide. Abdullah draws it on the operating model and then lives inside it.",
    name: "Board Director",
    role: "PE-backed FMCG platform, APAC",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Recommendations() {
  return (
    <section className="exec-section" aria-labelledby="recs-title">
      <Container>
        <div className="exec-head">
          <span className="eyebrow">Recommendations</span>
          <h2 id="recs-title">From the room next door.</h2>
        </div>
        <div className="recommendations">
          {recommendations.map((rec) => (
            <figure key={rec.name} className="recommendation">
              <blockquote
                className="recommendation__quote"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${rec.quote}&rdquo;` }}
              />
              <figcaption className="recommendation__person">
                <span className="recommendation__avatar" aria-hidden="true">
                  {initials(rec.role)}
                </span>
                <span>
                  <span className="recommendation__name">{rec.name}</span>
                  <span className="recommendation__role">{rec.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
// WCAG AAA definitions: FMCG = Fast-Moving Consumer Goods, APAC = Asia-Pacific
