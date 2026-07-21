import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionOK } from "../motion-ok.jsx";

const PDF = "./Milan-Shaji-Resume.pdf";
const Ctx = createContext(() => {});

/* Reads the resume in place instead of forcing a download.
   Escape or a click outside closes it; downloading is still one click. */
export function ResumeProvider({ children }) {
  const [open, setOpen] = useState(false);
  const motionOK = useMotionOK();
  const show = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <Ctx.Provider value={show}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            style={backdrop}
            onClick={() => setOpen(false)}
            initial={motionOK ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={motionOK ? { opacity: 0 } : undefined}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Resume"
          >
            <motion.div
              style={panel}
              onClick={(e) => e.stopPropagation()}
              initial={motionOK ? { y: 24, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              exit={motionOK ? { y: 16, opacity: 0 } : undefined}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <header style={bar}>
                <span className="mono">milan shaji — resume</span>
                <span style={{ display: "flex", gap: 18, alignItems: "center" }}>
                  <a className="mono" href={PDF} download style={link}>
                    download ↓
                  </a>
                  <a className="mono" href={PDF} target="_blank" rel="noopener" style={link}>
                    open in tab ↗
                  </a>
                  <button className="mono" onClick={() => setOpen(false)} style={link} aria-label="Close resume">
                    close ✕
                  </button>
                </span>
              </header>
              <object data={PDF + "#view=FitH"} type="application/pdf" style={doc} aria-label="Resume PDF">
                {/* iOS and some mobile browsers can't render inline PDFs */}
                <div style={fallback}>
                  <p style={{ marginBottom: 18 }}>
                    Your browser can&rsquo;t display the PDF inline.
                  </p>
                  <a className="pill blue" href={PDF} download>
                    Download the resume
                  </a>
                </div>
              </object>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export const useResume = () => useContext(Ctx);

const backdrop = {
  position: "fixed",
  inset: 0,
  zIndex: 150,
  background: "rgba(6, 7, 9, 0.86)",
  backdropFilter: "blur(6px)",
  display: "grid",
  placeItems: "center",
  padding: "clamp(12px, 3vw, 40px)",
};
const panel = {
  width: "min(940px, 100%)",
  height: "min(88vh, 100%)",
  background: "var(--bg)",
  border: "1px solid var(--hairline)",
  display: "grid",
  gridTemplateRows: "auto 1fr",
  overflow: "hidden",
};
const bar = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px 16px",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
  borderBottom: "1px solid var(--hairline)",
};
const link = { color: "var(--fg)", cursor: "pointer" };
const doc = { width: "100%", height: "100%", border: 0, background: "#3a3a3a" };
const fallback = {
  display: "grid",
  placeItems: "center",
  alignContent: "center",
  height: "100%",
  textAlign: "center",
  padding: 24,
};
