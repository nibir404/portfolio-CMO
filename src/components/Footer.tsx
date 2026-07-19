const navLinks = [
  { label: "Leadership", href: "#about" },
  { label: "Impact", href: "#impact" },
  { label: "Initiatives", href: "#initiatives" },
  { label: "Insights", href: "#insights" },
  { label: "On Stage", href: "#speaking" },
  { label: "Recognition", href: "#recognition" },
  { label: "Engage the office", href: "#contact" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-al-alamin" },
  { label: "X / Twitter", href: "https://x.com/abdullah_alamin" },
  { label: "YouTube", href: "https://youtube.com/@abdullah-al-alamin" },
  { label: "Facebook", href: "https://facebook.com/abdullah.alamin" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h2 className="footer-quote">
              Legacy &gt; Currency<span className="italic-serif accent">.</span>
            </h2>
            <p className="footer-tagline">
              Office of the Chief Marketing Officer &middot; Betopia Group
              &middot; doctoral AI researcher, Carnegie Mellon &middot;
              fourteen years compounding brand work.
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
            <h4>Channels</h4>
            <ul>
              <li>
                <a href="mailto:office@abdullah-al-alamin.com">
                  office@abdullah-al-alamin.com
                </a>
              </li>
              <li>
                <a href="mailto:speaking@abdullah-al-alamin.com">
                  speaking@abdullah-al-alamin.com
                </a>
              </li>
              <li>
                <a href="mailto:press@abdullah-al-alamin.com">
                  press@abdullah-al-alamin.com
                </a>
              </li>
              <li>
                <a href="https://cal.com/abdullah-al-alamin">
                  Book a 30-min call
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Office of the CMO · Abdullah Al Alamin</span>
          <span>Made with intent · Dhaka, BD</span>
        </div>
      </div>
    </footer>
  );
}