import { useRef } from "react";
import { motion } from "framer-motion";
import { statement } from "../content.js";
import { Magnetic, useSeen } from "./bits.jsx";
import { useMotionOK } from "../motion-ok.jsx";

/* Snellenberg's word-staggered statement, verbatim technique:
   each word rises through its own mask as the section enters. */
export default function Statement() {
  const motionOK = useMotionOK();
  const ref = useRef(null);
  const seen = useSeen(ref);
  const words = statement.main.split(" ");

  return (
    <section style={wrap} ref={ref}>
      <div className="shell statement-grid">
        <h2 style={main} aria-label={statement.main}>
          {words.map((w, i) => (
            <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
              <motion.span
                style={{ display: "inline-block", whiteSpace: "pre" }}
                aria-hidden="true"
                initial={motionOK ? { y: "110%" } : false}
                animate={seen ? { y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
              >
                {w + (i < words.length - 1 ? " " : "")}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.div
          initial={motionOK ? { opacity: 0, y: 16 } : false}
          animate={seen ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <p style={aside}>{statement.aside}</p>
          <Magnetic strength={0.25}>
            <a className="circle-btn" href="#info">
              info ↓
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

const wrap = { padding: "18vh 0 14vh" };
const main = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "clamp(1.7rem, 3.6vw, 3.1rem)",
  lineHeight: 1.25,
  letterSpacing: "-0.01em",
  maxWidth: "22ch",
};
const aside = {
  fontSize: "0.9rem",
  lineHeight: 1.8,
  color: "var(--dim)",
  maxWidth: "30ch",
  marginBottom: 26,
};
