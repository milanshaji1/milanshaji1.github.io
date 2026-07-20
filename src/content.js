/* Everything the site says, in one place.
   Every figure is a measured result — backtest, eval run, CI, or grade. */

export const person = {
  name: "Milan Shaji",
  role: "Data & AI Systems",
  email: "milan.s.shaji@gmail.com",
  github: "https://github.com/milanshaji1",
  linkedin: "https://linkedin.com/in/milan-shaji",
  located: "located in australia",
  available: "available february 2027",
  blurb: [
    "Final-year student of",
    "Data Science × Business at QUT.",
    "I build systems",
    "that stay running —",
    "and never publish a number",
    "code hasn't checked.",
  ],
};

export const greetings = ["G'day", "Hello", "Bonjour", "こんにちは", "Hola", "നമസ്കാരം", "Ciao"];

export const statement = {
  main: "I build data & AI systems that verify their own numbers. Live pipelines, honest baselines, no nonsense.",
  aside:
    "Half data science, half business — the model matters because of the decision it improves.",
};

export const works = [
  {
    id: "gridpulse",
    title: "GridPulse",
    caption: "2026 / ML + LLM pipeline / live — publishes daily, unattended",
    hoverline: "71% recall · 30/30 evals · ~$0.07/brief",
    link: "https://github.com/milanshaji1/gridpulse",
    linkLabel: "github.com/milanshaji1/gridpulse",
    body: [
      "An AI market analyst for Australia's electricity grid. Spot prices idle for days, then blow past $300/MWh with little warning — GridPulse ingests over a million rows of 5-minute AEMO price and demand data into a DuckDB pipeline gated by 38 automated data-quality tests, refreshed daily.",
      "A gradient-boosted early-warning model flags likely spike days, benchmarked with rolling-origin backtests. An LLM analyst writes the daily briefing: ~25 cited figures, each re-verified against source data before the brief may publish. Runs unattended every morning on GitHub Actions behind a public Streamlit dashboard.",
    ],
    metrics: [
      { value: 71, suffix: "%", label: "spike-day recall @ 20% alert budget — baselines reached 58%" },
      { value: 30, suffix: "/30", label: "golden-question evals, live run" },
      { value: 38, suffix: "", label: "data-quality gates on every ingest" },
      { raw: "~$0.07", label: "measured cost per verified brief" },
    ],
    stack: "python · duckdb · gradient boosting · claude api · github actions · streamlit",
  },
  {
    id: "gesture-canvas",
    title: "Gesture Canvas",
    caption: "2026 / computer vision, real-time / 31 tests green in ci",
    hoverline: "531/531 pinches · 0 false positives · 31 tests",
    link: "https://github.com/milanshaji1/gesture-canvas",
    linkLabel: "github.com/milanshaji1/gesture-canvas",
    body: [
      "Hand-tracked generative visuals in TouchDesigner, directed in plain English. MediaPipe webcam tracking drives visuals composited over the live camera feed — a shape rides the thumb–index pinch point, scales with hand aperture, and hides the moment tracking drops. The node network is generated from reproducible Python, not wired by hand.",
      "A language layer directs the scene, but nothing a model says touches the render unchecked: every Claude response passes a strict JSON parameter contract, schema-validated field by field and rejected on any violation — GridPulse's verification discipline, applied to a system with no database to check against.",
    ],
    metrics: [
      { value: 531, suffix: "/531", label: "true pinches caught, calibrated on 1,847 recorded frames" },
      { value: 0, suffix: "", label: "false positives across 5,400+ frames" },
      { value: 31, suffix: "", label: "automated tests in CI" },
    ],
    stack: "python · touchdesigner · mediapipe · claude api · pytest",
  },
  {
    id: "bi-capstone",
    title: "BI Capstone",
    caption: "2024 / business intelligence, client delivery / graded distinction",
    hoverline: "60,000 records · 1 day → minutes · distinction",
    link: null,
    linkLabel: "client work — stays off github",
    body: [
      "Data lead on a four-person team delivering a working BI solution to a real industry client through QUT's IAB303 capstone. The client's pipeline was quietly unreliable and reporting burned a full working day per cycle.",
      "We rebuilt the pipeline from scratch to process roughly 60,000 records dependably and shipped an executive dashboard that turned the reporting day into a live view refreshed in minutes. The client rated the work among the most useful they had received from a student team.",
    ],
    metrics: [
      { value: 60000, suffix: "", label: "records processed reliably" },
      { raw: "1 day → min", label: "reporting cycle, manual to live" },
      { raw: "Distinction", label: "QUT IAB303, graded" },
    ],
    stack: "requirements analysis · etl rebuild · dashboard design · client delivery",
  },
];

export const numbers = [
  { value: 71, suffix: "%", label: "spike-day recall" },
  { value: 531, suffix: "/531", label: "pinches caught" },
  { value: 30, suffix: "/30", label: "llm evals green" },
  { value: 94, suffix: "%", label: "cnn test accuracy" },
  { value: 38, suffix: "", label: "data-quality gates" },
  { prefix: "top ", value: 7, suffix: "%", label: "kaggle, ~3,500 entrants" },
];

export const info = {
  about: [
    "I'm finishing a dual degree at QUT — Bachelor of Data Science alongside a Bachelor of Business in Entrepreneurship & Innovation — because a technically perfect answer to the wrong question is still wrong.",
    "Outside the degree: two and a half years on a high-volume retail floor (15–20% over target, trained six people, keyholder within the year), committee at the QUT Data Science Club, volunteer tutor for first-year statistics and programming.",
    "Graduating late 2026. Looking for a 2027 graduate seat in data, analytics and AI.",
  ],
  habits: [
    "01 — live beats finished: a system proves itself by running unattended.",
    "02 — verification is code, not vibes: no number ships unchecked.",
    "03 — start from the decision: the business half of the degree isn't decoration.",
  ],
  toolkit: [
    ["modelling & ml", "Python (pandas, NumPy, scikit-learn, PyTorch) · SQL · R · MediaPipe · statistical modelling · time-series & backtesting"],
    ["ai engineering", "Claude API · LLM evaluation · golden-question sets · schema-validated outputs · citation verification"],
    ["bi & storytelling", "Power BI · Tableau · Teradata · Streamlit · TouchDesigner · dashboard design"],
    ["pipelines & platform", "ETL design · DuckDB · data-quality testing · AWS (S3, EC2) · Git · GitHub Actions · Linux"],
    ["delivery", "requirements analysis · data validation · documentation · business cases · stakeholder communication"],
  ],
  log: [
    ["2026", "GridPulse & Gesture Canvas shipped · Forage simulations (Quantium, CommBank, ANZ)"],
    ["2022–2026", "QUT dual degree — Data Science | Business (Ent. & Innovation), Distinction for the IAB303 capstone"],
    ["2024–now", "QUT Data Science Club committee · volunteer tutor · Kaggle (best: top 7% of ~3,500)"],
    ["2023–now", "Universal Store, sales associate"],
    ["2022", "Rivers, sales associate"],
  ],
};
