import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionOK } from "../motion-ok.jsx";

/* useSeen — true once an element has entered the viewport OR been
   jumped past. Instant anchor navigation can skip IntersectionObserver
   frames entirely; the scroll sweep catches anything stranded above
   the fold so no content stays invisible. */
export function useSeen(ref, margin = "-8% 0px") {
  const inView = useInView(ref, { once: true, margin });
  const [passed, setPassed] = useState(false);
  useEffect(() => {
    if (inView || passed) return;
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      /* Settle if the element sits above the viewport (an anchor jump
         skipped it) or is already on screen. The second case matters
         when content appears without a scroll — e.g. a work row
         expanding — where IntersectionObserver may never fire. */
      if (r.bottom < 0 || (r.top < innerHeight && r.bottom > 0 && r.height > 0)) {
        setPassed(true);
      }
    };
    check();
    /* re-check while an expand animation settles the layout */
    const timers = [300, 700, 1200].map((ms) => setTimeout(check, ms));
    addEventListener("scroll", check, { passive: true });
    addEventListener("resize", check);
    return () => {
      timers.forEach(clearTimeout);
      removeEventListener("scroll", check);
      removeEventListener("resize", check);
    };
  }, [inView, passed, ref]);
  return inView || passed;
}

/* Reveal — quiet fade-rise. */
export function Reveal({ children, delay = 0, style }) {
  const motionOK = useMotionOK();
  const ref = useRef(null);
  const seen = useSeen(ref);
  return (
    <motion.div
      ref={ref}
      style={style}
      initial={motionOK ? { opacity: 0, y: 20 } : false}
      animate={seen ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Counter — rolls to its value once seen. */
export function Counter({ value, prefix = "", suffix = "", style }) {
  const motionOK = useMotionOK();
  const ref = useRef(null);
  const seen = useSeen(ref, "-10% 0px");
  const mv = useMotionValue(motionOK ? 0 : value);
  const spring = useSpring(mv, { stiffness: 90, damping: 26 });
  const text = useTransform(spring, (v) => prefix + Math.round(v).toLocaleString("en-AU") + suffix);
  useEffect(() => {
    if (seen) mv.set(value);
  }, [seen, mv, value]);
  return (
    <motion.span ref={ref} style={style}>
      {motionOK ? text : prefix + value.toLocaleString("en-AU") + suffix}
    </motion.span>
  );
}

/* Magnetic — leans toward the cursor. */
export function Magnetic({ children, strength = 0.3 }) {
  const motionOK = useMotionOK();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  if (!motionOK) return children;
  return (
    <motion.div
      style={{ x: sx, y: sy, display: "inline-block" }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* RollingLink — Snellenberg's letter-roll hover, CSS-driven. */
export function RollingLink({ href, children, className = "", style, download, rel, onClick }) {
  const motionOK = useMotionOK();
  const label = String(children);
  if (!motionOK)
    return (
      <a href={href} className={className} style={style} download={download} rel={rel} onClick={onClick}>
        {label}
      </a>
    );
  return (
    <a
      href={href}
      className={"roll " + className}
      style={style}
      download={download}
      rel={rel}
      onClick={onClick}
      aria-label={label}
    >
      <span className="roll-track" aria-hidden="true">
        <span className="roll-row">{label}</span>
        <span className="roll-row">{label}</span>
      </span>
    </a>
  );
}
