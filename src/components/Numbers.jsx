import { numbers } from "../content.js";
import { Counter, Reveal } from "./bits.jsx";

export default function Numbers() {
  return (
    <section id="numbers" className="invert" style={wrap}>
      <div className="shell">
        <Reveal>
          <p className="mono" style={{ marginBottom: 34 }}>the numbers: measured, not estimated</p>
        </Reveal>
        <div style={grid}>
          {numbers.map((n, i) => (
            <Reveal key={n.label} delay={(i % 3) * 0.06}>
              <div style={cell}>
                <Counter value={n.value} prefix={n.prefix || ""} suffix={n.suffix} style={value} />
                <span className="mono">{n.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mono" style={{ marginTop: 44 }}>
            sources: rolling-origin backtest (feb–jul 2026) · live eval runs · ci · graded results
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const wrap = { padding: "10vh 0 14vh" };
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "1px",
  background: "var(--hairline)",
  border: "1px solid var(--hairline)",
};
const cell = {
  background: "var(--bg)",
  padding: "26px 22px 22px",
  display: "grid",
  gap: 4,
  minHeight: 120,
  alignContent: "start",
};
const value = {
  fontFamily: "var(--font-body)",
  fontWeight: 300,
  fontSize: "clamp(2rem, 4vw, 2.9rem)",
  lineHeight: 1.05,
  letterSpacing: "-0.01em",
};
