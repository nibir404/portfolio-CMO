import Link from "next/link";
import Image from "next/image";
import { site, currentYear } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-labelledby="site-footer-title">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 overflow-hidden border border-line rounded-3xl min-h-[460px] mb-12">
          {/* Left Column (Solid Color + Copy + CTA Button) */}
          <div className="col-span-12 md:col-span-7 bg-[#161618] text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-6 md:gap-8">
            <span className="eyebrow" style={{ color: "var(--color-accent)", display: "block" }}>
              Transformation Brief
            </span>
            <h2
              id="site-footer-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-[1.1] text-white"
            >
              Every meaningful business relationship starts with a conversation.
            </h2>
            <p className="text-sm md:text-base text-[rgba(255,255,255,0.74)] max-w-[48ch] leading-relaxed">
              Use the diagnostic brief to outline your current systems, constraints, and business targets. I read and respond to qualifying inquiries within two business days.
            </p>
            <div className="actions mt-2">
              <Link href="#inquiry" className="btn btn--primary">
                Discuss Opportunity
              </Link>
            </div>
          </div>
          {/* Right Column (Clear Image) */}
          <div className="col-span-12 md:col-span-5 relative min-h-[320px] md:min-h-full">
            <Image
              src="/images/boss-8.jpg"
              alt="Abdullah Al Alamin"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
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
