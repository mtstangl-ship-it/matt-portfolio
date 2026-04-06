export const caseStudiesPage = {
  title: "Case Studies",
  subhead: "How I work, structure problems, and turn ideas into real systems.",
} as const;

export type CaseStudyEntry = {
  slug: string;
  title: string;
  oneLine: string;
  body: string[];
  /** Monospace category label (e.g. AI WORKFLOW) */
  panelLabel: string;
  /** Single-line panel copy for teasers and tiles */
  teaserLine: string;
  tools?: string;
  /** Homepage featured metadata row */
  mode?: string;
  /** Full index hero: method line */
  method?: string;
  /** Full index hero: output line */
  output?: string;
  /** Optional compact line for supporting tiles */
  supportingMeta?: string;
  /** Featured panel only: short artifact snippet */
  artifact?: string;
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
    panelLabel: "AI WORKFLOW",
    teaserLine:
      "AI as a creative and system design partner for structure, iteration, and system refinement.",
    tools: "GPT, Cursor, Vercel",
    mode: "Build / Critique / Refine",
    method: "Structure → iterate → refine with AI as an explicit design partner",
    output: "Coherent portfolio system, IA, and reusable build pipeline",
    artifact:
      "Map the system first, then use models for variation and critique — human owns narrative and architecture.",
  },
  {
    slug: "synthetic-users",
    title: "Synthetic Users",
    oneLine: "Simulating behavior to pressure-test experience decisions",
    body: [
      "Synthetic users help stress-test journeys before live traffic: plausible scenarios, edge cases, and language that surfaces where the experience breaks.",
      "Used as a complement to research—not a replacement—they sharpen hypotheses and reduce rework when the cost of change is still low.",
    ],
    panelLabel: "SIMULATION",
    teaserLine: "Stress-test journeys before live traffic with plausible scenarios and edge cases.",
    supportingMeta: "COMPLEMENT: Research · Hypothesis · Pre-launch",
  },
  {
    slug: "autodesk-planning-system",
    title: "Autodesk Planning System",
    oneLine: "Designing how customer planning actually works across the lifecycle",
    body: [
      "Enterprise planning spans tools, teams, and time horizons. The work focused on how planning behavior actually shows up in the journey—not just the UI, but the handoffs, incentives, and success definitions.",
      "Framing planning as a system made it possible to align product, success, and support around a shared model customers could adopt without fighting the org chart.",
    ],
    panelLabel: "SERVICE DESIGN",
    teaserLine: "Planning as a system: tools, teams, handoffs, and shared success definitions.",
    supportingMeta: "SCOPE: Enterprise lifecycle · CX alignment",
  },
];
