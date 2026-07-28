/* Render scripts/og-card.html -> public/og.png at 1200x630.
 *
 * Same pattern as build-resume.mjs: the HTML is the source of truth and CI
 * regenerates the PNG, so the share card can't drift from the design. Runs
 * before the site build for the same reason the resume does.
 */
import { execFileSync } from "node:child_process";
import { existsSync, statSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, "scripts/og-card.html");
const out = resolve(root, "public/og.png");

const CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "google-chrome-stable",
  "google-chrome",
  "chromium-browser",
  "chromium",
].filter(Boolean);

function findChrome() {
  for (const c of CANDIDATES) {
    try {
      if (c.includes("/")) {
        if (existsSync(c)) return c;
      } else {
        execFileSync("which", [c], { stdio: "pipe" });
        return c;
      }
    } catch {
      /* keep looking */
    }
  }
  throw new Error(
    "No Chrome/Chromium found. Set CHROME_PATH to a binary, or install Chrome."
  );
}

const chrome = findChrome();
mkdirSync(dirname(out), { recursive: true });
rmSync(out, { force: true });

execFileSync(
  chrome,
  [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    "--default-background-color=00000000",
    `--screenshot=${out}`,
    `file://${src}`,
  ],
  { stdio: "pipe" }
);

if (!existsSync(out)) throw new Error("Chrome produced no output at " + out);

// A card that renders before the webfonts load comes out visibly wrong, and the
// failure is silent, so treat an implausibly small file as a failed render.
const bytes = statSync(out).size;
if (bytes < 10_000) {
  throw new Error(`og.png is only ${bytes} bytes - the render probably failed.`);
}
console.log(`[og] Built ${out} (${(bytes / 1024).toFixed(0)} KB) with ${chrome}`);
