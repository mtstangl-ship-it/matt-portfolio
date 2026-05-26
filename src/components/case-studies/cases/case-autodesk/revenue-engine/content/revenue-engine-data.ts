/* Locked journey content — verbatim from design handoff data.js.
 * R-stage outcomes supersede window.OUTCOMES per production spec. */

export type RevenueEngineTier = "growth" | "nurture";

export type FrontstageActivity = {
  text: string;
  active?: boolean;
  muted?: boolean;
  footnote?: string;
};

export type StageTierContent = {
  deliveryMode: [string, string];
  frontstage: FrontstageActivity[];
};

export type BackstageContent = {
  people: string;
  process: string;
  platform: string;
};

export type RevenueEngineStage = {
  n: string;
  name: string;
  intent: string;
  part: string;
  partSub: string;
  ref: string;
  tiers: Record<RevenueEngineTier, StageTierContent>;
  backstage: BackstageContent;
};

export type BikePart = "frame" | "engine" | "tank" | "wheels" | "bars" | "seat";

export type StageCallout = {
  ref: string;
  label: string;
  px: number;
  py: number;
  lx: number;
  ly: number;
  newPart: Exclude<BikePart, "seat">;
};

export type RenewalOutcome = {
  fig: string;
  lbl: string;
  caption?: string;
};

export const REVENUE_ENGINE_STAGES: RevenueEngineStage[] = [
  {
    n: "01",
    name: "Identify outcomes",
    intent: "Establish trust. Inform & inspire decision-makers. Align & prioritize outcomes.",
    part: "FRAME",
    partSub: "TUBE / TRUSS",
    ref: "F-01",
    tiers: {
      growth: {
        deliveryMode: ["HIGH-TOUCH", "ADSK & PARTNER-LED"],
        frontstage: [
          { text: "Executive programs (1:few)", active: true },
          { text: "Innovation & thought-leadership" },
          { text: "Business alignment workshops" },
          { text: "EBRs & outcome reviews" },
        ],
      },
      nurture: {
        deliveryMode: ["MEDIUM-TOUCH", "DIGITAL-GUIDED"],
        frontstage: [
          { text: "Executive engagements (1:many)", active: true },
          { text: "QBR · outcomes & value review" },
          { text: "Outcome alignment workshops", muted: true },
        ],
      },
    },
    backstage: {
      people: "Sales + CSM enabled on common CBI method",
      process: "Outcome discovery, standard-yet-flexible",
      platform: "Gainsight playbooks · SFDC signal",
    },
  },
  {
    n: "02",
    name: "Evaluate solutions",
    intent: "Assess current state. Design & validate new solutions. Create & present the business case.",
    part: "ENGINE",
    partSub: "POWER UNIT",
    ref: "E-02",
    tiers: {
      growth: {
        deliveryMode: ["HIGH-TOUCH", "ADSK & PARTNER-LED"],
        frontstage: [
          { text: "Capability & workflow assessment", active: true },
          { text: "Technical demonstrations" },
          { text: "Custom solution design" },
          { text: "Validate in pilots · build a business case" },
        ],
      },
      nurture: {
        deliveryMode: ["MEDIUM-TOUCH", "DIGITAL-GUIDED"],
        frontstage: [
          { text: "Coordinated solution evaluation", active: true },
          { text: "Test & validate in trial" },
          { text: "Capability assessment · Tech demo", muted: true },
        ],
      },
    },
    backstage: {
      people: "Partners + Tech Sales on ROI & assessment",
      process: "Shared ROI projection templates",
      platform: "Solution & reference architecture library",
    },
  },
  {
    n: "03",
    name: "Create a plan",
    intent: "Define milestones, metrics, R&R. Prioritize & schedule. Source & customize content.",
    part: "TANK + LINES",
    partSub: "FUEL VESSEL",
    ref: "T-03",
    tiers: {
      growth: {
        deliveryMode: ["HIGH-TOUCH", "ADSK & PARTNER-LED"],
        frontstage: [
          { text: "Success planning workshops", active: true },
          { text: "Value planning workshops" },
          { text: "Implementation planning", footnote: "§" },
          { text: "Custom training development", footnote: "§" },
        ],
      },
      nurture: {
        deliveryMode: ["MEDIUM-TOUCH", "DIGITAL-GUIDED"],
        frontstage: [
          { text: "Guided roll-out planning", active: true },
          { text: "Reference plans & learning paths" },
          { text: "Value planning · Implementation", footnote: "§", muted: true },
        ],
      },
    },
    backstage: {
      people: "Value consultants on success & value planning",
      process: "Standard method for success planning",
      platform: "Plan telemetry · learning content routing",
    },
  },
  {
    n: "04",
    name: "Execute the plan",
    intent: "Inspire & upskill users. Support project adoption. Track progress & update plan.",
    part: "WHEELS + DRIVE",
    partSub: "CONTACT PATCH",
    ref: "W-04",
    tiers: {
      growth: {
        deliveryMode: ["HIGH-TOUCH", "ADSK & PARTNER-LED"],
        frontstage: [
          { text: "Frequent initiative check-ins", active: true },
          { text: "Deployment assistance", footnote: "§" },
          { text: "Project training & coaching", footnote: "§" },
          { text: "Technical health reviews", footnote: "§" },
        ],
      },
      nurture: {
        deliveryMode: ["MEDIUM-TOUCH", "DIGITAL-GUIDED"],
        frontstage: [
          { text: "QBR · outcomes & value review", active: true },
          { text: "Monitor health · escalate issues" },
          { text: "Deployment · Coaching", footnote: "§", muted: true },
        ],
      },
    },
    backstage: {
      people: "Partners + CSMs on adoption & change mgmt",
      process: "Real-time activity, status, goal tracking",
      platform: "Shared customer health · tier-aware alerts",
    },
  },
  {
    n: "05",
    name: "Assess the value",
    intent: "Track & measure value realized. Communicate achievements. Optimize solution value.",
    part: "BARS + INSTR.",
    partSub: "CONTROLS / FEEDBACK",
    ref: "C-05",
    tiers: {
      growth: {
        deliveryMode: ["HIGH-TOUCH", "ADSK & PARTNER-LED"],
        frontstage: [
          { text: "QBRs · review outcomes & value", active: true },
          { text: "Roadmap & feature request review" },
          { text: "Case studies · product roadmap sessions" },
        ],
      },
      nurture: {
        deliveryMode: ["MEDIUM-TOUCH", "DIGITAL-GUIDED"],
        frontstage: [
          { text: "QBR · outcomes & value review", active: true },
          { text: "Product roadmap reviews" },
          { text: "Create & share case studies", muted: true },
        ],
      },
    },
    backstage: {
      people: "Partners + CSMs on value measurement",
      process: "Standard value-tracking & roadmap review",
      platform: "Value dashboards · case-study authoring",
    },
  },
];

/** Stage index 5 = R / Renewal (not in REVENUE_ENGINE_STAGES). */
export const RENEWAL_STAGE_INDEX = 5;

export const RENEWAL = {
  n: "R",
  name: "Renewal",
  subtitle: "RENEWAL · CONTINUOUS",
} as const;

/** Same outcomes for both tiers — production override (not data.js OUTCOMES). */
export const RENEWAL_OUTCOMES: RenewalOutcome[] = [
  { caption: "PROJECTED", fig: "106%", lbl: "NRR" },
  { fig: "38%", lbl: "Op Margin" },
  { fig: "50+", lbl: "NPS" },
];

export const PART_BY_STAGE: Exclude<BikePart, "seat">[] = [
  "frame",
  "engine",
  "tank",
  "wheels",
  "bars",
];

export const STAGE_PARTS_CUMULATIVE: BikePart[][] = [
  ["frame"],
  ["frame", "engine"],
  ["frame", "engine", "tank"],
  ["frame", "engine", "tank", "wheels"],
  ["frame", "engine", "tank", "wheels", "bars", "seat"],
];

export const CALLOUT_FOR_STAGE: StageCallout[] = [
  { ref: "F-01", label: "TUBE / TRUSS", px: 240, py: 110, lx: 360, ly: 40, newPart: "frame" },
  { ref: "E-02", label: "POWER UNIT", px: 188, py: 138, lx: 60, ly: 200, newPart: "engine" },
  { ref: "T-03", label: "FUEL VESSEL", px: 248, py: 72, lx: 60, ly: 30, newPart: "tank" },
  { ref: "W-04", label: "CONTACT PATCH", px: 78, py: 168, lx: 60, ly: 230, newPart: "wheels" },
  { ref: "C-05", label: "CONTROLS", px: 286, py: 56, lx: 380, ly: 22, newPart: "bars" },
];

export const TIER_LABELS: Record<RevenueEngineTier, string> = {
  growth: "GROWTH PLUS",
  nurture: "NURTURE PLUS",
};

export function isRenewalStage(stageIndex: number): boolean {
  return stageIndex === RENEWAL_STAGE_INDEX;
}

export function getStagePillLabel(stageIndex: number): string {
  if (isRenewalStage(stageIndex)) {
    return "STAGE — R · RENEWAL";
  }

  const stage = REVENUE_ENGINE_STAGES[stageIndex];
  if (!stage) return "STAGE — 01 · IDENTIFY OUTCOMES";

  return `STAGE — ${stage.n} · ${stage.name.toUpperCase()}`;
}

