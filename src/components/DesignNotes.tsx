import Image from "next/image";

const notes = [
  {
    num: "01",
    tag: "Strategy",
    title: "Why most CMOs ship campaigns, not growth.",
    excerpt: "The compounding lens — and why most marketing orgs are structurally designed to fail.",
    image: "/images/all side photo/69ad2fc3-8a45-4119-82fe-5e94b9675ddd.png",
    read: "6 min",
  },
  {
    num: "02",
    tag: "Brand",
    title: "Category design is the only moat left.",
    excerpt: "What it actually takes to own a category when distribution is free and AI is everywhere.",
    image: "/images/7.jpg",
    read: "9 min",
  },
  {
    num: "03",
    tag: "Operating model",
    title: "The marketing org chart of 2028.",
    excerpt: "How leading teams are restructuring around narrative, lifecycle, and GTM engineering.",
    image: "/images/boss-8.jpg",
    read: "12 min",
  },
  {
    num: "04",
    tag: "Field notes",
    title: "Attribution is a leadership problem, not a tool.",
    excerpt: "Why most martech stacks fail — and the operating cadence that fixes it.",
    image: "/images/10.jpg",
    read: "5 min",
  },
];

export default function DesignNotes() {
  return (
    <section id="notes" className="notes snap-section" aria-labelledby="notes-heading">
      <div className="container">
        <div className="chapter-h reveal">
          <span className="num">/11</span>
          <span className="name">Design Notes</span>
        </div>

        <h2 id="notes-heading" className="display-section reveal" style={{ marginBottom: "var(--space-5)" }}>
          Latest{" "}
          <span className="italic-serif accent">essays.</span>
        </h2>

        <div className="notes-grid reveal-stagger">
          {notes.map((n) => (
            <article key={n.num} className="note-card" data-cursor-hover>
              <div className="note-card-img">
                <Image
                  src={n.image}
                  alt={n.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="note-card-body">
                <span className="note-card-tag">{n.tag}</span>
                <h3 className="note-card-title">{n.title}</h3>
                <p className="note-card-excerpt">{n.excerpt}</p>
                <span className="note-card-meta">{n.read} read</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}