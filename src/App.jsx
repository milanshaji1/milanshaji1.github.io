import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { useMotionOK } from "./motion-ok.jsx";
import Preloader from "./components/Preloader.jsx";
import { ResumeProvider } from "./components/ResumeViewer.jsx";
import Toggles from "./components/Toggles.jsx";
import Hero from "./components/Hero.jsx";
import Statement from "./components/Statement.jsx";
import Work from "./components/Work.jsx";
import Numbers from "./components/Numbers.jsx";
import Info from "./components/Info.jsx";
import FooterContact from "./components/FooterContact.jsx";

export default function App() {
  const motionOK = useMotionOK();
  const [booted, setBooted] = useState(!motionOK);
  const onBootDone = useCallback(() => setBooted(true), []);

  /* lets pure-CSS animations (grain drift) key off the motion gate */
  useEffect(() => {
    document.documentElement.classList.toggle("motion-ok", motionOK);
  }, [motionOK]);

  useEffect(() => {
    if (!motionOK) return;
    const lenis = new Lenis({ lerp: 0.09 });
    let rafId;
    const raf = (t) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [motionOK]);

  return (
    <ResumeProvider>
      <AnimatePresence>{!booted && <Preloader onDone={onBootDone} />}</AnimatePresence>
      <div className="frame" aria-hidden="true" />
      <p className="frame-copyright mono">© milan shaji</p>
      <Toggles />
      <main>
        <Hero booted={booted} />
        <Statement />
        <Work />
        <Numbers />
        <Info />
      </main>
      <FooterContact />
    </ResumeProvider>
  );
}
