import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { greetings } from "../content.js";

/* Greeting cycle → curved curtain lift. The timer guard guarantees the
   gate opens even where requestAnimationFrame starves (hidden tabs). */
export default function Preloader({ onDone }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    let idx = 0;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onDone();
    };
    /* first word lingers, the rest snap through — Snellenberg pacing */
    const tick = () => {
      idx += 1;
      if (idx < greetings.length) {
        setI(idx);
        timer = setTimeout(tick, idx === 1 ? 190 : 160);
      } else {
        timer = setTimeout(finish, 220);
      }
    };
    let timer = setTimeout(tick, 650);
    const guard = setTimeout(finish, 2600);
    return () => {
      clearTimeout(timer);
      clearTimeout(guard);
    };
  }, [onDone]);

  return (
    <motion.div
      style={styles.wrap}
      exit={{ y: "-100vh", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      aria-hidden="true"
    >
      <p style={styles.word}>
        <span style={styles.dot} />
        {greetings[i]}
      </p>
      {/* curved bottom edge that flattens as the curtain lifts */}
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
    display: "grid",
    placeItems: "center",
  },
  word: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
    color: "#e7e4dd",
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: "50%",
    background: "#e7e4dd",
    display: "inline-block",
  },
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
