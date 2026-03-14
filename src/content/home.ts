export const hero = {
  tagline: "From fragmentation to flow",
  headlines: [
    "Journey architecture that reduces effort, eliminates manual work, and improves end-to-end resolution.",
    "I design and operationalize service systems that flow — from cross-channel support to closed-loop insight.",
    "AI-native transformation leader. Journey design. Service modernization. Cross-functional execution.",
  ] as const,
  activeHeadlineIndex: 0, // 0, 1, or 2 — pick your preferred headline
  subhead:
    "Journey architecture, service modernization, and cross-functional execution — reducing effort, eliminating manual work, and improving end-to-end resolution for enterprises.",
  proofStrip: ["Autodesk", "Wipro", "EY", "Stanford AI Certified"] as const,
};

export const brandThesis = {
  headline: "Experience isn't one moment. It's the whole journey.",
  body: [
    "Most organizations fix touchpoints in isolation. The result: fragmented experiences, frustrated customers, and wasted effort.",
    "I work at the system level — mapping journeys, aligning teams, and designing services that flow. The outcome: experiences that feel intentional, teams that move in sync, and outcomes that compound.",
  ],
};

export const transformationDashboard = {
  headline: "Transformation impact",
  subhead:
    "Outcomes from engagements across Autodesk, Wipro, and EY — journey-led operating models, service design, and operational transformation.",
  cta: "View full dashboard",
  ctaHref: "/work",
  companies: [
    {
      name: "Autodesk",
      headline: "Cross-channel service & support transformation",
      narrative:
        "Led design and operationalization of cross-channel customer servicing and support systems. Defined scalable journey models, platform requirements, and workflow logic. Drove CX strategy across Product, Engineering, Support, and Customer Success. Operationalized a 3–5 year experience vision and launched 3-tiered post-purchase service packages.",
      kpis: [
        { value: "+27%", label: "RR in first quarter" },
        { value: "10M+", label: "YOY AOV" },
        { value: "3-tier", label: "post-purchase packages" },
        { value: "5 yr", label: "experience vision" },
      ],
      capabilityTags: [
        "Journey Models",
        "Platform Requirements",
        "CX Strategy",
        "Operating Models",
        "Closed-Loop Insight",
      ],
    },
    {
      name: "Wipro",
      headline: "CX practice build & eight-figure renewal",
      narrative:
        "Built a CX practice from the ground up. Led transformation across six operating towers and partnered with C-suite stakeholders on financial and CX/EX outcomes. Delivered beyond target on customer experience improvement.",
      kpis: [
        { value: "15%+", label: "NPS improvement" },
        { value: "8-figure", label: "client renewal" },
        { value: "6", label: "operating towers" },
        { value: "C-suite", label: "stakeholder partnership" },
      ],
      capabilityTags: [
        "Practice Build",
        "Transformation",
        "Operating Towers",
        "CX/EX Outcomes",
      ],
    },
    {
      name: "EY",
      headline: "Experience strategy & large-scale transformation",
      narrative:
        "Led experience strategy and service design initiatives focused on large-scale operational transformation across public and private sector clients.",
      kpis: [
        { value: "Public", label: "sector experience" },
        { value: "Private", label: "sector experience" },
        { value: "Large-scale", label: "operational transformation" },
        { value: "Service Design", label: "& strategy" },
      ],
      capabilityTags: [
        "Experience Strategy",
        "Service Design",
        "Operational Transformation",
        "Public & Private Sector",
      ],
    },
  ] as const,
};

export const stanfordAI = {
  badge: "Stanford",
  title: "AI for Product Strategy",
  credential: "Professional Certificate",
  description:
    "Formal certification in AI applications for product and experience strategy — building AI literacy into how I advise on transformation.",
  cta: "View credential",
  ctaHref: "https://credentials.stanford.edu",
  ctaExternal: true,
};

export const featuredThinking = {
  headline: "Thinking",
  subhead: "Curated insights from LinkedIn — on experience design, transformation, and leadership.",
  cta: "Read more",
  ctaHref: "/thinking",
  items: [
    {
      quote:
        "The best service design is invisible. When everything flows, customers don't notice the design — they just get what they need.",
      topic: "Service design",
      date: "Nov 2024",
    },
    {
      quote:
        "Transformation fails when we optimize for efficiency before we understand the journey. Map first. Prescribe second.",
      topic: "Transformation",
      date: "Oct 2024",
    },
    {
      quote:
        "AI won't replace experience strategy — but leaders who understand AI will replace those who don't.",
      topic: "AI & Strategy",
      date: "Sep 2024",
    },
  ] as const,
};

export const featuredCaseStudies = {
  headline: "Selected work",
  subhead: "Deep dives into service and experience transformations.",
  cta: "View all case studies",
  ctaHref: "/work",
  items: [
    {
      slug: "financial-services-omni",
      client: "Financial Services",
      title: "Omni-channel redesign",
      description:
        "Unifying fragmented touchpoints into a single, coherent customer journey.",
      category: "Service Design",
    },
    {
      slug: "healthcare-care-pathway",
      client: "Healthcare",
      title: "Care pathway transformation",
      description:
        "Redesigning the patient journey from first contact through follow-up.",
      category: "Journey Design",
    },
    {
      slug: "retail-experience-strategy",
      client: "Retail",
      title: "Experience strategy",
      description:
        "Aligning digital and physical experiences around a shared vision.",
      category: "Experience Strategy",
    },
  ] as const,
};

export const contactCta = {
  headline: "Let's talk transformation",
  subhead:
    "Whether you're navigating a complex journey redesign or rethinking how your organization delivers value — I'd like to hear from you.",
  cta: "Get in touch",
  ctaHref: "/contact",
};
