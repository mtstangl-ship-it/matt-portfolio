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
  headline: "Design and Transformation Impact",
  subhead: "Journey-led operating models and service design.",
  cta: "View full dashboard",
  ctaHref: "/work",
  companies: [
    {
      name: "Autodesk",
      headline: "Built a Net-New Service & CX Practice That Drove New Revenue",
      narrative:
        "Connected Design, Product, Support, and Engineering through journey architecture and experience design. Delivered post-purchase service innovation, new offering models, and a 3–5 year CX vision that shaped Sales and Success modernization.",
      kpis: [
        { value: "+27%", label: "RR in Q1 post launch of new offering model" },
        { value: "50M+", label: "YOY AOV driven through service design leadership" },
        { value: "0→1→2", label: "experience management community of practice" },
        { value: "106%", label: "NRR path achieved via customer relationship design" },
      ],
      capabilityTags: [
        "Service Design",
        "Customer Co Creation",
        "Research Leadership",
        "Prototype Builds",
      ],
    },
    {
      name: "Wipro",
      headline: "Led CX & EX Transformation Across Onboarding and Support Operations",
      narrative:
        "Led an EX transformation effort across onboarding and support operations, aligning leaders across product, IT, and operations through executive workshops, journey architecture, and system-level experience design. Identified and reduced friction across service workflows while improving operational performance and employee outcomes.",
      kpis: [
        { value: "31%", label: "MTTR reduction across support operations" },
        { value: "30+", label: "CX & EX outcomes delivered across onboarding and support" },
        { value: "13%+", label: "NPS improvement across EX" },
        { value: "16k", label: "annual reduction in lockout cases QoQ" },
      ],
      capabilityTags: [
        "CX Transformation",
        "Service Design",
        "Operational Alignment",
        "Executive Facilitation",
      ],
    },
    {
      name: "EY",
      headline: "Drove COVID-19 Vaccination Engagement Across the Southeast",
      narrative:
        "Led public health experience strategy for Georgia Department of Public Health and multi-state initiatives, designing engagement models that increased vaccine uptake across diverse populations. Aligned state agencies, healthcare providers, and partner organizations to reduce barriers to access, improve navigation into care, and translate outreach into real vaccinations. Delivered measurable outcomes across patient, provider, and system levels in high-pressure public health conditions.",
      kpis: [
        { value: "10+", label: "statewide healthcare & brand partnerships" },
        { value: "715", label: "vaccinations driven in targeted activation (Georgia DPH Say Yes Summer)" },
        { value: "4.57M", label: "public health engagements" },
        { value: "8-figure", label: "renewal driven by program performance" },
      ],
      capabilityTags: [
        "Public Health Strategy",
        "Healthcare Experience",
        "Patient Engagement",
        "Ecosystem Orchestration",
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
