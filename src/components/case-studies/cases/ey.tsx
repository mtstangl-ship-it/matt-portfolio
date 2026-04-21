import type { CaseStudyEntry } from "@/content/case-studies";
import { CaseShell } from "../CaseShell";

/**
 * EY / Say YES Summer case study.
 * Phase A scaffold. Tour map, four failure-column hypotheses, stops + metrics port in Phase B.
 */
export function EyCase({ entry }: { entry: CaseStudyEntry }) {
  return (
    <CaseShell entry={entry}>
      <div className="mono text-[var(--muted)]">
        PHASE A · SCAFFOLD · EY CONTENT LANDS IN PHASE B
      </div>
    </CaseShell>
  );
}
