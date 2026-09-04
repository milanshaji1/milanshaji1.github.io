import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionOK } from "../motion-ok.jsx";

const PDF = "./Milan-Shaji-Resume.pdf";
const Ctx = createContext(() => {});

/* Reads the resume in place instead of forcing a download.
   Escape or a click outside closes it; downloading is still one click. */
export function ResumeProvider({ children }) {
  const [open, setOpen] = useState(false);
  const opener = useRef(null);
  const show = useCallback((trigger) => {
    opener.current = trigger || document.activeElement;
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Ctx.Provider value={show}>
      {children}
      <AnimatePresence>
        {open && <ResumeDialog onClose={close} opener={opener} />}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

function ResumeDialog({ onClose, opener }) {
  const motionOK = useMotionOK();
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const downloadLink = useRef(null);
  const pdf = useRef(null);

  const trapTab = (event) => {
    if (event.key !== "Tab") return;
    const targets = [...dialog.current.querySelectorAll('a[href], button, object')]
      .filter((element) => element.getClientRects().length > 0);
    const first = targets[0];
    const last = targets.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    const trigger = opener.current;
    element.showModal();
    closeButton.current.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [opener]);

  return (
    <motion.dialog
      ref={dialog}
      className="resume-dialog"
      style={backdrop}
      data-lenis-prevent=""
      onKeyDown={trapTab}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      initial={motionOK ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      exit={motionOK ? { opacity: 0 } : undefined}
      transition={{ duration: 0.25 }}
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
        <span className="focus-sentinel" tabIndex={0} onFocus={() => pdf.current.focus()} />
        <header style={bar}>
          <span className="mono">milan shaji · resume</span>
          <span style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <a ref={downloadLink} className="mono" href={PDF} download style={link}>
              download ↓
            </a>
            <a className="mono" href={PDF} target="_blank" rel="noopener" style={link}>
              open in tab ↗
            </a>
            <button ref={closeButton} autoFocus className="mono" onClick={onClose} style={link} aria-label="Close resume">
              close ✕
            </button>
          </span>
        </header>
        <object ref={pdf} tabIndex={0} data={PDF + "#view=FitH"} type="application/pdf" style={doc} aria-label="Resume PDF">
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
        <span className="focus-sentinel" tabIndex={0} onFocus={() => downloadLink.current.focus()} />
      </motion.div>
    </motion.dialog>
  );
}

export const useResume = () => useContext(Ctx);

const backdrop = {
  position: "fixed",
  inset: 0,
  width: "100%",
  maxWidth: "none",
  height: "100dvh",
  maxHeight: "none",
  margin: 0,
  border: 0,
  color: "var(--fg)",
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
