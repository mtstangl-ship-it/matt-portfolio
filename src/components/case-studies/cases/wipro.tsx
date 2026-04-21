import type { CaseStudyEntry } from "@/content/case-studies";
import { CaseShell } from "../CaseShell";

/**
 * Wipro Service Desk case study.
 * Phase A scaffold. Leak/cost/fix grid + case-flow diagram port in Phase B.
 */
export function WiproCase({ entry }: { entry: CaseStudyEntry }) {
  return (
    <CaseShell entry={entry}>
      <div className="mono text-[var(--muted)]">
        PHASE A · SCAFFOLD · WIPRO CONTENT LANDS IN PHASE B
      </div>
    </CaseShell>
  );
}
