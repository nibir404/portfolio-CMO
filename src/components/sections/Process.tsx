import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function Process() {
  const { process } = editorial;
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