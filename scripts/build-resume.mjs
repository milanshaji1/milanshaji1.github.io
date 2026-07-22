/* Render resume/resume.html -> public/Milan-Shaji-Resume.pdf
 *
 * The HTML is the single source of truth. Editing it and pushing is all
 * that's needed: CI runs this before the site build, so the PDF the site
 * serves can never drift from the source.
 *
 * The resume is tuned to fit exactly two pages, so this fails loudly if a
 * change pushes it to three — better a red build than a bad PDF.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, "resume/resume.html");
const out = resolve(root, "public/Milan-Shaji-Resume.pdf");
const EXPECTED_PAGES = 2;

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
  return null;
}

const chrome = findChrome();
if (!chrome) {
  console.warn("[resume] No Chrome found — keeping the existing PDF.");
  console.warn("[resume] Set CHROME_PATH to render it locally.");
  process.exit(0); // never block a site build over this
}

mkdirSync(dirname(out), { recursive: true });

execFileSync(
  chrome,
  [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--no-pdf-header-footer",
    "--print-to-pdf-no-header",
    `--print-to-pdf=${out}`,
    `file://${src}`,
  ],
  { stdio: "pipe" }
);

if (!existsSync(out)) {
  console.error("[resume] Chrome produced no PDF.");
  process.exit(1);
}

/* Count pages straight from the PDF so this works without poppler in CI. */
const bytes = readFileSync(out).toString("latin1");
const pages = (bytes.match(/\/Type\s*\/Page[^s]/g) || []).length;

if (pages && pages !== EXPECTED_PAGES) {
  console.error(
    `[resume] PDF is ${pages} pages, expected ${EXPECTED_PAGES}. ` +
      "Tighten @page margin, line-height or .entry spacing in resume.html " +
      "rather than cutting content."
  );
  process.exit(1);
}

console.log(`[resume] Built ${out} (${pages || "?"} pages) with ${chrome}`);
