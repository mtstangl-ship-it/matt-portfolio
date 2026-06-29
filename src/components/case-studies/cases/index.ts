import type { ComponentType } from "react";
import type { CaseSlug, CaseStudyEntry } from "@/content/case-studies";
import { AiCase } from "./ai";
import { SyntheticCase } from "./synthetic";
import { AutodeskCase } from "./autodesk";
import { WiproCase } from "./wipro";
import { EyCase } from "./ey";

export type CaseComponent = ComponentType<{ entry: CaseStudyEntry }>;

/**
 * Slug → case component registry. The /case-studies/[slug] route uses this
 * to dispatch to the right bespoke layout. Adding a new case = register it
 * here and add its metadata to `src/content/case-studies.ts`.
 */
export const caseComponents: Record<CaseSlug, CaseComponent> = {
  ai: AiCase,
  synthetic: SyntheticCase,
  autodesk: AutodeskCase,
  wipro: WiproCase,
  ey: EyCase,
};

export { AiCase, SyntheticCase, AutodeskCase, WiproCase, EyCase };
