import { Container } from "@/components/ui/Container";

const metrics = [
  { value: "14+", label: "Years of executive marketing leadership" },
  { value: "9", label: "Businesses shaped, from operators to conglomerates" },
  { value: "40+", label: "Brands built and repositioned" },
  { value: "11", label: "Business transformations delivered" },
];

export function ExecMetrics() {
  return (
    <section className="exec-section exec-section--tight" aria-label="Impact at a glance">
      <Container>
        <div className="exec-metrics">
          {metrics.map((metric) => (
            <div key={metric.label} className="exec-metric">
              <span className="exec-metric__value">{metric.value}</span>
              <span className="exec-metric__label">{metric.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}