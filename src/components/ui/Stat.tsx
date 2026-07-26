import type { ProofStat } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";

export function Stat({ stat }: { stat: ProofStat }) {
  return (
    <Reveal className="stat">
      <span className="stat__value">{stat.value}</span>
      <span className="stat__label">{stat.label}</span>
    </Reveal>
  );
}
