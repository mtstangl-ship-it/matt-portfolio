export const hero = {
  tagline: "From fragmentation to flow",
  headline: "I lead product and service transformation.",
  subhead:
    "Journey architecture and service modernization that reduce effort and improve resolution.",
  proofStrip: [
    "Autodesk",
    "Wipro",
    "EY",
    "Discovery Communications",
    "Stanford AI Certified",
  ] as const,
};

export const clientTicker = [
  "Estée Lauder Companies",
  "University of Georgia Athletics",
  "Humana",
  "Citi",
  "Travel Wisconsin",
  "Molson Coors",
] as const;

export const brandThesis = {
  headline: "Experience isn't one moment. It's the whole journey.",
  body: [
    "Most organizations fix touchpoints in isolation — fragmented experiences, frustrated customers, wasted effort.",
    "I work at the system level: mapping journeys, aligning teams, designing services that flow. Outcomes that compound.",
  ],
};

export const transformationDashboard = {
  headline: "Transformation impact",
  subhead: "Journey-led operating models and service design.",
  cta: "View full dashboard",
  ctaHref: "/work",
  companies: [
    {
      name: "Autodesk",
      headline: "Cross-channel service & support transformation",
      narrative:
        "Journey models, platform requirements, CX strategy across Product, Engineering, Support. Launched post-purchase service packages and a 3–5 year experience vision.",
      kpis: [
        { value: "+27%", label: "RR in Q1 post-launch" },
        { value: "10M+", label: "YOY AOV in Q1 post-launch" },
        { value: "0→1", label: "post-purchase service launch" },
        { value: "3–5 yr", label: "experience vision" },
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
        "CX practice from zero. Six operating towers aligned. C-suite partnership on financial and CX/EX outcomes.",
      kpis: [
        { value: "33%", label: "MTTR reduction in 2 years" },
        { value: "30+", label: "CX/EX outcomes delivered" },
        { value: "15%+", label: "NPS improvement" },
        { value: "8-figure", label: "client renewal" },
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
        "Experience strategy for public health. Vaccine partnerships, vaccination outreach, claims at scale.",
      kpis: [
        { value: "10+", label: "vaccine brand partnerships" },
        { value: "715", label: "Say Yes Summer vaccinations" },
        { value: "4.57M", label: "social impressions" },
        { value: "15K", label: "UI claims in 6 weeks" },
      ],
      capabilityTags: [
        "Experience Strategy",
        "Service Design",
        "Public Health",
        "Public Sector",
      ],
    },
  ] as const,
};

export const stanfordAI = {
  badge: "Stanford",
  title: "AI for Product Strategy",
  credential: "Professional Certificate",
  description: "AI for product and experience strategy.",
  certImage: "/images/certifications/stanford-ai.svg",
  cta: "View credential",
  ctaHref: "https://credentials.stanford.edu",
  ctaExternal: true,
};

export const featuredThinking = {
  headline: "Thinking",
  subhead: "Experience design, transformation, leadership.",
  cta: "Read more",
  ctaHref: "/thinking",
  items: [
    {
      quote:
        "The best service design is invisible. When everything flows, customers don't notice the design — they just get what they need.",
      topic: "Service design",
      topicIcon: "workflow" as const,
      date: "Nov 2024",
    },
    {
      quote:
        "Transformation fails when we optimize for efficiency before we understand the journey. Map first. Prescribe second.",
      topic: "Transformation",
      topicIcon: "transformation" as const,
      date: "Oct 2024",
    },
    {
      quote:
        "AI won't replace experience strategy — but leaders who understand AI will replace those who don't.",
      topic: "AI & Strategy",
      topicIcon: "automation" as const,
      date: "Sep 2024",
    },
  ] as const,
};

export const featuredCaseStudies = {
  headline: "Selected work",
  subhead: "Four transformations.",
  cta: "View all",
  ctaHref: "/work",
  items: [
    {
      slug: "autodesk",
      motif: "journey" as const,
      client: "Autodesk",
      title: "Turning fragmented support into a unified post-purchase journey",
      outcome: "+27% RR, 10M+ AOV in Q1. First end-to-end post-purchase service launch.",
      category: "Service Design",
    },
    {
      slug: "wipro",
      motif: "converge" as const,
      client: "Wipro",
      title: "From zero to eight-figure renewal: building a CX practice",
      outcome: "33% MTTR reduction, 15%+ NPS. Eight-figure renewal.",
      category: "Transformation",
    },
    {
      slug: "ey-georgia-dph",
      motif: "flow" as const,
      client: "EY / Georgia DPH",
      title: "Public health at scale: vaccine outreach and claims",
      outcome: "10+ brand partnerships, 715 vaccinations, 4.57M impressions, 15K claims in 6 weeks.",
      category: "Public Sector",
    },
    {
      slug: "discovery",
      motif: "default" as const,
      client: "Discovery Communications",
      title: "Experience strategy across a global media portfolio",
      outcome: "Aligned experience architecture and operating models. Reduced effort, improved resolution.",
      category: "Experience Strategy",
    },
  ] as const,
};

export const contactCta = {
  headline: "Let's talk",
  subhead: "Journey redesign, experience strategy, operational transformation.",
  cta: "Get in touch",
  ctaHref: "/contact",
};
