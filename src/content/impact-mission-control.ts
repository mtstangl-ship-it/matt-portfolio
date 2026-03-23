import type { ImpactOutcomeMode } from "./impact-page";

export const impactMissionControl = {
  headline: "Impact across transformation systems",
  subhead:
    "A single transformation control surface where signals, system decisions, and measurable outcomes update in one stateful view.",
  modes: [
    { key: "all", label: "All" },
    { key: "revenue", label: "Revenue" },
    { key: "operations", label: "Operations" },
    { key: "healthcare", label: "Healthcare" },
  ] as const,
  metricsByMode: {
    all: [
      { value: "3", label: "transformation systems active", context: "Revenue, operations, and healthcare signal channels running in one integrated view." },
      { value: "50M+", label: "combined service/revenue impact", context: "Commercial outcome from productized service modernization and operating model design." },
      { value: "4.57M", label: "operational + healthcare delta", context: "Measured public engagement and downstream operational movement across complex ecosystems." },
    ],
    revenue: [
      { value: "50M+", label: "AON / commercial impact", context: "Net-new offering and service architecture impact on top-line growth pathways." },
      { value: "106%", label: "NRR path performance", context: "Relationship design and lifecycle experience supporting expansion and retention." },
      { value: "8-figure", label: "renewal path scale", context: "Program value sustained through transformation performance and operating alignment." },
    ],
    operations: [
      { value: "31%", label: "MTTR reduction", context: "Support performance gains from workflow and handoff redesign across systems." },
      { value: "16k", label: "annual lockout case reduction", context: "Operational friction removed through system-level service intervention." },
      { value: "30+", label: "CX/EX outcomes delivered", context: "Cross-team outcomes achieved via coordinated onboarding and support operations." },
    ],
    healthcare: [
      { value: "10+", label: "statewide partner network", context: "Agency, provider, and ecosystem collaboration activated toward shared care goals." },
      { value: "715", label: "vaccinations driven in activation", context: "Targeted campaign conversion from engagement into real-world care action." },
      { value: "4.57M", label: "public health engagements", context: "Scaled outreach footprint supporting access and navigation into care pathways." },
    ],
  } as const,
  systems: {
    revenue: {
      title: "Revenue system",
      narrative:
        "Productized service architecture modernized post-purchase journeys and connected experience design to commercial outcomes.",
      signals: [
        "Autodesk: new offering model with measurable RR lift",
        "Autodesk: service design leadership drove large AON path",
        "Cross-functional modernization linking product, support, and success",
      ],
    },
    operations: {
      title: "Operations system",
      narrative:
        "Workflow alignment across onboarding and support reduced friction and improved operational speed with executive-level orchestration.",
      signals: [
        "Wipro: handoff redesign across product, IT, and operations",
        "Wipro: reduced lockout and support workflow drag",
        "System-level CX/EX execution with measurable performance movement",
      ],
    },
    healthcare: {
      title: "Healthcare system",
      narrative:
        "Coordinated engagement and access design translated outreach into real care uptake across complex public health ecosystems.",
      signals: [
        "EY: statewide and regional public health activation model",
        "EY: engagement-to-care navigation reduced access barriers",
        "Ecosystem orchestration across agencies, providers, and partners",
      ],
    },
  } as const,
  stateNarrative: {
    all: "Cross-domain command view combining revenue, operations, and healthcare systems.",
    revenue: "Revenue mode emphasizes offering design and modernization performance.",
    operations: "Operations mode emphasizes workflow reliability and service throughput.",
    healthcare: "Healthcare mode emphasizes engagement, access, and care outcomes.",
  } as const satisfies Record<ImpactOutcomeMode, string>,
} as const;

