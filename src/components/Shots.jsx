import { motion } from "framer-motion";
import { useMotionOK } from "../motion-ok.jsx";

/* Screenshots of the running system. Click opens the full-size capture.
   Every image here is a real capture — nothing is a mockup. */
export default function Shots({ shots }) {
  const motionOK = useMotionOK();
  if (!shots?.length) return null;

  return (
    <div style={grid}>
      {shots.map((s, i) => (
        <motion.figure
          key={s.src}
          style={fig}
          initial={motionOK ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href={s.src} target="_blank" rel="noopener" style={frame} aria-label={`Open full-size: ${s.caption}`}>
            <motion.img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              decoding="async"
              style={img}
              whileHover={motionOK ? { scale: 1.03 } : undefined}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </a>
          <figcaption className="mono" style={cap}>
            {s.caption}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
  gap: "clamp(16px, 2.5vw, 28px)",
  paddingBottom: 40,
};
const fig = { margin: 0, display: "grid", gap: 10 };
const frame = {
  display: "block",
  overflow: "hidden",
  border: "1px solid var(--hairline)",
  background: "#101112",
  aspectRatio: "4 / 3",
};
const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "top center",
  display: "block",
};
const cap = { lineHeight: 1.6 };
