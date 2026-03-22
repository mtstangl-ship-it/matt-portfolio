export const hero = {
  tagline: "From fragmentation to flow",
  headline: "I lead CX, product, and service transformation.",
  subhead:
    "Journey architecture and service modernization that reduce effort, improve resolution, and turn fragmentation into flow.",
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
        { value: "50M+", label: "projected YOY AOV" },
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
      headline: "CX practice build and renewal",
      narrative:
        "Built the practice from the ground up. Six operating towers aligned. C-suite partnership on financial and experience outcomes.",
      kpis: [
        { value: "31%", label: "MTTR reduction, 2 years" },
        { value: "30+", label: "CX and EX outcomes" },
        { value: "15%+", label: "NPS improvement" },
        { value: "16k", label: "lockout cases reduced, annual" },
      ],
      capabilityTags: [
        "Practice Build",
        "Transformation",
        "Operating Towers",
        "Experience Outcomes",
      ],
    },
    {
      name: "EY",
      headline: "Experience strategy and eight-figure renewal",
      narrative:
        "Experience strategy for public health. Vaccine partnerships, vaccination outreach, and claims at scale.",
      kpis: [
        { value: "10+", label: "vaccine brand partners" },
        { value: "715", label: "Say Yes Summer vaccinations" },
        { value: "4.57M", label: "social reach" },
        { value: "8-figure", label: "renewal" },
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
  certImage: "/images/certifications/stanford-certificate.png",
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
      outcome: "+27% RR, 50M+ projected YOY AOV. First end-to-end post-purchase service launch.",
      category: "Service Design",
    },
    {
      slug: "wipro",
      motif: "converge" as const,
      client: "Wipro",
      title: "From zero to eight-figure renewal: building a CX practice",
      outcome: "31% MTTR reduction, 15%+ NPS. 16k lockout cases reduced, annual.",
      category: "Transformation",
    },
    {
      slug: "ey-georgia-dph",
      motif: "flow" as const,
      client: "EY / Georgia DPH",
      title: "Public health at scale: vaccine outreach and claims",
      outcome: "10+ brand partners, 715 vaccinations, 4.57M social reach. Eight-figure renewal.",
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
