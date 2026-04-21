import type { CaseStudyEntry } from "@/content/case-studies";
import { CaseShell } from "../CaseShell";

/**
 * Synthetic Users case study.
 * Phase A scaffold. Real body ports in Phase B.
 */
export function SyntheticCase({ entry }: { entry: CaseStudyEntry }) {
  return (
    <CaseShell entry={entry}>
      <div className="mono text-[var(--muted)]">
        PHASE A · SCAFFOLD · SYNTHETIC USERS CONTENT LANDS IN PHASE B
      </div>
    </CaseShell>
  );
}
