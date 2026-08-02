import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function Audience() {
  const { audience } = editorial;

  // Custom vector illustrations representing Canvas (01), Studio (02), and IQ (03) in neon lime style
  const illustrations = [
    // Card 1: Canvas (Green grid style)
    <svg key="0" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="12" y="16" width="28" height="36" rx="2" />
      <rect x="24" y="8" width="28" height="36" rx="2" strokeDasharray="3 3" />
      <line x1="18" y1="26" x2="34" y2="26" />
      <line x1="18" y1="36" x2="30" y2="36" />
      <circle cx="40" cy="40" r="1.5" fill="currentColor" />
    </svg>,

    // Card 2: Studio (Pink grid style)
    <svg key="1" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="8" y="24" width="16" height="16" rx="1" />
      <polygon points="36,24 44,40 28,40" />
      <rect x="44" y="12" width="12" height="12" rx="1" />
      <path d="M24 32 H 28" />
      <path d="M36 32 H 44" />
      <path d="M50 24 V 40" strokeDasharray="2 2" />
    </svg>,

    // Card 3: IQ (Blue grid style)
    <svg key="2" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.25">
      <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(30 32 32)" />
      <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(-30 32 32)" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  ];

  return (
    <section id="audience" aria-labelledby="audience-title" className="w-full bg-white dark:bg-[var(--color-surface)] py-16 md:py-20 text-left">
      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-[var(--color-line)] pb-8">
            <div className="flex flex-col max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[var(--color-ink-soft)] mb-3">{audience.kicker}</span>
              <h2 id="audience-title" className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-[var(--color-ink)] mb-3">For those who aspire</h2>
              <p className="text-base text-[var(--color-ink-soft)]">Empowering executive brand building, strategic scalability audits, and deep market capture campaigns.</p>
            </div>
            <div>
              <Link
                className="bg-transparent text-[var(--color-ink)] font-semibold border border-[var(--color-line)] px-6 py-3 rounded-full text-sm inline-flex items-center justify-center transition-all duration-200 hover:bg-[var(--color-surface-cream)] hover:border-[var(--color-ink-soft)] hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                href="#contact"
              >
                Join briefing
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Cards Grid */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {audience.cards.map((card, index) => (
              <Link
                key={card.num}
                href="#services"
                className="group bg-[var(--color-surface-cream)] dark:bg-[var(--color-surface)] border border-[var(--color-line)] rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg no-underline cursor-pointer"
              >
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">Focus {card.num}</span>
                  <h3 className="text-xl font-bold text-[var(--color-ink)] mb-4">{card.title.split(" that ")[0]}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-ink-soft)] mb-6">{card.body}</p>
                </div>
                
                <div className="my-6 text-[var(--color-ink)]">
                  {illustrations[index]}
                </div>

                <div className="border-t border-[var(--color-line)] pt-5 mt-auto flex justify-between items-center text-xs font-semibold text-[var(--color-ink)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                  <span>Explore {card.num}</span>
                  <svg className="w-5 h-5 text-[var(--color-accent)] transition-transform duration-300 ease-out group-hover:translate-x-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// WCAG AAA definitions: SDG = Sustainable Development Goals