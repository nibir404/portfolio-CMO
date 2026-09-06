import { Reveal } from "@/components/motion/Reveal";

type ProcessData = { kicker: string; title: string; steps: Array<{ n: string; title: string; body: string }> };

export function Process({ data: process }: { data: ProcessData }) {
  return (
    <section className="editorial-section" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <Reveal>
          <span className="kicker">{process.kicker}</span>
          <h2 id="process-title" className="section-title">
            {process.title}
          </h2>
          <div className="step-grid">
            {process.steps.map((step) => (
              <article key={step.n} className="step-block">
                <span className="n">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}