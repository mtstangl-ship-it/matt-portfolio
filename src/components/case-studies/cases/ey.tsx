import type { CaseStudyEntry } from "@/content/case-studies";
import { loadCaseHtml } from "@/content/cases/loader";
import { CaseShell } from "../CaseShell";

export function EyCase({ entry }: { entry: CaseStudyEntry }) {
  const body = loadCaseHtml("ey");
  return <CaseShell entry={entry} body={body} dataCase="ey" />;
}
