import type { CaseStudyEntry } from "@/content/case-studies";
import { CaseShell } from "../CaseShell";

/**
 * AI Workflow case study.
 *
 * Phase A: scaffold only. The bespoke sections from reference/Case Study.html
 * (framing, the six workflows, the handoff map, the review trace, the lessons
 * table, the closer) land here in Phase B.
 */
export function AiCase({ entry }: { entry: CaseStudyEntry }) {
  return (
    <CaseShell entry={entry}>
      <div className="mono text-[var(--muted)]">
        PHASE A · SCAFFOLD · AI WORKFLOW CONTENT LANDS IN PHASE B
      </div>
    </CaseShell>
  );
}
