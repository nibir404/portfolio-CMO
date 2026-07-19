import Image from "next/image";

type Initiative = {
  n: string;
  name: string;
  tagline: string;
  desc: string;
  status: "Live" | "In development" | "Pilot";
  image: string;
};

/* Strategic initiatives = what the CMO is building right now.
   Not campaigns. Infrastructure. */
const initiatives: Initiative[] = [
  {
    n: "/01",
    name: "Project Atlas",
    tagline: "AI-powered brand intelligence across the group",
    desc:
      "An internal platform that consolidates brand health, audience signal, and competitive intelligence across Betopia Group's twelve business units — turning the conglomerate into a single, queryable brand surface.",
    status: "Live",
    image: "/images/boss-final-image.jpg",
  },
  {
    n: "/02",
    name: "OneBet",
    tagline: "Unified group brand architecture",
    desc:
      "A long-horizon rebrand of the group identity from a holding company into a single, compounding brand house — every subsidiary tied to a master narrative and a measurable equity target.",
    status: "In development",
    image: "/images/abdullah1.jpg",
  },
  {
    n: "/03",
    name: "The Compounding Engine",
    tagline: "Content → demand → equity",
    desc:
      "An operating system that turns strategic narrative into measurable demand across paid, owned, and earned channels — designed to compound brand equity quarter over quarter.",
    status: "Pilot",
    image: "/images/img1.jpg",
  },
  {
    n: "/04",
    name: "AI Marketing Council",
    tagline: "An industry coalition for ethical AI adoption",
    desc:
      "A coalition of CMOs, agency leaders, and academic researchers convening quarterly to publish frameworks for AI in marketing — research translated into practice, in public.",
    status: "Live",
    image: "/images/4.jpg",
  },
];

const statusDot: Record<Initiative["status"], string> = {
  Live: "●",
  "In development": "◐",
  Pilot: "○",
};

export default function Initiatives() {
  return (
    <section id="initiatives" className="initiatives" aria-labelledby="initiatives-heading">
      <div className="container">
        <div className="initiatives-head">
          <span className="text-eyebrow chapter-h">
            <span className="num">/05</span>
            <span className="name">Strategic Initiatives</span>
          </span>
          <h2 id="initiatives-heading" className="display-section">
            What the office is building
            <br />
            <span className="italic-serif accent">at this scale</span>.
          </h2>
          <p>
            The systems and coalitions that turn the CMO mandate into
            compounding advantage &mdash; not campaigns, but infrastructure
            the group will run on for the next decade.
          </p>
        </div>

        <div className="initiatives-grid fx-stagger">
          {initiatives.map((it) => (
            <article className="initiative-card" key={it.n}>
              <div className="initiative-card-img">
                <Image
                  src={it.image}
                  alt={it.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>

              <div className="initiative-card-body">
                <div className="initiative-card-top">
                  <span className="initiative-n">{it.n}</span>
                  <span className="initiative-status" data-status={it.status}>
                    <span className="initiative-status-dot" aria-hidden="true">
                      {statusDot[it.status]}
                    </span>
                    {it.status}
                  </span>
                </div>

                <h3 className="initiative-name">{it.name}</h3>
                <span className="initiative-tagline">{it.tagline}</span>
                <p className="initiative-desc">{it.desc}</p>

                <span className="initiative-arrow" aria-hidden="true">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}