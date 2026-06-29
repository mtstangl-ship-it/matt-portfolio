export type ImpactOutcomeMode = "revenue" | "operations" | "healthcare" | "all";

export const impactPage = {
  hero: {
    headline: "Impact across transformation systems",
    subhead:
      "Revenue lift, operational performance, and healthcare outcomes, proven through journey-led design across Autodesk, Wipro, and EY.",
  },
  globalImpact: {
    headline: "Global impact, instrumented",
    subhead:
      "A system view of how transformation signals compound into measurable outcomes.",
    segments: [
      { key: "all", label: "All" },
      { key: "revenue", label: "Revenue" },
      { key: "operations", label: "Operations" },
      { key: "healthcare", label: "Healthcare" },
    ] as const,
    metricsByMode: {
      all: [
        { label: "Transformation systems instrumented", value: "3" },
        { label: "Combined service/revenue impact", value: "50M+" },
        { label: "Operational + healthcare outcome delta", value: "4.57M" },
      ],
      revenue: [
        { label: "Revenue uplift", value: "+27%" },
        { label: "NRR path achievement", value: "106%" },
        { label: "Net-new offering impact", value: "50M+" },
      ],
      operations: [
        { label: "MTTR reduction", value: "31%" },
        { label: "Lockout cases reduced", value: "16k" },
        { label: "AOV driven service output", value: "50M+" },
      ],
      healthcare: [
        { label: "Vaccinations driven", value: "715" },
        { label: "Public health engagements", value: "4.57M" },
        { label: "Partnership scale", value: "24+" },
      ],
    },
  },
  transformationModules: {
    profiles: {
      Autodesk: {
        theme: "Revenue + productized services + modernization",
        expandedNarrative:
          "Autodesk moved from fragmented support and point solutions to a productized post-purchase service system. The work linked design, product, support, and engineering so offering logic, lifecycle experience, and commercial modernization reinforced each other instead of competing.",
        signalSystemImpact: [
          { label: "Signal", value: "Fragmented post-purchase experience and disconnected value realization moments." },
          { label: "System", value: "Journey architecture + productized service model + cross-functional operating rhythm." },
          { label: "Impact", value: "Revenue lift, stronger relationship design, and scalable modernization path." },
        ],
      },
      Wipro: {
        theme: "Operations + alignment + workflow performance",
        expandedNarrative:
          "Wipro’s transformation focused on operational friction across onboarding and support. Executive alignment and journey-led redesign connected product, IT, and operations into one service system where handoffs, escalation paths, and experience outcomes were managed as a single performance model.",
        signalSystemImpact: [
          { label: "Signal", value: "Recurring workflow friction, lockouts, and inconsistent onboarding/support experiences." },
          { label: "System", value: "Executive facilitation + operational alignment + workflow redesign at service level." },
          { label: "Impact", value: "Faster resolution, reduced friction, and measurable EX/CX performance gains." },
        ],
      },
      EY: {
        theme: "Healthcare + engagement + access + outcomes",
        expandedNarrative:
          "EY’s public health work translated engagement into access at scale. The program aligned agencies, providers, and partners around a coordinated outreach and care-navigation system that reduced barriers and converted awareness into real vaccination outcomes across diverse communities.",
        signalSystemImpact: [
          { label: "Signal", value: "High-variance access barriers and uneven engagement across populations." },
          { label: "System", value: "Ecosystem orchestration + patient engagement design + statewide activation model." },
          { label: "Impact", value: "Higher uptake, expanded access pathways, and sustained program performance." },
        ],
      },
    } as const,
    methodsHeadline: "How methods connect to outcomes",
    methodsSubhead:
      "Not dashboards for dashboards’ sake, this proof layer shows the architecture behind the results.",
    methods: [
      {
        title: "Journey architecture",
        body:
          "Map end-to-end workflows, define the system of moments, and align teams on the constraints that matter.",
      },
      {
        title: "Service design",
        body:
          "Turn experience signals into service mechanics: offerings, staffing, processes, and governance that hold up in the real world.",
      },
      {
        title: "Operating model alignment",
        body:
          "Instrument decision rights and handoffs so improvements can compound instead of resetting every quarter.",
      },
      {
        title: "Research & co-creation",
        body:
          "Validate with the people living the journey, then prototype with partners to reduce risk before scale.",
      },
      {
        title: "Prototype builds",
        body:
          "Build the smallest shippable service loop to de-risk transformation and prove measurable deltas.",
      },
    ],
    cta: {
      headline: "Want an executive-ready proof layer?",
      subhead:
        "I’ll help you instrument transformation signals so impact becomes measurable, defensible, and communicable.",
      buttonLabel: "Request a transformation consult",
      buttonHref: "/contact",
    },
  },
} as const;

