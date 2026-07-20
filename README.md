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

## Deploy (GitHub Pages)

```sh
npm run build      # emits dist/ with relative asset paths
```

Push the contents of `dist/` to the `main` branch of `milanshaji1/milanshaji1.github.io`.
