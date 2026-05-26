import type { CaseStudyEntry } from "@/content/case-studies";
import { CaseShell } from "../CaseShell";
import { AutodeskCaseView } from "./case-autodesk/AutodeskCaseView";

export function AutodeskCase({ entry }: { entry: CaseStudyEntry }) {
  return (
    <CaseShell entry={entry}>
      <AutodeskCaseView />
    </CaseShell>
  );
}
