type Award = {
  name: string;
  issuer: string;
  year: string;
};

type Category = {
  title: string;
  items: Award[];
};

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
    title: "Bangladesh · Government & National",
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

export default function Awards() {
  return (
    <section id="awards" className="awards" aria-labelledby="awards-heading">
      <div className="container">
        <h2 id="awards-heading" className="sr-only">Awards &amp; Recognition</h2>

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
            and keynote speaker across APAC &mdash; giving back to the industry that built him.
          </p>
        </div>
      </div>
    </section>
  );
}