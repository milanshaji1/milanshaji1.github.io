import { motion } from "framer-motion";
import { person } from "../content.js";
import { RollingLink } from "./bits.jsx";
import { useMotionOK } from "../motion-ok.jsx";

const NAV = [
  ["Work", "#work"],
  ["Numbers", "#numbers"],
  ["Info", "#info"],
  ["Contact", "#contact"],
];

/* Hero = Yamada's quiet top-left identity + left nav column,
   with Snellenberg's giant name marquee and rotating badge below. */
export default function Hero({ booted }) {
  const motionOK = useMotionOK();
  const show = booted || !motionOK;

  return (
    <section id="top" style={wrap} aria-label="Introduction">
      <div className="shell" style={{ position: "relative", height: "100%" }}>
        {/* identity, top-left */}
        <motion.header
          style={ident}
          initial={motionOK ? { opacity: 0, y: 14 } : false}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h1 style={identName}>{person.name}</h1>
          <p className="mono">{person.role.toLowerCase()}</p>
        </motion.header>

        {/* nav column, Yamada-style */}
        <motion.nav
          aria-label="Site"
          style={navCol}
          initial={motionOK ? { opacity: 0 } : false}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {NAV.map(([label, href]) => (
            <RollingLink key={href} href={href} style={navLink}>
              {label}
            </RollingLink>
          ))}
          <RollingLink href="./Milan-Shaji-Resume.pdf" download style={navLink}>
            Resume
          </RollingLink>
        </motion.nav>

        {/* blurb, bottom-right (Yamada's bio block) */}
        <motion.p
          className="hero-blurb"
          initial={motionOK ? { opacity: 0, y: 16 } : false}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          {person.blurb}
        </motion.p>
      </div>

      {/* giant name marquee (Snellenberg) */}
      <motion.div
        style={marqueeWrap}
        aria-hidden="true"
        initial={motionOK ? { opacity: 0, y: 40 } : false}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{
            ...marqueeTrack,
            animation: motionOK ? "marquee-x 28s linear infinite" : "none",
          }}
        >
          <span style={marqueeText}>
            {person.name} — {person.name} — {person.name} —&nbsp;
          </span>
          <span style={marqueeText}>
            {person.name} — {person.name} — {person.name} —&nbsp;
          </span>
        </div>

        {/* rotating location badge */}
        <div style={badge}>
          <svg
            viewBox="0 0 100 100"
            style={{
              width: "100%",
              height: "100%",
              animation: motionOK ? "spin 14s linear infinite" : "none",
            }}
          >
            <defs>
              <path id="badge-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
            </defs>
            <text style={{ fontSize: 9.2, letterSpacing: 1.6, fill: "var(--dim)", fontFamily: "var(--font-mono)" }}>
              <textPath href="#badge-circle">
                {person.located} · {person.available} ·
              </textPath>
            </text>
          </svg>
          <span style={badgeArrow} aria-hidden="true">↓</span>
        </div>
      </motion.div>
    </section>
  );
}

const wrap = {
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  paddingTop: 42,
  overflow: "hidden",
};
const ident = { paddingTop: 26 };
const identName = {
  fontFamily: "var(--font-body)",
  fontWeight: 300,
  fontSize: "clamp(1.6rem, 3vw, 2.1rem)",
  letterSpacing: "0.01em",
  lineHeight: 1.2,
};
const navCol = {
  display: "grid",
  gap: 6,
  justifyItems: "start",
  marginTop: "9vh",
};
const navLink = {
  fontWeight: 400,
  fontSize: "1.02rem",
  color: "var(--fg)",
  lineHeight: 1.6,
};
const marqueeWrap = {
  position: "relative",
  borderTop: "1px solid var(--hairline)",
  padding: "2.5vh 0 3.5vh",
  marginTop: "6vh",
};
const marqueeTrack = {
  display: "flex",
  whiteSpace: "nowrap",
  width: "max-content",
};
const marqueeText = {
  fontFamily: "var(--font-body)",
  fontWeight: 300,
  fontSize: "clamp(4.5rem, 13vw, 11rem)",
  lineHeight: 1.02,
  letterSpacing: "-0.02em",
  display: "inline-block",
};
const badge = {
  position: "absolute",
  right: "clamp(24px, 7vw, 110px)",
  top: "-58px",
  width: 116,
  height: 116,
  display: "var(--badge-display, block)",
};
const badgeArrow = {
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
  fontSize: "1.3rem",
  color: "var(--fg)",
};
