import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function Services() {
  const { services } = editorial;

  return (
    <section id="services" aria-labelledby="services-title" className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
      {/* Top Split Header */}
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-[var(--color-line)] pb-8">
          <div className="flex flex-col max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[var(--color-ink-soft)] mb-3">{services.kicker}</span>
            <h2 id="services-title" className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-[var(--color-ink)] mb-3">Explore our service offerings</h2>
            <p className="text-base text-[var(--color-ink-soft)]">
              Focused on corporate growth, deep commercial scaling, and applied AI governance models to ensure long-term, sustainable market leadership.
            </p>
          </div>
          <div>
            <Link
              className="bg-[var(--color-accent-soft)] text-[var(--color-accent-ink)] font-semibold border border-[var(--color-accent-soft)] px-6 py-3 rounded-full text-sm inline-flex items-center justify-center transition-all duration-200 hover:bg-[var(--color-cta-hover-bg)] hover:border-[var(--color-cta-hover-bg)] hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              href="#contact"
            >
              Get Started
            </Link>
          </div>
        </div>
      </Reveal>

      {/* 2x2 Service Card Deck Grid */}
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.items.map((svc) => (
            <article key={svc.num} className="bg-[var(--color-surface-cream)] dark:bg-[var(--color-surface)] border border-[var(--color-line)] rounded-2xl p-8 flex flex-col justify-between min-h-[220px] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">Framework {svc.num}</span>
                <h3 className="text-xl font-bold text-[var(--color-ink)] mb-3">{svc.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  {svc.what}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <p className="mt-10 text-xs text-[var(--color-ink-soft)] border-t border-[var(--color-line)] pt-6">
          {services.footnote}
        </p>
      </Reveal>
    </section>
  );
}

// WCAG AAA definitions: P&L = Profit and Loss, AI = Artificial Intelligence,
// APAC = Asia-Pacific, GCC = Gulf Cooperation Council, SDG = Sustainable Development Goals,
// CMO = Chief Marketing Officer