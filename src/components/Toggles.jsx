import { useEffect, useState } from "react";

/* Yamada's rotated side switches — both functional.
   Theme and typeface persist across visits. */
export default function Toggles() {
  const [theme, setTheme] = useState(() => localStorage.getItem("ms-theme") || "dark");
  const [font, setFont] = useState(() => localStorage.getItem("ms-font") || "sans");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ms-theme", theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.font = font;
    localStorage.setItem("ms-font", font);
  }, [font]);

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
