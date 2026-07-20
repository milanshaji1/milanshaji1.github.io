import { createContext, useContext } from "react";
import { useReducedMotion } from "framer-motion";

/* One gate for every animation on the site: motion runs when the OS
   allows it, or when ?motion is in the URL (testing override).
   Otherwise the page renders complete and static. */
const Ctx = createContext(true);

export function MotionOKProvider({ children }) {
  const prefersReduced = useReducedMotion();
  const forced =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("motion");
  return <Ctx.Provider value={forced || !prefersReduced}>{children}</Ctx.Provider>;
}

export const useMotionOK = () => useContext(Ctx);
