import Image from "next/image";
import { Container } from "@/components/ui/Container";

const stats = [
  { value: "14+", label: "Years in marketing leadership" },
  { value: "9", label: "Businesses shaped" },
  { value: "40+", label: "Brands built" },
  { value: "11", label: "Transformations delivered" },
];

export function Proof() {
  return (
    <section className="exec-section exec-section--surface" aria-labelledby="proof-title">
      <Container>
        <div className="proof-copy" style={{ maxWidth: "44rem", margin: "0 auto 3rem auto", textAlign: "center" }}>
          <h2 id="proof-title">Outcomes the board can measure.</h2>
          <p>
            Fourteen years inside the marketing function &mdash; from the field to the boardroom
            &mdash; producing measurable commercial outcomes across operators and conglomerates.
          </p>
        </div>
        <div className="exec-metrics" aria-label="Outcomes">
          {stats.map((stat) => (
            <div key={stat.label} className="exec-metric">
              <span className="exec-metric__value">{stat.value}</span>
              <span className="exec-metric__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}