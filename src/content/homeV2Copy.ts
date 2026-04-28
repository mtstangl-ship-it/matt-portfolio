/**
 * Editorial strings aligned with COPY-home.md / v2 prototype for Home port.
 * COPY-home.md is updated when shipped Home copy changes (keeps editorial lock aligned).
 */
export const homeV2Hero = {
  kicker: "CX, Product & Service Design Leader · Director / Senior Manager",
  headline:
    "I turn fragmented experiences into flow-state customer value.",
  subhead:
    "For enterprises where the journey has splintered across operational silos.",
  availability:
    "Available for senior design leadership roles, especially in healthcare.",
  contacts: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mattstangl", external: true },
    { label: "mtstangl@gmail.com", href: "mailto:mtstangl@gmail.com", external: true },
  ] as const,
  proofStrip: [
    "Autodesk",
    "Wipro",
    "EY",
    "Discovery Communications",
    "Stanford AI Certified",
  ] as const,
};

export const homeV2TickerClients = [
  "Estée Lauder Companies",
  "University of Georgia Athletics",
  "Humana",
  "Citi",
  "Travel Wisconsin",
  "Molson Coors",
  "Culver's",
  "Doctors Without Borders",
  "State of Oklahoma",
  "United Way",
  "United Healthcare",
] as const;

/** Column copy order — paired by index (COPY-home.md Problem Ledger). */
export const homeV2LedgerSolved = [
  `Turned Autodesk's post-purchase support into a $50M revenue motion`,
  `Unified Wipro's six ITIL towers into one operating model for Estée Lauder`,
  `De-politicized vaccination engagement across Georgia — CDC national best practice`,
  `Cut MTTR by 31% — 13K annual lockouts eliminated`,
  `Built a global CX practice from zero at an enterprise consultancy`,
  `Made synthetic users a research method with documented QA pipeline`,
] as const;

export const homeV2LedgerIntent = [
  `Scaling healthcare access for populations the system was never built to serve`,
  `Friction between patients, providers, and insurers that nobody owns by design`,
  `Stigmatized care treated as a clinical experience, not a moral one`,
  `Experience design as an operating model, not a team`,
  `Service tiers designed around what customers actually value — not what we can charge for`,
  `AI strategy that raises the ceiling of what teams can do, not just the floor`,
] as const;

export const homeV2Dashboard = {
  kicker: "FIG. 03 · DASHBOARD",
  headline: "Three transformations. In numbers.",
  subhead: "What shipped, what moved, what carried.",
  ctaLabel: "View Exec Dashboard",
  ctaHref: "/impact",
} as const;

/** Centaur featured card — COPY-home.md Case 01 meta + artifact pointers */
export const homeV2CentaurMeta = [
  { label: "Tools", value: "Cursor · Claude · Claude Design · Vercel" },
  { label: "Mode", value: "Centaur, human in the saddle" },
  { label: "Method", value: "Design a system, then use models for variation, critique, and scaffolding" },
  {
    label: "Output",
    value: "Coherent portfolio system, reusable build pipeline, and a review trace you can inspect",
  },
] as const;

/** Number · label (sans); rendered as mono index + ink-4 sep + sans text */
export const homeV2CentaurArtifacts = [
  { num: "01", label: "Six-week build telemetry · decision trace" },
  { num: "02", label: "Synthetic Users QA · stress-test pipeline" },
  { num: "03", label: "Service records · methodology specimens" },
] as const;

/** Bottom Contact strip — aligned with COPY-home.md Tier 1 */
export const homeV2Contact = {
  subhead: "Senior design leadership roles. Healthcare preferred.",
} as const;

/** Preserved viz mapping: prototype paths → repo dashboard components */
export const preservedVizNote =
  "Prototype referenced AutodeskConstellation / WiproRadial / EYGeorgiaMap — repo uses JourneyFlowViz · TowerConvergenceViz · OrchestrationTimelineViz.";

export const homeV2SignalIntro = {
  kicker: "FIG. 06 · SIGNAL → STORY · ONGOING ARCHIVE",
  headlineLead: `I'm a design leader who can also write the spot, cut the film, and tell the story.`,
  headlineEm: `That's not common.`,
  subhead:
    "A running record of the signals I catch — moments, behavior, culture, emotion — and the short films they turn into.",
} as const;

export const homeV2SignalFilms = [
  {
    yt: "wnFTdF0VWM0",
    filmKicker: "FILM 01 · 2020",
    title: "Caron Butler Marches for George Floyd",
    subtitle: "Documentary short.",
    previewStartSeconds: 9,
  },
  {
    yt: "heAtSMBa5i8",
    filmKicker: "FILM 02 · 2021",
    title: "Georgia DPH Healthcare Heroes",
    subtitle: "Public health campaign film.",
    previewStartSeconds: 8,
  },
  {
    yt: "t-RAl7g2Olw",
    filmKicker: "FILM 03 · 2019",
    title: "Travel Wisconsin Rebrand Launch",
    subtitle: "Brand launch film.",
    previewStartSeconds: 6,
  },
  {
    yt: "XPZpVWSPZ2w",
    filmKicker: "FILM 04 · 2017",
    title: "Oprah: No Limits to Discovery",
    subtitle: "Network brand film.",
    previewStartSeconds: 10,
  },
] as const;
