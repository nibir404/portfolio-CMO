import { Container } from "@/components/ui/Container";

const brands = [
  { name: "Betopia Group", role: "Current CMO" },
  { name: "Bengal Group", role: "Corporate Affairs" },
  { name: "Metrocem Group", role: "Brand Lead" },
  { name: "Daffodil Group", role: "Digital Head" },
  { name: "Akij Foods", role: "Brand Strategy" },
  { name: "PRAN-RFL Group", role: "Field Marketing" },
];

export function BrandStrip() {
  return (
    <div className="border-t border-b border-line bg-surface py-8">
      <Container>
        <p className="text-center text-[10px] md:text-xs font-semibold uppercase tracking-widest text-ink-mute mb-6">
          Proven leadership at South Asia's category leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
          {brands.map((brand) => (
            <div key={brand.name} className="text-center">
              <span className="block font-display text-base md:text-lg font-bold text-ink">
                {brand.name}
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-ink-soft mt-1">
                {brand.role}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer
