import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function EditorialHero() {
  const { hero } = editorial;

  return (
    <section
      id="top"
      className="max-w-[var(--container)] mx-auto mt-[80px] min-[900px]:mt-[100px] px-4 sm:px-6 lg:px-8 overflow-visible"
    >

      <div className="w-full grid grid-cols-1 min-[900px]:grid-cols-[1.1fr_0.9fr] min-[900px]:min-h-[80vh] items-end gap-0 min-[900px]:gap-10 lg:gap-14">

        {/* ── Left Column: Text + CTA ── */}
        <div className="flex flex-col justify-end pt-16 min-[900px]:pt-12 lg:pt-16 pb-6 min-[900px]:pb-10 lg:pb-14 order-1 min-[900px]:order-1">

          <Reveal>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold leading-[1.15] tracking-[-0.02em] text-[var(--color-ink)] mb-4 lg:mb-5"
              dangerouslySetInnerHTML={{ __html: hero.titleHtml }}
            />
          </Reveal>

          <Reveal>
            <h2
              className="text-xl md:text-2xl 2xl:text-3xl font-bold leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)] mb-4 lg:mb-5 [&_em]:not-italic [&_em]:bg-gradient-to-r [&_em]:from-emerald-500 [&_em]:via-emerald-600 [&_em]:to-sky-500 [&_em]:bg-clip-text [&_em]:text-transparent"
              dangerouslySetInnerHTML={{ __html: hero.subtitleHtml }}
            />
          </Reveal>

          <Reveal>
            <p className="text-base lg:text-lg 2xl:text-xl leading-relaxed text-[var(--color-ink-soft)] max-w-[52ch] mb-6 lg:mb-8">
              {hero.lead}
            </p>
          </Reveal>

          <Reveal>
            <div className="flex items-center gap-3 mb-6 lg:mb-8 flex-wrap">
              <Link
                className="bg-[var(--color-accent-soft)] text-[var(--color-accent-ink)] font-semibold border border-[var(--color-accent-soft)] px-6 py-3 rounded-full text-sm sm:text-base inline-flex items-center justify-center transition-all duration-200 hover:bg-[var(--color-cta-hover-bg)] hover:border-[var(--color-cta-hover-bg)] hover:-translate-y-0.5 cursor-pointer"
                href="#contact"
              >
                {hero.primaryCta.label}
              </Link>
            </div>
          </Reveal>

          <Reveal>
            {/* Brand Logo Stack Strip */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap border-t border-[var(--color-line)] pt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-6 px-1.5 bg-white rounded border border-[rgba(8,8,10,0.08)]">
                  <Image src="/images/Brand-1.png" alt="Board 1" width={48} height={16} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-6 px-1.5 bg-white rounded border border-[rgba(8,8,10,0.08)]">
                  <Image src="/images/Brand-2.png" alt="Board 2" width={48} height={16} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-6 px-1.5 bg-white rounded border border-[rgba(8,8,10,0.08)]">
                  <Image src="/images/Brand-3.png" alt="Board 3" width={48} height={16} className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-[var(--color-surface)] bg-[var(--color-ink)] px-2 py-0.5 rounded-full leading-none">
                  +10
                </span>
              </div>
              <span className="text-[12.5px] sm:text-[13.5px] font-semibold text-[var(--color-ink-soft)]">
                10+ global corporate boards shaped by Abdullah
              </span>
            </div>
          </Reveal>
        </div>

        {/* ── Right Column: Portrait Image ── */}
        <div className="relative flex justify-center min-[900px]:justify-end items-end self-end order-2 min-[900px]:order-2">
          <Reveal>
            <div className="relative w-full max-w-[320px] min-[500px]:max-w-[400px] min-[900px]:max-w-[500px] lg:max-w-[560px] xl:max-w-[620px] 2xl:max-w-[700px]">
              <Image
                src="/images/Hero-abdullah-CMO.avif"
                alt="Abdullah Al Alamin — Group Chief Marketing Officer of Betopia Group and Doctoral AI Researcher"
                width={700}
                height={875}
                className="object-cover object-[center_15%] w-full h-[440px] min-[500px]:h-[520px] min-[900px]:h-[70vh] lg:h-[75vh] xl:h-[78vh] 2xl:h-[80vh] rounded-t-3xl rounded-b-none block"
                priority
              />
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence