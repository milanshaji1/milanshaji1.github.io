# Resume source

`resume.html` is the source of truth for `assets/Milan-Shaji-Resume.pdf`. It is not linked from the live site — it's build tooling only.

To regenerate the PDF after editing:

```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --disable-gpu --no-pdf-header-footer --print-to-pdf-no-header \
  --print-to-pdf=../assets/Milan-Shaji-Resume.pdf \
  "file://$(pwd)/resume.html"
```

Then check `pdfinfo ../assets/Milan-Shaji-Resume.pdf | grep Pages` — this resume is tuned to fit exactly 2 pages. If it overflows, tighten `@page margin`, `line-height`, or `.entry` spacing in the `<style>` block before touching content.
