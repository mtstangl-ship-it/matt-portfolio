import type { CaseStudyEntry } from "@/content/case-studies";
import { CaseShell } from "../CaseShell";
import { EyCaseView } from "./case-ey/EyCaseView";

export function EyCase({ entry }: { entry: CaseStudyEntry }) {
  return (
    <CaseShell entry={entry}>
      <EyCaseView />
    </CaseShell>
  );
}
