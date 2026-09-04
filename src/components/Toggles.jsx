import { useEffect, useState } from "react";

/* Yamada's rotated side switches — both functional.
   Theme and typeface persist across visits. */
export default function Toggles() {
  const [theme, setTheme] = useState("dark");
  const [font, setFont] = useState("sans");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setTheme(localStorage.getItem("ms-theme") || "dark");
      setFont(localStorage.getItem("ms-font") || "sans");
    } catch { /* Defaults still work when storage is unavailable. */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (loaded) try { localStorage.setItem("ms-theme", theme); } catch {}
  }, [theme, loaded]);
  useEffect(() => {
    document.documentElement.dataset.font = font;
    if (loaded) try { localStorage.setItem("ms-font", font); } catch {}
  }, [font, loaded]);

  return (
    <div className="side-toggles">
      <button
        aria-pressed={font === "mono"}
        onClick={() => setFont(font === "mono" ? "sans" : "mono")}
      >
        <span className="box" aria-hidden="true" />
        monospaced
      </button>
      <button aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>
        <span className="box" aria-hidden="true" />
        dark
      </button>
      <button aria-pressed={theme === "light"} onClick={() => setTheme("light")}>
        <span className="box" aria-hidden="true" />
        light
      </button>
    </div>
  );
}
