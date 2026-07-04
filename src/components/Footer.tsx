export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <h2 className="footer-quote reveal" data-split-text>
          <span style={{ display: "block" }}>SUCCESS CREATES</span>
          <span className="accent" style={{ display: "block", fontStyle: "italic" }}>
            WEALTH.
          </span>
          <span style={{ display: "block", marginTop: "var(--space-2)" }}>LEGACY CREATES</span>
          <span className="accent" style={{ display: "block", fontStyle: "italic" }}>
            MEANING.
          </span>
        </h2>
        <div className="footer-quote-author">— Abdullah Al Amin</div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4>Abdullah Al Amin</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "320px" }}>
              A visionary entrepreneur, ecosystem builder, and transformation
              leader building companies that empower people and outlive their
              founders.
            </p>
          </div>
          <nav className="footer-col" aria-label="Footer navigation">
            <h4>Navigate</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#journey">Journey</a></li>
              <li><a href="#ventures">Ventures</a></li>
              <li><a href="#speaking">Speaking</a></li>
            </ul>
          </nav>
          <nav className="footer-col" aria-label="More">
            <h4>Discover</h4>
            <ul>
              <li><a href="#media">Media</a></li>
              <li><a href="#writings">Articles</a></li>
              <li><a href="#">Newsletter</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <nav className="footer-col" aria-label="Social">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">X / Twitter</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Abdullah Al Amin. All rights reserved.</div>
          <div className="socials" role="list">
            <a href="#" role="listitem">LinkedIn</a>
            <a href="#" role="listitem">Facebook</a>
            <a href="#" role="listitem">Instagram</a>
            <a href="#" role="listitem">YouTube</a>
            <a href="#" role="listitem">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}