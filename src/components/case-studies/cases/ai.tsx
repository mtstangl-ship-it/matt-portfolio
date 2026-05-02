import type { CaseStudyEntry } from "@/content/case-studies";
import { CaseShell } from "../CaseShell";
import { CentaurCaseView } from "./case-centaur/CentaurCaseView";

export function AiCase({ entry }: { entry: CaseStudyEntry }) {
  return (
    <CaseShell entry={entry}>
      <CentaurCaseView />
    </CaseShell>
  );
}
