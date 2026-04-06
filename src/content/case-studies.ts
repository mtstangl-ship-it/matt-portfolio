export const caseStudiesPage = {
  title: "Case Studies",
  subhead: "How I work, structure problems, and turn ideas into real systems.",
} as const;

export type CaseStudyEntry = {
  slug: string;
  title: string;
  oneLine: string;
  body: string[];
};

export const caseStudyEntries: CaseStudyEntry[] = [
  {
    slug: "ai-portfolio",
    title: "Using AI to Build This Portfolio",
    oneLine: "How I used AI as a creative and system design partner",
    body: [
      "This portfolio pairs AI with deliberate system design: structure first, then tooling, then craft. The goal was not automation for its own sake, but a partner that speeds iteration while keeping decisions legible.",
      "AI supports drafting, variation, and refinement; the narrative and IA remain intentionally human-led. The result is a site that explains impact, method, and range in one coherent arc.",
    ],
  },
  {
    slug: "synthetic-users",
    title: "Synthetic Users for Testing",
    oneLine: "Simulating behavior to pressure-test experience decisions",
    body: [
      "Synthetic users help stress-test journeys before live traffic: plausible scenarios, edge cases, and language that surfaces where the experience breaks.",
      "Used as a complement to research—not a replacement—they sharpen hypotheses and reduce rework when the cost of change is still low.",
    ],
  },
  {
    slug: "autodesk-planning-system",
    title: "Autodesk Planning System",
    oneLine: "Designing how customer planning actually works across the lifecycle",
    body: [
      "Enterprise planning spans tools, teams, and time horizons. The work focused on how planning behavior actually shows up in the journey—not just the UI, but the handoffs, incentives, and success definitions.",
      "Framing planning as a system made it possible to align product, success, and support around a shared model customers could adopt without fighting the org chart.",
    ],
  },
];
