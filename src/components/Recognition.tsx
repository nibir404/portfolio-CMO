type Award = {
  name: string;
  issuer: string;
  year: string;
};

type Category = {
  title: string;
  items: Award[];
};

/* Recognition grouped by source of authority: international bodies, national government, industry institutions. */
const categories: Category[] = [
  {
    title: "International",
    items: [
      { name: "Global Brand Leadership Award", issuer: "World Brand Congress, Mumbai", year: "2024" },
      { name: "Asia Pacific Marketing Excellence Award", issuer: "Asia Marketing Federation", year: "2023" },
      { name: "International Corporate Communication Excellence Award", issuer: "International Association of Business Communicators (IABC)", year: "2022" },
      { name: "Commonwealth Marketing Innovation Recognition", issuer: "Commonwealth Business Council, London", year: "2021" },
    ],
  },
  {
    title: "Government & National",
    items: [
      { name: "Digital Bangladesh Innovation Award", issuer: "ICT Division, Government of Bangladesh", year: "2023" },
      { name: "National Marketing Excellence Award", issuer: "Ministry of Commerce, Government of Bangladesh", year: "2022" },
      { name: "Meritorious Service Recognition", issuer: "Bangladesh Navy, Ministry of Defence", year: "2018" },
      { name: "Community Development Excellence Award", issuer: "Bangladesh Scout, National Headquarters", year: "2016" },
    ],
  },
  {
    title: "Industry & Institutional",
    items: [
      { name: "Outstanding Brand Builder Award", issuer: "FMCG & Consumer Goods Marketing Summit, Dhaka", year: "2021" },
      { name: "Corporate Communication Excellence Award", issuer: "Public Relations Society of Bangladesh", year: "2020" },
      { name: "Scout Wood Badge · Leadership Training Award", issuer: "Bangladesh Scout, Naval Region", year: "2015" },
      { name: "Youth Leadership Recognition Award", issuer: "Daffodil International University", year: "2014" },
    ],
  },
];

const totalCount = categories.reduce((sum, c) => sum + c.items.length, 0);

export default function Recognition() {
  return (
    <section id="recognition" className="awards" aria-labelledby="recognition-heading">
      <div className="container">
        <div className="awards-head">
          <span className="text-eyebrow chapter-h">
            <span className="num">/11</span>
            <span className="name">Recognition</span>
          </span>
          <h2 id="recognition-heading" className="display-section">
            Industry recognition<span className="italic-serif accent">.</span>
          </h2>
          <p>
            Twelve awards across three categories &mdash; international
            bodies, national government, and industry institutions. The
            credential is the work; these are the footnotes.
          </p>
        </div>

        <div className="awards-summary fx-stagger" aria-hidden="false">
          <div>
            <strong>{totalCount}</strong>
            Total awards
          </div>
          <div>
            <strong>04</strong>
            International
          </div>
          <div>
            <strong>04</strong>
            Government &amp; National
          </div>
          <div>
            <strong>04</strong>
            Industry &amp; Institutional
          </div>
        </div>

        <div className="awards-categories fx-stagger">
          {categories.map((cat) => (
            <div className="awards-cat" key={cat.title}>
              <h3 className="awards-cat-label">
                <span>{cat.title}</span>
                <span className="count">/ {String(cat.items.length).padStart(2, "0")}</span>
              </h3>
              <ul className="awards-list">
                {cat.items.map((a) => (
                  <li className="award-item" key={a.name}>
                    <h4 className="award-name">{a.name}</h4>
                    <p className="award-meta">{a.issuer}</p>
                    <span className="award-year">{a.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="awards-judging fx-fade-up" style={{ marginTop: "var(--space-5)" }}>
          <span className="text-eyebrow" style={{ display: "block", marginBottom: "var(--space-3)" }}>
            Beyond the trophies
          </span>
          <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.7 }}>
            Juror at <strong style={{ color: "var(--ink)" }}>Bangladesh Marketing Excellence Awards</strong>,
            mentor at the <strong style={{ color: "var(--ink)" }}>Commonwealth Youth Programme</strong>,
            and faculty voice across APAC &mdash; giving back to the industry
            that built the operator.
          </p>
        </div>
      </div>
    </section>
  );
}