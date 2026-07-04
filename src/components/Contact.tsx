export default function Contact() {
  return (
    <section id="contact" className="contact snap-section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-grid">
          <div>
            <div className="chapter-h reveal">
              <span className="num">11</span>
              <span className="name">The Invitation</span>
            </div>

            <h2 id="contact-heading" className="display-section reveal" style={{ marginBottom: "var(--space-4)" }}>
              Let&rsquo;s Build Something{" "}
              <span style={{ fontStyle: "italic", fontFamily: "var(--font-quote)", color: "var(--accent)" }}>
                Meaningful
              </span>{" "}
              Together.
            </h2>

            <p className="contact-info reveal">
              Whether you&rsquo;re an entrepreneur, organization, student, or
              leader seeking transformation — I welcome opportunities to
              collaborate, share ideas, and create lasting impact.
            </p>

            <div className="contact-actions reveal-stagger">
              <a href="mailto:hello@abdullahalamin.com" className="magnetic-btn cta-slash" data-cursor-hover>
                Book /Engagement
              </a>
              <a href="mailto:partner@abdullahalamin.com" className="magnetic-btn outline cta-slash" data-cursor-hover>
                Partner /With Me
              </a>
            </div>
          </div>

          <aside className="reveal" aria-label="Direct contact">
            <div
              style={{
                padding: "var(--space-5)",
                background: "var(--bg-elev)",
                border: "1px solid var(--border)",
                height: "100%",
              }}
            >
              <div className="text-eyebrow" style={{ color: "var(--accent)", marginBottom: "var(--space-4)" }}>
                Get In Touch
              </div>
              <div style={{ display: "grid", gap: "var(--space-3)" }}>
                <div>
                  <div className="text-eyebrow" style={{ fontSize: "0.65rem", marginBottom: "var(--space-1)" }}>
                    General
                  </div>
                  <a href="mailto:hello@abdullahalamin.com" className="contact-info" style={{ borderBottom: 0 }}>
                    hello@abdullahalamin.com
                  </a>
                </div>
                <div>
                  <div className="text-eyebrow" style={{ fontSize: "0.65rem", marginBottom: "var(--space-1)" }}>
                    Press
                  </div>
                  <a href="mailto:press@abdullahalamin.com" className="contact-info" style={{ borderBottom: 0 }}>
                    press@abdullahalamin.com
                  </a>
                </div>
                <div>
                  <div className="text-eyebrow" style={{ fontSize: "0.65rem", marginBottom: "var(--space-1)" }}>
                    Speaking
                  </div>
                  <a href="mailto:speaking@abdullahalamin.com" className="contact-info" style={{ borderBottom: 0 }}>
                    speaking@abdullahalamin.com
                  </a>
                </div>
                <div>
                  <div className="text-eyebrow" style={{ fontSize: "0.65rem", marginBottom: "var(--space-1)" }}>
                    Office
                  </div>
                  <span className="contact-info">Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}