import { useEffect, useState } from "react";
import { person } from "../content.js";
import { Magnetic, Reveal, RollingLink } from "./bits.jsx";

/* Snellenberg's footer, faithfully: huge invitation, magnetic blue
   pill + email pill on a hairline, then VERSION / LOCAL TIME / SOCIALS. */
function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = now.toLocaleTimeString("en-AU", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Australia/Brisbane",
  });
  return <span>{t.toUpperCase()} AEST</span>;
}

export default function FooterContact() {
  return (
    <footer id="contact" style={wrap}>
      <div className="shell">
        <Reveal>
          <h2 style={huge}>
            Let&rsquo;s work
            <br />
            together
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={pillRow}>
            <div style={pillRule} aria-hidden="true" />
            <Magnetic>
              <a className="pill blue" href={"mailto:" + person.email}>
                Get in touch
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a className="pill" href={"mailto:" + person.email}>
                {person.email}
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={meta}>
            <div>
              <p className="mono" style={metaLabel}>version</p>
              <p style={metaValue}>2026 © Milan Shaji</p>
            </div>
            <div>
              <p className="mono" style={metaLabel}>local time</p>
              <p style={metaValue}>
                <Clock />
              </p>
            </div>
            <div>
              <p className="mono" style={metaLabel}>status</p>
              <p style={metaValue}>{person.available}</p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <p className="mono" style={metaLabel}>socials</p>
              <div style={{ display: "flex", gap: 22 }}>
                <RollingLink href={person.linkedin} rel="noopener" style={social}>
                  LinkedIn
                </RollingLink>
                <RollingLink href={person.github} rel="noopener" style={social}>
                  GitHub
                </RollingLink>
                <RollingLink href="./Milan-Shaji-Resume.pdf" download style={social}>
                  Resume
                </RollingLink>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mono" style={{ marginTop: 40 }}>
            every number on this site is a measured result — backtest, eval run, ci, or grade.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}

const wrap = {
  padding: "16vh 0 12vh",
  borderTop: "1px solid var(--hairline)",
};
const huge = {
  fontFamily: "var(--font-body)",
  fontWeight: 300,
  fontSize: "clamp(3rem, 9vw, 7.5rem)",
  lineHeight: 1.02,
  letterSpacing: "-0.02em",
};
const pillRow = {
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: "7vh",
  paddingTop: "5vh",
};
const pillRule = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 1,
  background: "var(--hairline)",
};
const meta = {
  display: "flex",
  flexWrap: "wrap",
  gap: "28px 48px",
  marginTop: "10vh",
  alignItems: "flex-end",
};
const metaLabel = { marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.12em" };
const metaValue = { fontSize: "0.95rem" };
const social = { fontSize: "0.95rem", color: "var(--fg)" };
