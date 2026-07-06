const navLinks = [
  { label: "Origin", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Results", href: "#results" },
  { label: "Awards", href: "#awards" },
  { label: "Expertise", href: "#expertise" },
  { label: "Education", href: "#education" },
  { label: "Beyond", href: "#beyond" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="footer" data-section-tone="dark">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h2 className="footer-quote">
              Legacy &gt; Currency<span className="italic-serif accent">.</span>
            </h2>
            <p className="footer-tagline">
              Building brands that outlast the businesses that made them.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href}>{s.label}</a>
                </li>
              ))}
              <li>
                <a href="mailto:hello@abdullah-al-alamin.com">
                  hello@abdullah-al-alamin.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Abdullah Al Alamin</span>
          <span>Made with intent · Dhaka, BD</span>
        </div>
      </div>
    </footer>
  );
}