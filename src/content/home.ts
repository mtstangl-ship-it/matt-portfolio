export const hero = {
  /**
   * Mono kicker above the headline. Per brief #1, this surfaces role +
   * seniority so the hero answers "what is this person" in a single line.
   */
  tagline: "Product & Service Design Leader · IC to director-level, enterprise transformation",
  headline: "I rebuild fragmented enterprise experience into one operating model that ships.",
  subhead:
    "For enterprises where the journey has splintered across teams, channels, and systems.",
  /**
   * Availability + contact row under the subhead. Brief #6 + #9 require a
   * visible LinkedIn and "Get in touch" surface in or immediately below the
   * hero (footer-only was the prior bug).
   */
  availability: "Available for senior design leadership roles, especially in healthcare.",
  contactLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mattstangl",
      external: true,
    },
    {
      label: "Get in touch",
      href: "/contact",
      external: false,
    },
  ] as const,
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

export const problemLedger = {
  solved: {
    eyebrow: "PROBLEMS SOLVED",
    items: [
      "Turned Autodesk's post-purchase support into a $50M revenue motion",
      "Unified Wipro's six ITIL towers into one operating model for Estée Lauder",
      "De-politicized vaccination engagement across Georgia — CDC national best practice",
      "Cut MTTR by 31% — 13K annual lockouts eliminated",
      "Built a global CX practice from zero at an enterprise consultancy",
      "Made synthetic users a research method with documented QA pipeline",
    ],
  },
  intent: {
    eyebrow: "PROBLEMS I WANT TO SOLVE",
    items: [
      "Scaling healthcare access for populations the system was never built to serve",
      "Friction between patients, providers, and insurers that nobody owns by design",
      "Stigmatized care treated as a clinical experience, not a moral one",
      "Experience design as an operating model, not a team",
      "Service tiers designed around what customers actually value, not what we can charge for",
      "AI strategy that raises the ceiling of what teams can do, not just the floor",
    ],
  },
  dimensionLabel: "TRACK RECORD → INTENT",
};

export const transformationDashboard = {
  headline: "Three transformations. In numbers.",
  subhead: "Autodesk · Wipro · EY — what shipped, what moved.",
  cta: "View impact",
  ctaHref: "/impact",
  companies: [
    {
      name: "Autodesk",
      headline: "Built a Net-New Service & CX Practice That Drove New Revenue",
      narrative:
        "Connected Design, Product, Support, and Engineering through journey architecture and experience design. Delivered post-purchase service innovation, new offering models, and a 3–5 year CX vision that shaped Sales and Success modernization.",
      kpis: [
        { value: "+27%", label: "RR in Q1 post launch of new offering model" },
        { value: "$50M+", label: "incremental AOV · 12-mo post-launch window · prior-year AOV flat" },
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
        { value: "24+", label: "statewide healthcare & brand partnerships" },
        { value: "4.57M → 715", label: "engagements (awareness layer) to vaccinations (activation layer) — two stages, one program. The gap is the design, not a conversion failure." },
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

export const caseStudiesHomeSection = {
  headline: "Case Studies",
  subhead: "How I turn ideas into systems, and systems into results.",
  cta: "View all",
  ctaHref: "/case-studies",
} as const;

export const contactCta = {
  headline: "Let's talk.",
  subhead: "Senior design leadership roles. Journey redesign. Experience strategy. Operational transformation. Healthcare preferred.",
  cta: "Get in touch",
  ctaHref: "/contact",
};
