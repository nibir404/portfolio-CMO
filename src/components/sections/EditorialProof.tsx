import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { editorial } from "@/content/editorial";

export function EditorialProof() {
  const { proof } = editorial;
  
  const brandLogos = [
    "Brand-1.png",
    "Brand-2.png",
    "Brand-3.png",
    "Brand-4.png",
    "Brand-5.png",
    "Brand-6.png",
    "Brand-7.png",
    "Brand-8.png"
  ];

  return (
    <section
      id="proof"
      aria-labelledby="proof-title"
      className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left"
    >
      {/* Top Client Logos Strip */}
      <Reveal>
        <div className="border-b border-[var(--color-line)] pb-12 mb-12 overflow-hidden">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-soft)] mb-8">
            World-class corporate groups shaped by Abdullah
          </h3>
          <div className="overflow-hidden w-full relative [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
            {/* Soft Edge Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-[var(--color-surface)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-[var(--color-surface)] to-transparent z-10 pointer-events-none" />

            <div className="flex w-max items-center gap-6 animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
              {[...brandLogos, ...brandLogos, ...brandLogos].map((brandFile, index) => (
                <div key={`${brandFile}-${index}`} className="flex items-center justify-center h-14 min-w-[140px] px-4 py-2 bg-white dark:bg-[var(--color-surface)] rounded-xl border border-[rgba(8,8,10,0.08)] shadow-sm shrink-0">
                  <Image
                    src={`/images/${brandFile}`}
                    alt="Corporate partner brand"
                    width={140}
                    height={45}
                    className="max-h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Bottom Split Stats Layout */}
      <div className="grid grid-cols-1 min-[900px]:grid-cols-[1.1fr_0.9fr] gap-12 min-[900px]:gap-16 items-start">
        
        {/* Left Column: Bio / Pitch */}
        <Reveal>
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[var(--color-ink-soft)] mb-3">
              {proof.kicker}
            </span>
            <h2 id="proof-title" className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug tracking-[-0.02em] text-[var(--color-ink)] mb-6">
              With over a decade of executive growth and P&amp;L leadership, Abdullah delivers scale-up solutions that empower corporate groups.
            </h2>
            <p className="text-sm leading-relaxed text-[var(--color-ink-soft)] max-w-xl">
              {proof.sectors}
            </p>
          </div>
        </Reveal>

        {/* Right Column: 2x2 Metric Grid */}
        <Reveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-6" aria-label="Commercial outcomes">
            {proof.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[var(--color-surface-cream)] dark:bg-[var(--color-surface)] border border-[var(--color-line)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[140px] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)] mb-4">
                  {stat.label}
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)]">
                  <CountUp value={stat.value} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

// WCAG AAA definitions: FMCG = Fast-Moving Consumer Goods, APAC = Asia-Pacific,
// GCC = Gulf Cooperation Council, AI = Artificial Intelligence