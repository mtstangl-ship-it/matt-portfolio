import type { CaseStudyEntry } from "@/content/case-studies";
import { CaseShell } from "../CaseShell";

/**
 * Autodesk Service Design Practice case study.
 * Phase A scaffold. Three-tier blueprint + negotiation arc port in Phase B.
 */
export function AutodeskCase({ entry }: { entry: CaseStudyEntry }) {
  return (
    <CaseShell entry={entry}>
      <div className="mono text-[var(--muted)]">
        PHASE A · SCAFFOLD · AUTODESK CONTENT LANDS IN PHASE B
      </div>
    </CaseShell>
  );
}
