import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { works } from "../content.js";
import { Counter, Reveal } from "./bits.jsx";
import { useMotionOK } from "../motion-ok.jsx";

/* Yamada's thin-title project list, Snellenberg's row interaction:
   hover indents the title and floats a mono metric chip at the cursor;
   click expands the row in place. */
export default function Work() {
  const motionOK = useMotionOK();
  const [open, setOpen] = useState(null);
  const [hover, setHover] = useState(null);
  const chipX = useMotionValue(0);
  const chipY = useMotionValue(0);
  const sx = useSpring(chipX, { stiffness: 200, damping: 24 });
  const sy = useSpring(chipY, { stiffness: 200, damping: 24 });
  const fine = useRef(
    typeof window !== "undefined" && matchMedia("(pointer: fine)").matches
  );

  const onMove = (e) => {
    chipX.set(e.clientX + 18);
    chipY.set(e.clientY + 14);
  };

  return (
    <section id="work" className="invert" style={wrap}>
      <div className="shell">
        <Reveal>
          <p className="mono" style={{ marginBottom: 34 }}>recent work</p>
        </Reveal>
        <div>
          {works.map((w) => {
            const isOpen = open === w.id;
            return (
              <Reveal key={w.id}>
                <article style={row}>
                  <h3>
                    <button
                      className="work-rowhead"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : w.id)}
                      onPointerEnter={() => setHover(w.id)}
                      onPointerLeave={() => setHover(null)}
                      onPointerMove={onMove}
                    >
                      <span style={{ display: "block", minWidth: 0 }}>
                        <motion.span
                          style={rowTitle}
                          animate={motionOK && hover === w.id ? { x: 16 } : { x: 0 }}
                          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                        >
                          {w.title}
                        </motion.span>
                        <span className="mono" style={rowCaption}>{w.caption}</span>
                      </span>
                      <span style={rowPlus} aria-hidden="true">{isOpen ? "–" : "+"}</span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="detail"
                        initial={motionOK ? { height: 0, opacity: 0 } : { height: "auto", opacity: 1 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={motionOK ? { height: 0, opacity: 0 } : undefined}
                        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="work-detail">
                          <div style={detailCopy}>
                            {w.body.map((p, i) => (
                              <p key={i} style={para}>{p}</p>
                            ))}
                            <p className="mono" style={{ marginTop: 14 }}>{w.stack}</p>
                            {w.link ? (
                              <a href={w.link} rel="noopener" style={ghLink}>
                                {w.linkLabel} →
                              </a>
                            ) : (
                              <span className="mono" style={{ display: "inline-block", marginTop: 16 }}>
                                {w.linkLabel}
                              </span>
                            )}
                          </div>
                          <ul style={metricList}>
                            {w.metrics.map((m, i) => (
                              <li key={i} style={metricItem}>
                                <span style={metricValue}>
                                  {"raw" in m ? m.raw : <Counter value={m.value} suffix={m.suffix} />}
                                </span>
                                <span className="mono" style={{ letterSpacing: "0.04em" }}>{m.label}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* cursor metric chip */}
      {motionOK && fine.current && (
        <AnimatePresence>
          {hover && !open && (
            <motion.div
              key={hover}
              className="mono"
              style={{ ...chip, x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              {works.find((w) => w.id === hover)?.hoverline}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}

const wrap = { padding: "10vh 0 14vh" };
const row = { borderTop: "1px solid var(--hairline)" };
const rowTitle = {
  fontFamily: "var(--font-body)",
  fontWeight: 300,
  fontSize: "clamp(2.5rem, 6.5vw, 5.2rem)",
  lineHeight: 1.02,
  letterSpacing: "-0.02em",
  display: "inline-block",
};
const rowCaption = { display: "block", marginTop: 10 };
const rowPlus = { fontWeight: 300, fontSize: "1.6rem", color: "var(--dim)" };
const detailCopy = { maxWidth: "62ch" };
const para = { color: "var(--dim)", fontSize: "0.96rem", marginBottom: 12 };
const ghLink = {
  display: "inline-block",
  marginTop: 16,
  fontSize: "0.9rem",
  borderBottom: "1px solid var(--dim)",
  paddingBottom: 2,
};
const metricList = { listStyle: "none", display: "grid", gap: 18, alignContent: "start" };
const metricItem = { display: "grid", gap: 2, borderLeft: "1px solid var(--hairline)", paddingLeft: 18 };
const metricValue = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "1.7rem",
  lineHeight: 1.15,
};
const chip = {
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 60,
  pointerEvents: "none",
  background: "var(--bg)",
  border: "1px solid var(--hairline)",
  padding: "8px 12px",
  color: "var(--fg)",
};
