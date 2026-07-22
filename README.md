# milanshaji1.github.io

Personal portfolio — Milan Shaji, Data Science × Business (QUT, class of 2026).

React + Vite + Framer Motion + Lenis. Design direction: the restraint of
p5aholic.me (hairline viewport frame, side toggles, thin type, grain) crossed
with the motion language of dennissnellenberg.com (greeting preloader, name
marquee, rotating badge, rolling links, magnetic pills, footer clock).

Functional details: dark/light theme and sans/monospaced typeface toggles
(persisted), live Brisbane clock, expanding work rows with a cursor-following
metric chip. Every figure on the site is a measured result — backtest, eval
run, CI, or grade. All motion sits behind a reduced-motion gate (`?motion`
forces it on for testing); without JavaScript or with reduced motion the page
renders complete and static.

## Develop

```sh
npm install
npm run dev        # http://localhost:4177
```

## Editing the resume

`resume/resume.html` is the only source of truth for the resume — a
self-contained HTML file tuned to fit exactly two A4 pages. To update it:

1. Edit `resume/resume.html`.
2. Commit and push to `main`.

That's it. A GitHub Action re-renders it to `public/Milan-Shaji-Resume.pdf`
(headless Chrome, `scripts/build-resume.mjs`) and redeploys the whole site,
so the PDF served on the live site and the one inside the in-page viewer are
always built from what's actually in the repo. If an edit pushes the resume
past two pages, the build fails loudly instead of shipping a bad PDF — fix it
by tightening `@page` margin, `line-height`, or `.entry` spacing in the
`<style>` block, not by cutting content.

To preview the PDF locally before pushing:

```sh
npm run resume     # writes public/Milan-Shaji-Resume.pdf
```

Requires Chrome or Chromium on your machine (auto-detected; set `CHROME_PATH`
to point at a specific binary). CI installs Chrome itself, so nothing extra
is needed there.

## Deploy (GitHub Pages via Actions)

Push to `main` and `.github/workflows/deploy.yml` builds the resume, builds
the site (`npm run build`), and deploys `dist/` to GitHub Pages automatically.

One-time repo setup:

1. Push this repo to `milanshaji1/milanshaji1.github.io` (or import history
   from the current live repo, then replace its contents with this one).
2. Repo → **Settings → Pages** → Source: **GitHub Actions** (not "Deploy from
   a branch" — the workflow needs to own the deploy).
3. Same page → Custom domain → `milanshaji.com` → Save, then tick
   **Enforce HTTPS** once DNS has propagated.

No manual build step or `dist/` push is needed after that — edit the resume,
edit content, or edit code, push, and the live site updates itself.
