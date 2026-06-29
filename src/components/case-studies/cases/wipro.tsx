import type { CaseStudyEntry } from "@/content/case-studies";
import { CaseShell } from "../CaseShell";
import { WiproCaseView } from "./case-wipro/WiproCaseView";

export function WiproCase({ entry }: { entry: CaseStudyEntry }) {
  return (
    <CaseShell entry={entry}>
      <WiproCaseView />
    </CaseShell>
  );
}
