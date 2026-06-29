import type { CaseStudyEntry } from "@/content/case-studies";
import { CaseShell } from "../CaseShell";
import { SyntheticCaseView } from "./case-synthetic/SyntheticCaseView";

/** Tier A Synthetic Users case — canonical route `/case-studies/synthetic-users`. */
export function SyntheticCase({ entry }: { entry: CaseStudyEntry }) {
  return (
    <CaseShell entry={entry}>
      <SyntheticCaseView />
    </CaseShell>
  );
}
