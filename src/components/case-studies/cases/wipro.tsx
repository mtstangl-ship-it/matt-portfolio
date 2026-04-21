import type { CaseStudyEntry } from "@/content/case-studies";
import { loadCaseHtml } from "@/content/cases/loader";
import { CaseShell } from "../CaseShell";

export function WiproCase({ entry }: { entry: CaseStudyEntry }) {
  const body = loadCaseHtml("wipro");
  return <CaseShell entry={entry} body={body} dataCase="wipro" />;
}
