import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { person } from "../content.js";
import { RollingLink } from "./bits.jsx";
import { useResume } from "./ResumeViewer.jsx";
import { useMotionOK } from "../motion-ok.jsx";

const NAV = [
  ["Work", "#work"],
  ["Numbers", "#numbers"],
  ["Info", "#info"],
  ["Contact", "#contact"],
];

/* Yamada marks the current page with a ● — here the bullet tracks
   whichever section is in view. */
function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive("#" + e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(([, href]) => {
      const el = document.querySelector(href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

/* Hero = Yamada's quiet top-left identity + left nav column,
   with Snellenberg's giant name marquee and rotating badge below. */
export default function Hero({ booted }) {
  const motionOK = useMotionOK();
  const show = booted || !motionOK;
  const active = useActiveSection();
  const openResume = useResume();

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
            <span key={href} className={"nav-item" + (active === href ? " active" : "")}>
              <span className="nav-dot" aria-hidden="true" />
              <RollingLink href={href} style={navLink}>
                {label}
              </RollingLink>
            </span>
          ))}
          <span className="nav-item">
            <span className="nav-dot" aria-hidden="true" />
            <RollingLink
              href="./Milan-Shaji-Resume.pdf"
              style={navLink}
              onClick={(e) => {
                e.preventDefault();
                openResume();
              }}
            >
              Resume
            </RollingLink>
          </span>
        </motion.nav>

        {/* blurb, bottom-right (Yamada's bio block) */}
        <motion.p
          className="hero-blurb"
          initial={motionOK ? { opacity: 0, y: 16 } : false}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          {person.blurb.map((line, i) => (
            <span key={i}>
              {line}
              {i < person.blurb.length - 1 && <br />}
            </span>
          ))}
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

        {/* rotating location badge — solid disc, Snellenberg-style */}
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
              <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
            </defs>
            <text style={{ fontSize: 8.6, letterSpacing: 1.7, fill: "var(--bg)", fontFamily: "var(--font-mono)" }}>
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
  fontWeight: 400,
  fontSize: "clamp(5rem, 15.5vw, 13.5rem)",
  lineHeight: 1.0,
  letterSpacing: "-0.025em",
  display: "inline-block",
};
const badge = {
  position: "absolute",
  right: "clamp(24px, 7vw, 110px)",
  top: "-72px",
  width: 142,
  height: 142,
  borderRadius: "50%",
  background: "var(--fg)",
  display: "var(--badge-display, block)",
};
const badgeArrow = {
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
  fontSize: "1.45rem",
  color: "var(--bg)",
};
