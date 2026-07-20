import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { claims } from "../content.js";

/* The site checks its own numbers before it shows them — the same gate
   GridPulse runs before a brief is allowed to publish. Each figure
   scrambles, resolves, and locks with a check.

   Driven by timers, not requestAnimationFrame: rAF starves in hidden or
   occluded tabs, and the gate must always open. */

const DIGITS = "0123456789";
const scramble = (text) =>
  text.replace(/[0-9]/g, () => DIGITS[Math.floor(Math.random() * 10)]);

export default function Preloader({ onDone }) {
  const [step, setStep] = useState(0);
  const [noise, setNoise] = useState("");

  useEffect(() => {
    let closed = false;
    const timers = [];
    let spin;
    const finish = () => {
      if (closed) return;
      closed = true;
      onDone();
    };

    const runRow = (i) => {
      if (i >= claims.length) {
        timers.push(setTimeout(finish, 380));
        return;
      }
      let ticks = 0;
      spin = setInterval(() => {
        setNoise(scramble(claims[i].n));
        if (++ticks > 4) {
          clearInterval(spin);
          setNoise("");
          setStep(i + 1);
          timers.push(setTimeout(() => runRow(i + 1), 110));
        }
      }, 48);
    };

    timers.push(setTimeout(() => runRow(0), 320));
    const guard = setTimeout(finish, 3200);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(spin);
      clearTimeout(guard);
    };
  }, [onDone]);

  return (
    <motion.div
      style={styles.wrap}
      exit={{ y: "-100vh", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      aria-hidden="true"
    >
      <div style={styles.panel}>
        <p className="mono" style={styles.caption}>
          verifying published figures
        </p>

        <ul style={styles.list}>
          {claims.map((c, i) => {
            const verified = i < step;
            const active = i === step;
            return (
              <li
                key={c.label}
                style={{
                  ...styles.row,
                  opacity: verified ? 1 : active ? 0.85 : 0.22,
                }}
              >
                <span style={styles.figure}>
                  {active && noise ? noise : c.n}
                </span>
                <span className="mono" style={styles.label}>
                  {c.label}
                  <span style={styles.src}> · {c.src}</span>
                </span>
                <span style={{ ...styles.tick, opacity: verified ? 1 : 0 }}>✓</span>
              </li>
            );
          })}
        </ul>

        <div style={styles.track}>
          <div
            style={{
              ...styles.fill,
              transform: `scaleX(${step / claims.length})`,
            }}
          />
        </div>
        <p className="mono" style={styles.count}>
          {step}/{claims.length} verified
        </p>
      </div>

      {/* curved trailing edge, flattens as the curtain lifts */}
      <motion.svg
        style={styles.curve}
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        exit={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      >
        <path d="M0 0 L100 0 L100 1 Q50 12 0 1 Z" fill="#101112" />
      </motion.svg>
    </motion.div>
  );
}

const styles = {
  wrap: {
    position: "fixed",
    inset: 0,
    zIndex: 200,
    background: "#101112",
    color: "#e7e4dd",
    display: "grid",
    placeItems: "center",
  },
  panel: { width: "min(440px, 78vw)" },
  caption: { color: "#8a877f", marginBottom: 22 },
  list: { listStyle: "none", display: "grid", gap: 12, marginBottom: 26 },
  row: {
    display: "grid",
    gridTemplateColumns: "5.2em minmax(0, 1fr) auto",
    alignItems: "baseline",
    gap: 14,
    transition: "opacity 0.25s ease",
  },
  figure: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.95rem",
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.02em",
  },
  label: { color: "#8a877f", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  src: { opacity: 0.55 },
  tick: { fontSize: "0.8rem", transition: "opacity 0.25s ease" },
  track: { height: 1, background: "#2a2b2e", overflow: "hidden" },
  fill: {
    height: "100%",
    background: "#e7e4dd",
    transformOrigin: "0 50%",
    transition: "transform 0.32s cubic-bezier(0.76, 0, 0.24, 1)",
  },
  count: { color: "#8a877f", marginTop: 10 },
  curve: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -38,
    width: "100%",
    height: 40,
    transformOrigin: "top",
  },
};
