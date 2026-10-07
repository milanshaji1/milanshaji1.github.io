/* Everything the site says, in one place.
   Every figure is a measured result: backtest, eval run, CI, or grade. */

export const person = {
  name: "Milan Shaji",
  role: "Data & AI Systems",
  email: "milan.s.shaji@gmail.com",
  github: "https://github.com/milanshaji1",
  linkedin: "https://linkedin.com/in/milan-shaji",
  badgeText: "Explore my work",
  available: "available february 2027",
  blurb: [
    "Final-year student of",
    "Data Science × Business at QUT.",
    "I build systems",
    "that stay running,",
    "and never publish a number",
    "code hasn't checked.",
  ],
};

/* Boot sequence: the site re-checks its own published figures before
   showing them, the same gate Dispatch runs before a brief publishes. */
export const claims = [
  { n: "71%", label: "spike-day recall", src: "6-mo backtest" },
  { n: "531/531", label: "pinches caught", src: "1,847 frames" },
  { n: "30/30", label: "llm evals green", src: "live run" },
  { n: "44", label: "tests gating the pipeline", src: "ci" },
];

export const statement = {
  main: "I build data & AI systems that verify their own numbers, on live pipelines and honest baselines.",
  aside:
    "Half data science, half business: the model matters because of the decision it improves.",
};

export const works = [
  {
    id: "gold-coast-transport",
    title: "Gold Coast Crash Hotspots",
    caption: "2026 / independent study / public crash data",
    hoverline: "8,142 crashes · 500 m grid · held-out 2024 check",
    link: "https://milanshaji.com/gold-coast-transport-evidence/",
    linkLabel: "Open the transport dashboard",
    body: [
      "I wanted to use data to improve services where I live, so I asked where the Gold Coast should start investigating road safety. I built a reproducible study of 8,142 casualty crashes from 2020–2024: Python and SQL, a 500 m spatial grid, a BigQuery spatial check, a Power BI report on a star schema with DAX measures, and a public map dashboard.",
      "The top 20 squares cover 0.35% of the city but held 55 of the 695 serious crashes in held-out 2024, about 23 times their share by area. DBSCAN clustering caught 54, so the simpler count method stays. Fourteen of those 20 squares are mostly on state-controlled roads, mainly the Pacific Motorway, which TMR manages rather than the City. Ranking council roads separately gives the City its own list: it caught 40 of 384 serious crashes on council roads in 2024, against 24 for the combined list. Without traffic volumes, the counts can't measure risk per trip. The dashboard links to the methods, source code and reproducible data release.",
    ],
    metrics: [
      { value: 8142, suffix: "", label: "casualty crashes, 2020–2024" },
      { raw: "55 / 695", label: "2024 serious crashes in the top 20 squares, ranked on 2021–2023" },
      { raw: "23×", label: "the top 20 squares' share of serious crashes versus their share of the city's area" },
    ],
    stack: "python · sql · geopandas · dbscan · duckdb · bigquery · power bi · dax · leaflet · mcp",
    shots: [{
      src: "./media/transport-evidence.jpg",
      alt: "Gold Coast crash dashboard: the top 20 squares on a street map, coloured by who manages the road, with the selected square's crash counts",
      caption: "the public dashboard: crash hotspots on a street map, split by who manages the road",
    }],
  },
  {
    id: "paper-trail",
    title: "PaperTrail",
    caption: "2026 / stock screener + backtesting / validates its own signals",
    hoverline: "1,550 scanned · 60 tests · honest baseline",
    link: "https://github.com/milanshaji1/paper-trail",
    linkLabel: "github.com/milanshaji1/paper-trail",
    body: [
      "A self-hosted market terminal that screens roughly 1,550 US stocks and the top 50 crypto every 60 seconds, aggregating six free no-key data sources into a transparent 1–5 rating and concrete entry-timing engine. Every score decomposes into the trend, momentum, quality, valuation and risk inputs that produced it. Node.js and vanilla JavaScript, one runtime dependency, no build step, installable to a phone home screen.",
      "What matters is whether the score survives contact with reality. Backtesting and forward paper-trading engines (60 automated tests, test-driven, with look-ahead-bias guards) replay the signals against ten years of history and a live S&P 500 benchmark. Building that harness surfaced three separate bugs that had inflated returns by thirty-plus points: survivorship bias, a hindsight-selected universe, and stale entry pricing. The corrected result is reported in the app itself, on screen rather than buried: the signal set underperformed simply buying and holding the index.",
    ],
    metrics: [
      { value: 1550, suffix: "", label: "US stocks + 50 crypto, re-scanned every 60 seconds" },
      { value: 60, suffix: "", label: "automated tests, test-first, with look-ahead-bias guards" },
      { value: 3, suffix: "", label: "backtest-inflating bugs found and fixed: survivorship, hindsight, stale pricing" },
      { raw: "underperformed", label: "the honest result: signals lost to SPY buy-and-hold, reported in-app" },
    ],
    stack: "node.js · vanilla js · express · finnhub · fred · tradingview · github",
    shots: [
      {
        src: "./media/paper-trail-dashboard.jpg",
        alt: "PaperTrail dashboard: an amber oscilloscope of the live S&P 500, a macro index strip, and the Opportunity Radar ranking stocks 1–5 by momentum score across ~1,550 scanned names",
        caption: "the live terminal: S&P oscilloscope, macro strip, and the Opportunity Radar over ~1,550 scanned names",
      },
    ],
  },
  {
    id: "dispatch",
    title: "Dispatch",
    caption: "2026 / energy-market ML + LLM / publishes daily, unattended",
    hoverline: "71% recall · 30/30 evals · ~$0.07/brief",
    link: "https://github.com/milanshaji1/dispatch",
    linkLabel: "github.com/milanshaji1/dispatch",
    body: [
      "An AI market analyst for Australia's electricity grid. Spot prices idle for days, then blow past $300/MWh with little warning. Dispatch ingests over a million rows of 5-minute AEMO price and demand data into a DuckDB pipeline gated by 44 automated tests, refreshed daily.",
      "A gradient-boosted early-warning model flags likely spike days, benchmarked with rolling-origin backtests. An LLM analyst writes the daily briefing: 21–25 cited figures, each re-verified against source data before the brief may publish. Runs unattended every morning on GitHub Actions behind a public Streamlit dashboard.",
    ],
    metrics: [
      { value: 71, suffix: "%", label: "spike-day recall @ 20% alert budget (baselines reached 58%)" },
      { value: 30, suffix: "/30", label: "golden-question evals, live run" },
      { value: 44, suffix: "", label: "tests gating every ingest: data quality, leakage, verification" },
      { raw: "$0.06–0.12", label: "cost per verified brief, across five measured runs" },
    ],
    stack: "python · duckdb · gradient boosting · claude api · github actions · streamlit",
    shots: [
      {
        src: "./media/dispatch-dashboard.jpg",
        alt: "Dispatch dashboard showing tomorrow's spike risk per NEM region and 60 days of daily average spot prices",
        caption: "the live dashboard: spike risk per region, 60 days of real AEMO prices",
      },
      {
        src: "./media/dispatch-brief.jpg",
        alt: "A published Dispatch daily brief; cited figures are highlighted where they were re-verified against the database",
        caption: "a published brief: every highlighted figure re-checked against the database first",
      },
      {
        src: "./media/dispatch-evals.jpg",
        alt: "Golden-set evaluation table showing truth versus model answer with all rows correct, and backtest results JSON",
        caption: "the eval run and backtest output the headline numbers come from",
      },
    ],
  },
  {
    id: "gesture-canvas",
    title: "Gesture Canvas",
    caption: "2026 / computer vision, real-time / 50 tests green in ci",
    hoverline: "531/531 pinches · 0 false positives · 50 tests",
    link: "https://github.com/milanshaji1/gesture-canvas",
    linkLabel: "github.com/milanshaji1/gesture-canvas",
    body: [
      "Hand-tracked generative visuals in TouchDesigner, directed in plain English. MediaPipe webcam tracking drives visuals composited over the live camera feed: a shape rides the thumb–index pinch point, scales with hand aperture, and hides the moment tracking drops. The node network is generated from reproducible Python rather than wired by hand.",
      "A language layer directs the scene, but nothing a model says touches the render unchecked: every Claude response passes a strict JSON parameter contract, schema-validated field by field and rejected on any violation. That's Dispatch's verification discipline, applied to a system with no database to check against.",
    ],
    metrics: [
      { value: 531, suffix: "/531", label: "true pinches caught, calibrated on 1,847 recorded frames" },
      { value: 0, suffix: "", label: "false positives across 5,400+ frames" },
      { value: 50, suffix: "", label: "automated tests in CI" },
    ],
    stack: "python · touchdesigner · mediapipe · claude api · pytest",
    shots: [
      {
        src: "./media/gesture-canvas-concept.jpg",
        alt: "Concept illustration of MediaPipe hand landmarks with a particle burst at the pinch point",
        caption: "concept illustration, not a screenshot: the live system needs a webcam",
      },
    ],
  },
  {
    id: "handtracked-vfx",
    title: "Handtracked VFX",
    caption: "2026 / real-time video effect / live capture",
    hoverline: "3/3 regions gated · 23 filters evaluated",
    link: "https://github.com/milanshaji1/handtracked-vfx",
    linkLabel: "github.com/milanshaji1/handtracked-vfx",
    body: [
      "A real-time hand-tracked video effect, built after a filter trend went around social media. Three corner-pinned quads (one per finger-pair across both hands) mask a live-filtered copy of the camera feed, so moving your hands reshapes where each effect appears.",
      "Two failure modes drove the build. Effects that displace pixels can leak outside their intended shape, so each copy is filtered before masking rather than after. And losing tracking mid-effect can corrupt the whole render, so every region is gated to disappear cleanly when a hand leaves the frame.",
    ],
    metrics: [
      { value: 3, suffix: "/3", label: "regions verified to hide cleanly on hand dropout" },
      { value: 23, suffix: "", label: "built-in filters rendered against live video before choosing" },
    ],
    stack: "touchdesigner · mediapipe · real-time compositing",
    shots: [
      {
        src: "./media/handtracked-vfx.jpg",
        alt: "Live capture: three hand-framed regions, each showing a different filter applied to the camera feed",
        caption: "live capture: three regions, each a different filter, framed by finger-pairs",
      },
    ],
  },
];

export const numbers = [
  { value: 71, suffix: "%", label: "spike-day recall, 6-mo backtest" },
  { value: 531, suffix: "/531", label: "pinches caught" },
  { value: 30, suffix: "/30", label: "llm evals green" },
  { value: 94, suffix: "%", label: "cnn test accuracy" },
  { value: 44, suffix: "", label: "tests gating the pipeline" },
  { value: 60, suffix: "", label: "tests, PaperTrail" },
  { prefix: "top ", value: 7, suffix: "%", label: "kaggle, ~3,500 entrants" },
];

export const info = {
  about: [
    "I'm finishing a dual degree at QUT (Bachelor of Data Science alongside a Bachelor of Business in Entrepreneurship & Innovation) because a technically perfect answer to the wrong question is still wrong.",
    "Outside the degree: three years on a high-volume retail floor (15–20% over target, trained six people, keyholder within the year), committee at the QUT Data Science Club, volunteer tutor for first-year statistics and programming.",
    "Graduating late 2026. Looking for a 2027 graduate seat in data, analytics and AI.",
  ],
  habits: [
    "01. live beats finished: a system proves itself by running unattended.",
    "02. verification is code: no number ships unchecked.",
    "03. start from the decision: the business half of the degree isn't decoration.",
  ],
  toolkit: [
    ["modelling & ml", "Python (pandas, NumPy, scikit-learn, PyTorch) · SQL · R · MediaPipe · statistical modelling · time-series & backtesting"],
    ["ai engineering", "Claude API · LLM evaluation · golden-question sets · schema-validated outputs · citation verification"],
    ["bi & storytelling", "Power BI · Tableau · Teradata · Streamlit · TouchDesigner · dashboard design"],
    ["pipelines & platform", "ETL design · DuckDB · data-quality testing · AWS (S3, EC2) · Git · GitHub Actions · Linux"],
    ["delivery", "requirements analysis · data validation · documentation · business cases · stakeholder communication"],
  ],
  log: [
    ["2026", "PaperTrail, Dispatch, Gesture Canvas & Handtracked VFX shipped · Forage simulations (Quantium, CommBank, ANZ)"],
    ["2022–2026", "QUT dual degree: Data Science | Business (Ent. & Innovation)"],
    ["2024–now", "QUT Data Science Club committee · volunteer tutor · Kaggle (best: top 7% of ~3,500)"],
    ["2023–now", "Universal Store, sales associate"],
    ["2022", "Rivers, sales associate"],
  ],
};
