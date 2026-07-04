import Image from "next/image";

export default function Personal() {
  return (
    <section className="personal snap-section" aria-labelledby="personal-heading">
      <div className="container">
        <div className="chapter-h reveal">
          <span className="num">10</span>
          <span className="name">The Human Side</span>
        </div>

        <div className="personal-intro">
          <h2 id="personal-heading" className="display-section reveal">
            Discipline Creates{" "}
            <span style={{ fontStyle: "italic", fontFamily: "var(--font-quote)", color: "var(--accent)" }}>
              Possibility.
            </span>
          </h2>
          <p className="reveal" style={{ color: "var(--text-muted)", fontSize: "1.15rem", lineHeight: 1.8 }}>
            I believe leadership begins with personal growth, resilience, and
            continuous learning. The same discipline that builds ventures,
            builds character.
          </p>
        </div>

        <div className="personal-images reveal-stagger">
          <div className="personal-img">
            <Image src="/images/abdullah1.jpg" alt="Marathon — discipline in motion" fill sizes="(min-width: 768px) 25vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="personal-img tall">
            <Image src="/images/ab5.jpg" alt="Reading and continuous learning" fill sizes="(min-width: 768px) 25vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="personal-img tall">
            <Image src="/images/ab4.jpg" alt="Travel and global perspectives" fill sizes="(min-width: 768px) 25vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="personal-img">
            <Image src="/images/abdullah2.jpg" alt="Community and mentorship" fill sizes="(min-width: 768px) 25vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}