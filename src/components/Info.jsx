import { info } from "../content.js";
import { Reveal } from "./bits.jsx";

export default function Info() {
  return (
    <section id="info" style={wrap}>
      <div className="shell info-grid">
        <div>
          <Reveal>
            <p className="mono" style={{ marginBottom: 30 }}>info</p>
          </Reveal>
          {info.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p style={para}>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.1}>
            <ul style={habits}>
              {info.habits.map((h) => (
                <li key={h} className="mono" style={{ letterSpacing: "0.05em", lineHeight: 2.1 }}>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <dl style={log}>
              {info.log.map(([when, what]) => (
                <div key={when + what} style={logRow}>
                  <dt className="mono" style={{ whiteSpace: "nowrap" }}>{when}</dt>
                  <dd style={{ fontSize: "0.9rem", color: "var(--dim)" }}>{what}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <div>
          <Reveal delay={0.1}>
            <p className="mono" style={{ marginBottom: 30 }}>toolkit</p>
          </Reveal>
          <div style={{ display: "grid", gap: 24 }}>
            {info.toolkit.map(([group, items], i) => (
              <Reveal key={group} delay={0.1 + i * 0.04}>
                <div style={kitRow}>
                  <h3 className="mono" style={{ marginBottom: 6 }}>{group}</h3>
                  <p style={{ fontSize: "0.92rem", color: "var(--dim)", lineHeight: 1.8 }}>{items}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const wrap = { padding: "10vh 0 16vh" };
const para = { maxWidth: "58ch", color: "var(--fg)", fontSize: "0.98rem", marginBottom: 16 };
const habits = { listStyle: "none", margin: "26px 0 0", paddingTop: 20, borderTop: "1px solid var(--hairline)" };
const log = { marginTop: 30, paddingTop: 22, borderTop: "1px solid var(--hairline)", display: "grid", gap: 10 };
const logRow = { display: "grid", gridTemplateColumns: "110px 1fr", gap: 16, alignItems: "baseline" };
const kitRow = { borderTop: "1px solid var(--hairline)", paddingTop: 14 };
