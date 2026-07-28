import Link from "next/link";
import { site, currentYear } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-labelledby="site-footer-title">
      <div className="container">
        <div
          className="cta-banner site-footer__cta-banner"
          style={{ ["--cta-banner-image" as string]: "url('/images/boss-8.jpg')" }}
        >
          <div className="cta-banner__media" aria-hidden="true" />
          <div className="cta-banner__overlay" aria-hidden="true" />
          <div className="cta-banner__inner">
            <div className="cta-banner__copy">
              <h2
                id="site-footer-title"
                className="cta-banner__title cta-banner__title--lead"
              >
                Every meaningful business relationship starts with a conversation.
              </h2>
            </div>
            <div className="cta-banner__actions">
              <Link href="#inquiry" className="btn btn--white">
                Discuss Opportunity
              </Link>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>&copy; {currentYear} Abdullah Al Alamin</span>
          <span>
            <a href={`mailto:${site.officeEmail}`}>{site.officeEmail}</a>
          </span>
          <span>Group CMO &middot; Betopia Group</span>
        </div>
      </div>
    </footer>
  );
}
// WCAG AAA definitions: CMO = Chief Marketing Officer
