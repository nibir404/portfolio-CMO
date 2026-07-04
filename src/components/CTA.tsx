import Image from "next/image";

export default function CTA() {
  return (
    <section id="cta" className="cta section-dark snap-section" aria-labelledby="cta-heading">
      <div className="container cta-inner">
        <div className="cta-portrait reveal">
          <Image
            src="/images/boss-final-image.jpg"
            alt="Abdullah Al Amin — let's create your next website"
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="cta-body">
          <span className="text-eyebrow reveal" style={{ color: "var(--accent)", marginBottom: "var(--space-3)", display: "inline-block" }}>
            Let&rsquo;s shape your
          </span>
          <h2 id="cta-heading" className="cta-title reveal">
            NEXT CHAPTER
            <br />
            <span className="italic-serif accent">OF YOUR BRAND.</span>
          </h2>
          <a href="#contact" className="cta-btn reveal" data-cursor-hover>
            <span>Book a strategy call</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}