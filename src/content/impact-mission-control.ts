import type { ImpactOutcomeMode } from "./impact-page";

export const impactMissionControl = {
  eyebrow: "Live mission log",
  headline: "Impact at altitude.",
  subhead: "Autodesk · Wipro · EY",
  tagline:
    "A live read on where the work actually registered: adoption, resolution, and revenue across enterprise service transformation.",
  modes: [
    { key: "all", label: "All" },
    { key: "revenue", label: "Revenue" },
    { key: "operations", label: "Operations" },
    { key: "healthcare", label: "Healthcare" },
  ] as const,
  /** Simplified: 2 key metrics per mode, value + label only */
  metricsByMode: {
    all: [
      { value: "50M+", label: "Service & revenue impact" },
      { value: "4.57M", label: "Operational + healthcare reach" },
    ],
    revenue: [
      { value: "+27%", label: "RR lift" },
      { value: "106%", label: "NRR" },
    ],
    operations: [
      { value: "31%", label: "MTTR reduction" },
      { value: "16k", label: "Lockout cases reduced" },
    ],
    healthcare: [
      { value: "715", label: "Vaccinations driven" },
      { value: "4.57M", label: "Public health engagements" },
    ],
  } as const,

  /** Mode-specific floating numerals, Revenue excludes ops/health/global rollups */
  ambientMetricsByMode: {
    all: [
      "27%", "106%", "31%", "16k", "50M", "4.57M", "715", "24+", "30+",
      "Q1", "QoQ", "YoY", "NRR", "AOV", "MTTR", "NPS", "R/O/H",
      "0→1→2", "3 systems", "8-fig",
    ],
    revenue: [
      "+27%", "106%", "50M+", "NRR", "AOV", "RR", "QoQ", "YoY",
      "15+", "services", "tier", "expansion", "pipeline", "upsell",
      "▲", "R/O/H",
    ],
    operations: [
      "31%", "16k", "30+", "MTTR", "NPS", "cases", "handoff",
      "Q1", "QoQ", "50M", "▲", "CX", "EX",
    ],
    healthcare: [
      "715", "4.57M", "24+", "vacc", "reach", "partners", "state",
      "Q1", "engagement", "access", "▲",
    ],
  } as const satisfies Record<ImpactOutcomeMode, readonly string[]>,
  systems: {
    revenue: {
      title: "Revenue",
      narrative: "Tiered success plans → productized · under 12 mo",
      stats: ["+27% RR", "106% NRR path", "50M+ AOV", "15+ services"],
      signals: ["Autodesk RR", "Autodesk AOV", "Cross-org"],
    },
    operations: {
      title: "Operations",
      narrative: "Handoff redesign · lockout ↓ · CX/EX",
      stats: ["31% MTTR", "16k cases", "30+ outcomes", "+13% NPS"],
      signals: ["Wipro handoff", "Wipro lockout", "CX/EX exec"],
    },
    healthcare: {
      title: "Healthcare",
      narrative: "Engagement · access · care uptake",
      stats: ["24+ partners", "715 vacc", "4.57M reach", "multi-state"],
      signals: ["EY activation", "EY access", "Ecosystem"],
    },
  } as const,
  /** Primary system readout, horizontal strip metrics */
  readoutStrip: {
    all: [
      { value: "3", label: "systems" },
      { value: "50M+", label: "service impact" },
      { value: "4.57M", label: "reach" },
      { value: "106%", label: "NRR path" },
      { value: "31%", label: "MTTR ↓" },
    ],
    revenue: [
      { value: "End to end service and journey design", label: "" },
      { value: "Service Innovation", label: "" },
      { value: "Leading Through Change", label: "" },
      { value: "Customer Co-Creation", label: "" },
      { value: "Research Strategy", label: "" },
    ],
    operations: [
      { value: "31%", label: "MTTR ↓" },
      { value: "16k", label: "cases ↓" },
      { value: "30+", label: "outcomes" },
      { value: "+13%", label: "NPS" },
    ],
    healthcare: [
      { value: "24+", label: "partners" },
      { value: "715", label: "vaccinations" },
      { value: "4.57M", label: "engagements" },
    ],
  } as const satisfies Record<ImpactOutcomeMode, readonly { value: string; label: string }[]>,

  stateNarrative: {
    all: "R/O/H unified",
    revenue: "Autodesk service innovation",
    operations: "MTTR · cases · NPS",
    healthcare: "partners · vacc · reach",
  } as const satisfies Record<ImpactOutcomeMode, string>,

  dataNoiseByMode: {
    all: [
      "0.02", "1.4k", "99.2%", "▲", "●", "│", "├", "◆", "→", "·",
      "RSS", "OK", "PING", "LAT", "Q1", "QoQ", "NRR", "AOV",
      "3→", "106", "31", "715", "4.57M", "50M", "16k", "24+",
    ],
    revenue: [
      "0.02", "99.2%", "▲", "●", "→", "·", "Q1", "QoQ", "NRR", "AOV",
      "106", "+27", "50M", "15+", "RR", "tier", "expansion", "services",
    ],
    operations: [
      "0.02", "1.4k", "99.2%", "▲", "●", "→", "·", "Q1", "MTTR", "31",
      "16k", "50M", "cases", "NPS", "OK", "LAT",
    ],
    healthcare: [
      "0.02", "99.2%", "▲", "●", "→", "·", "715", "4.57M", "24+", "vacc", "reach",
    ],
  } as const satisfies Record<ImpactOutcomeMode, readonly string[]>,

  /** Micro readout telemetry strings */
  telemetryReadouts: {
    metrics: ["LAT 0.02ms", "OK", "3→", "▲ sync"],
    canvas: ["9 paths", "live", "3 nodes", "▲"],
    engine: ["RUN", "0.1s", "▲"],
    narrative: ["stream", "OK", "▲"],
  } as const,
  revenueTierExplanation: {
    business: {
      planLabel: "Business Plan",
      whyThisMatters: "Transforms services from support into revenue drivers",
      enabled: [
        "Strategic success planning",
        "+60% coaching engagement",
        "Faster time to value (-22%)",
      ],
      role: ["Premium service layer driving expansion and retention"],
      impact: ["50M+ AOV", "106% NRR path"],
    },
    professional: {
      planLabel: "Professional Plan",
      whyThisMatters:
        "Bridges self-service and guided support to scale strategic adoption.",
      enabled: [
        "Scaled success services built to increase utilization",
        "Improved feature adoption across mid-tier customers",
        "Bridged self-service with guided support",
      ],
      role: ["Scaled success layer that increases utilization and adoption"],
      impact: ["Supports the 106% NRR path", "Expands monetization through broader service uptake"],
    },
    included: {
      planLabel: "Included Plan",
      whyThisMatters:
        "Builds early value quickly and reduces dependency during onboarding.",
      enabled: [
        "Foundational self-service experiences for faster onboarding",
        "Reduced dependency on reactive support",
        "Improved early value realization",
      ],
      role: ["Foundational self-service layer for onboarding and early activation"],
      impact: ["Feeds retention by accelerating early outcomes", "Supports scalable service monetization"],
    },
  } as const,
  systemSummary: {
    revenue: {
      /** Shown first in the left column, above system label, so the metric is always visible without scrolling. */
      leadMetric: {
        value: "$50M",
        label: "Incremental AOV",
        descriptor: "Monetized AOV engine",
      },
      label: "AUTODESK SERVICE INNOVATION",
      /** Short system line under the title (revenue only) */
      systemContextLine:
        "Net-new team: designed, automated, and improved 15+ services across three packaged success plans in under 12 months.",
      introLines: [] as const,
      strategicRole:
        "Designed a new post-purchase service model at a critical moment when Autodesk needed to create greater value beyond the sale. Translated fragmented service experiences into a tiered, monetized offering system that aligned Design, Product, Support, and Engineering around a more strategic growth model.",
      modelTitle: "Model:",
      model: "Tiered success plans → productized services",
      buildLine: "15+ services across three packaged success plans.",
      timeframeLine: "2Q to launch runway to design services for a net-new model.",
      scopeLines: [] as const,
      outcomesTitle: "Impact",
      outcomes: [
        {
          value: "+27%",
          label: "Rev lift",
          descriptor: "Premium retention engine",
        },
        {
          value: "106%",
          label: "NRR path",
          descriptor: "Retention path secured",
        },
      ],
      whyItMattered: [
        "Turned post-purchase services from reactive support into a tiered revenue engine.",
        "Connected Design, Product, Support, and Engineering through packaged offerings that increased retention, accelerated value realization, and expanded monetization.",
      ],
    },
    operations: {
      label: "OPERATIONS",
      introLines: [] as const,
      modelTitle: "Model:",
      model: "Handoff redesign · throughput acceleration",
      scopeLines: [
        "3 tiers · support pipelines",
        "MTTR ↓ via optimized escalation paths",
        "CX/EX alignment for faster resolution",
      ],
      outcomes: [
        { value: "31%", label: "MTTR ↓" },
        { value: "16k", label: "cases ↓" },
        { value: "30+", label: "outcomes" },
      ],
    },
    healthcare: {
      label: "HEALTHCARE",
      introLines: [] as const,
      modelTitle: "Model:",
      model: "Engagement · access · care uptake",
      scopeLines: [
        "3 transformation systems · ecosystem partners",
        "Care pathways optimized for adoption velocity",
        "Multi-state delivery for scalable outcomes",
      ],
      outcomes: [
        { value: "715", label: "vaccinations" },
        { value: "4.57M", label: "engagements" },
        { value: "24+", label: "partners" },
      ],
    },
  } as const,
} as const;

