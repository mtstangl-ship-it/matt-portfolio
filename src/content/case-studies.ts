/**
 * Case Studies — canonical catalogue.
 *
 * Per the handoff brief, the site carries exactly five cases (in order):
 *   1. AI Workflow, 2. Synthetic Users, 3. Autodesk, 4. Wipro, 5. EY.
 *
 * Each case's long-form body + bespoke artifacts live in its own component
 * under `src/components/case-studies/cases/<slug>.tsx`. This file holds only
 * the metadata used by the index cards, the homepage teasers, and the
 * per-route hero.
 */

export const caseStudiesPage = {
  eyebrow: "Selected work",
  title: "Proof in flight.",
  subhead:
    "Five missions where strategy left the hangar. What shipped, what moved, and the trajectory each one actually traced.",
} as const;

export type CaseSlug = "ai" | "synthetic" | "autodesk" | "wipro" | "ey";

export type CaseStudyEntry = {
  slug: CaseSlug;
  /** Full hero headline as shown on /case-studies/[slug]. */
  title: string;
  /** Hero sub-line under the headline. */
  oneLine: string;
  /** Mono tag shown in the hero meta row, e.g. "SERVICE DESIGN · REVENUE". */
  tag: string;
  /** 1-based position. Used for "CASE 01 OF 05" meta. */
  caseNumber: number;

  // ------- Index + home tile metadata (existing schema) -------
  panelLabel: string;
  teaserLine: string;
  tools?: string;
  mode?: string;
  method?: string;
  output?: string;
  supportingMeta?: string;
  artifact?: string;
};

export const caseStudyEntries: CaseStudyEntry[] = [
  {
    slug: "ai",
    title: "I built this portfolio with AI, and kept the decisions human.",
    oneLine:
      "Six weeks. Four tools. One lesson I'll use for the rest of my career: AI raises the floor. Taste raises the ceiling.",
    tag: "AI WORKFLOW",
    caseNumber: 1,
    panelLabel: "AI WORKFLOW",
    teaserLine:
      "AI as a creative and system design partner for structure, iteration, and system refinement.",
    tools: "Cursor · Claude · Claude Design · Vercel",
    mode: "Centaur, human in the saddle",
    method: "Design a system, then use models for variation, critique, and scaffolding",
    output: "Coherent portfolio system, reusable build pipeline, and a review trace you can inspect",
    artifact:
      "Map the system first, then use models for variation and critique. Human owns narrative and architecture.",
  },
  {
    slug: "synthetic",
    title: "Synthetic users as a research method.",
    oneLine:
      "A structured way to pressure-test experience decisions before live traffic, as a complement to research, not a replacement.",
    tag: "SIMULATION · RESEARCH",
    caseNumber: 2,
    panelLabel: "SIMULATION · RESEARCH",
    teaserLine:
      "Stress-test journeys before live traffic with plausible scenarios, edge cases, and evidence-graded hypotheses.",
    supportingMeta: "COMPLEMENT: Research · Hypothesis · Pre-launch",
  },
  {
    slug: "autodesk",
    title: "I built Autodesk's global Service Design practice from zero.",
    oneLine:
      "A three-tier post-purchase model that turned customer success from a retention cost into a revenue motion. And the six-week negotiation that had to happen before anything could be designed.",
    tag: "SERVICE DESIGN · REVENUE TRANSFORMATION",
    caseNumber: 3,
    panelLabel: "SERVICE DESIGN · REVENUE",
    teaserLine: "A three-tier service model that turned post-purchase into a revenue motion.",
    tools: "Service Design · Journey Architecture · Blueprint",
    mode: "0→1 practice build · 12-month window",
    method: "Frame success as a revenue motion, then design the service model that delivers it",
    output: "Three-tier service practice, global blueprint, +$50M AOV in 12 months",
    supportingMeta: "SCOPE: Service model · Org alignment · Revenue",
  },
  {
    slug: "wipro",
    title: "Password lockouts were the symptom. Six towers were the disease.",
    oneLine:
      "A $12M service-desk leak diagnosed in six weeks, fixed by redesigning the handoff between six support towers. ITIL compliant. Behavioral at the core.",
    tag: "OPERATIONS · ITIL",
    caseNumber: 4,
    panelLabel: "OPERATIONS · ITIL",
    teaserLine:
      "Diagnosed a $12M leak; fixed the handoff between six support towers.",
    tools: "Service Design · ITIL · Case Flow",
    mode: "Diagnostic sprint · Operations reset",
    supportingMeta: "SCOPE: Service desk · Six towers · Handoff redesign",
  },
  {
    slug: "ey",
    title: "Vaccine hesitancy isn't a comms problem. It's a showing-up problem.",
    oneLine:
      "Say YES Summer: three cities, ten events, live art, music, and murals. And 715 vaccinations delivered where mass media couldn't land.",
    tag: "HEALTHCARE · COMMUNITY",
    caseNumber: 5,
    panelLabel: "HEALTHCARE · COMMUNITY",
    teaserLine:
      "Community-led field activation: 4.57M engagements and 715 vaccinations across Georgia.",
    tools: "Field Activation · Community Design · Public Health",
    mode: "Awareness + activation, one program design",
    supportingMeta: "SCOPE: Georgia DPH · Say YES Summer Tour",
  },
];
