/**
 * Copy & structure for the Impact briefing dashboard
 * (design/impact-dashboard/.../Impact Dashboard.html).
 */

export type ImpactBriefingTab = "revenue" | "ops" | "health";

export const IMPACT_TAB_STORAGE_KEY = "stangl-impact-tab";

export const impactBriefingTop = {
  crumbLead: "CONSOLE",
  crumbMid: "Impact",
  sigName: "Matt Stangl",
  sigRole: "CX, Product & Service Design Leader",
} as const;

export const impactBriefingIdentity = {
  kicker: "IMPACT · 2020–2026",
  headline: "Three enterprise transformations. In numbers.",
  headlineMuted: "",
  sub: "What shipped, what moved, what carried.",
  card: [
    { k: "Operator", v: "Matt Stangl", vBold: true as const },
    { k: "Role", v: "CX, Product & Service Design Leader" },
    { k: "Engagements", v: "Autodesk · Wipro · EY", teal: true as const },
    { k: "Scope", v: "Practice building · Service transformation · Ecosystem design" },
  ],
} as const;

export const impactBriefingTabs = [
  {
    id: "revenue" as const,
    idx: "01 / Revenue",
    name: "Service design and management as revenue motion",
    client: "Autodesk",
  },
  {
    id: "ops" as const,
    idx: "02 / Operations",
    name: "Six towers, one model",
    client: "Wipro",
  },
  {
    id: "health" as const,
    idx: "03 / Healthcare",
    name: "Care pathways, built for adoption",
    client: "EY",
  },
] as const;

export const crumbLabels: Record<ImpactBriefingTab, string> = {
  revenue: "Revenue",
  ops: "Operations",
  health: "Healthcare",
};

export type ServiceChip = { label: string; state: "innovated" | "optimized" | "refined" };

export type HeroMetricSpec =
  | { kind: "aov"; em: string }
  | { kind: "plain"; em: string; suffix: string }
  | { kind: "decimal"; em: string; suffix: string };

export type LadderTier = {
  id: string;
  stepLabel: string;
  stepSub: string;
  name: string;
  desc: string;
  lift: string;
  liftNote: string;
  sub: string;
  barPct: number;
  services: ServiceChip[];
  legend: { innovated: number; optimized: number; refined: number };
};

export const impactCaseRevenue = {
  tag: "01 · Autodesk · Revenue",
  title: "My team designed Autodesk's new Post-Purchase Model.",
  roleLead: "I led strategy, design direction, and experience reviews on the new ",
  roleBold: "post-purchase service model",
  roleTrail: ".",
  hero: { kind: "aov" as const, em: "50" },
  heroLbl: "Incremental AOV",
  heroUnit: "Monetized AOV engine · 12 mo",
  metrics: [
    { v: "+27", vSmall: "%", k: "Revenue lift" },
    { v: "106", vSmall: "%", k: "NRR path" },
    { v: "15", vSmall: "+", k: "Services shipped" },
    { v: "<12", vSmall: "mo", k: "To launch" },
  ],
  sectionTitle: "The three-tier service ladder",
  sectionHint: "Tap a tier to open",
  tiers: [
    {
      id: "business",
      stepLabel: "TIER 01",
      stepSub: "Premium",
      name: "Business Plan",
      desc: "Strategic planning and coaching-heavy delivery. Designed to expand accounts and run post-purchase as a revenue motion.",
      lift: "+18",
      liftNote: "% of lift",
      sub: "6 services · coaching",
      barPct: 92,
      services: [
        { label: "Strategic success planning", state: "innovated" },
        { label: "Executive business review", state: "innovated" },
        { label: "Adoption roadmap", state: "innovated" },
        { label: "Named success manager", state: "optimized" },
        { label: "Quarterly health score", state: "optimized" },
        { label: "Priority escalation", state: "refined" },
      ],
      legend: { innovated: 3, optimized: 2, refined: 1 },
    },
    {
      id: "pro",
      stepLabel: "TIER 02",
      stepSub: "Targeted",
      name: "Professional Plan",
      desc: "Targeted engagements that accelerate deployment and close capability gaps — sold as attachable packages.",
      lift: "+7",
      liftNote: "% of lift",
      sub: "4 services · attach",
      barPct: 56,
      services: [
        { label: "Deployment accelerators", state: "innovated" },
        { label: "Capability workshops", state: "optimized" },
        { label: "Integration advisory", state: "optimized" },
        { label: "On-demand expert hours", state: "refined" },
      ],
      legend: { innovated: 1, optimized: 2, refined: 1 },
    },
    {
      id: "included",
      stepLabel: "TIER 03",
      stepSub: "Foundational",
      name: "Included Plan",
      desc: "Self-service and onboarding paths to first value. Builds retention at the base and feeds customers upsell-ready into higher tiers.",
      lift: "+2",
      liftNote: "% of lift",
      sub: "5 services · retain",
      barPct: 34,
      services: [
        { label: "Guided onboarding", state: "innovated" },
        { label: "Self-serve learning paths", state: "innovated" },
        { label: "Community access", state: "optimized" },
        { label: "Knowledge base", state: "refined" },
        { label: "Product telemetry nudges", state: "refined" },
      ],
      legend: { innovated: 2, optimized: 1, refined: 2 },
    },
  ] satisfies LadderTier[],
};

export const impactCaseOps = {
  tag: "02 · Wipro · Operations",
  title: "I unified six service towers into one operating model.",
  roleLead: "At Wipro, I led transformation across ",
  roleBold: "six ITIL service towers",
  roleTrail:
    " for Estée Lauder — building the frameworks, metrics, and delivery model that improved NPS past goal.",
  hero: { kind: "plain" as const, em: "31", suffix: "%" },
  heroLbl: "MTTR REDUCTION · ACROSS ALL ROUTED CASES",
  heroUnit: "",
  metrics: [
    { v: "30", vSmall: "+", k: "OUTCOMES SHIPPED" },
    { v: "+13", vSmall: "%", k: "NPS GOAL EXCEEDED" },
    { v: "13K", vSmall: "", k: "ANNUAL REDUCTION IN LOCKOUT CASES" },
  ],
  compareTitle: "Before vs. after — unified service delivery",
  compareHint: "Normalized across ticket classes",
  beforeTtl: "Before — legacy handoff",
  beforeBig: "6.8",
  beforeUnit: "days",
  beforeBar: 100,
  beforeNote:
    "Cases bounced across tiers. Context was rewritten at each handoff; the customer restarted the conversation.",
  afterTtl: "After — redesigned tiers",
  afterBig: "4.7",
  afterUnit: "days",
  afterBar: 69,
  afterNote:
    "Clear ownership per tier, structured handoff payload, and a single escalation path. Context moves with the case.",
  deltaLeft: "Delta across all routed cases",
  deltaRight: "−31% MTTR · ≈ 2.1 days returned per case",
  handoffTitle: "The redesigned handoff, tier by tier",
  handoffHint: "Flow → speed",
  handoffLabel: "Case lifecycle · resolve at the lowest possible tier",
  handoffNodes: [
    {
      tier: "1" as const,
      dot: "T1",
      h: "Triage & resolve",
      d: "Structured intake. 72% of cases close here with a named owner from minute one.",
      sla: "Target: < 4h",
    },
    {
      tier: "2" as const,
      dot: "T2",
      h: "Specialist engage",
      d: "Domain engineer picks up a full context payload — no customer restart.",
      sla: "Target: < 2d",
    },
    {
      tier: "3" as const,
      dot: "T3",
      h: "Product & engineering",
      d: "Reserved for defects and architectural fixes. Feeds the roadmap directly.",
      sla: "Target: < 5d",
    },
  ],
};

/** Georgia outline from design HTML (viewBox scaled with markers). */
export const GEORGIA_PATH_D =
  "M 131.7,0.0 L 84.5,5.9 L 36.7,11.9 L 0.0,17.8 L 1.4,23.7 L 3.7,29.6 L 4.6,35.6 L 4.6,41.5 L 6.4,47.4 L 8.7,53.3 L 10.6,59.3 L 11.9,65.2 L 11.9,71.1 L 14.2,77.0 L 15.6,83.0 L 17.4,88.9 L 19.3,94.8 L 21.6,100.7 L 23.4,106.7 L 24.8,112.6 L 25.2,118.5 L 26.2,124.4 L 27.5,130.4 L 29.4,136.3 L 31.7,142.2 L 33.0,148.1 L 32.6,154.1 L 34.9,160.0 L 37.2,165.9 L 38.6,171.9 L 40.4,177.8 L 43.6,183.7 L 48.7,189.6 L 49.6,195.6 L 52.8,201.5 L 53.2,207.4 L 46.4,213.3 L 45.9,219.3 L 46.4,225.2 L 45.9,231.1 L 44.1,237.0 L 45.4,243.0 L 49.6,248.9 L 50.0,254.8 L 50.0,260.7 L 48.7,266.7 L 49.6,272.6 L 50.0,278.5 L 54.2,284.4 L 56.0,290.4 L 58.3,296.3 L 62.0,302.2 L 62.9,308.1 L 215.7,314.1 L 218.5,320.0 L 226.3,316.0 L 227.2,310.1 L 225.4,304.2 L 224.5,298.3 L 224.0,292.3 L 254.3,286.4 L 251.5,280.5 L 252.0,274.6 L 255.2,268.6 L 252.0,262.7 L 257.5,256.8 L 260.7,250.9 L 256.6,244.9 L 260.3,239.0 L 264.9,233.1 L 261.6,227.2 L 264.9,221.2 L 267.6,215.3 L 267.6,209.4 L 273.1,203.5 L 274.5,197.5 L 271.3,191.6 L 260.7,185.7 L 259.8,179.8 L 257.5,173.8 L 255.7,167.9 L 254.8,162.0 L 243.7,156.0 L 242.4,150.1 L 240.1,144.2 L 237.3,138.3 L 235.5,132.3 L 232.3,126.4 L 223.1,120.5 L 215.3,114.6 L 212.1,108.6 L 205.2,102.7 L 202.4,96.8 L 192.8,90.9 L 188.7,84.9 L 184.1,79.0 L 172.6,73.1 L 167.1,67.2 L 160.2,61.2 L 158.4,55.3 L 156.1,49.4 L 151.9,43.5 L 149.6,37.5 L 131.3,31.6 L 122.1,25.7 L 120.7,19.8 L 124.4,13.8 L 127.6,7.9 L 132.7,2.0 Z";

export const impactCaseHealth = {
  tag: "03 · EY · Healthcare",
  title: "A national-best-practice COVID engagement program.",
  roleLead: "At EY, I led the experience design for Georgia's ",
  roleBold: "COVID-19 engagement operations",
  roleTrail:
    " — mobilizing cross-sector partners, designing care pathways for adoption velocity, and building a model recognized by the CDC as a national best practice.",
  hero: { kind: "decimal" as const, em: "4.57", suffix: "M" },
  heroLbl: "Engagements delivered",
  heroUnit: "Across 3 cities · 24+ partners",
  metrics: [
    { v: "4.57", vSmall: "M", k: "Engagements" },
    { v: "715", vSmall: "", k: "Vaccinations" },
    { v: "24", vSmall: "+", k: "Partners" },
    { v: "3", vSmall: "", k: "City hubs" },
  ],
  geoTitle: "Georgia delivery footprint",
  geoHint: "Hover a city",
  cities: [
    {
      id: "atlanta" as const,
      idLabel: "01",
      name: "Atlanta",
      small: "Metro hub · anchor partner sites",
      num: "2.41M",
      numSmall: "engagements · 452 vaccines",
      cx: 70,
      cy: 96,
      r: 10,
      label: "ATLANTA",
      lx: 70,
      ly: 80,
    },
    {
      id: "athens" as const,
      idLabel: "02",
      name: "Athens",
      small: "Twilight Criterium · UGA Athletics partnership",
      num: "1.65M",
      numSmall: "engagements · 175 vaccines",
      cx: 120,
      cy: 72,
      r: 7.5,
      label: "ATHENS",
      lx: 120,
      ly: 56,
    },
    {
      id: "savannah" as const,
      idLabel: "03",
      name: "Savannah",
      small: "Coastal delivery · mobile teams",
      num: "0.51M",
      numSmall: "engagements · 88 vaccines",
      cx: 246,
      cy: 224,
      r: 6.5,
      label: "SAVANNAH",
      lx: 246,
      ly: 245,
    },
  ],
  partners: [] as { b: string; rest: string }[],
};
