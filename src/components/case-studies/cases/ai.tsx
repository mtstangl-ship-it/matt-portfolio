import type { CaseStudyEntry } from "@/content/case-studies";
import { loadCaseHtml } from "@/content/cases/loader";
import { CaseShell } from "../CaseShell";

export function AiCase({ entry }: { entry: CaseStudyEntry }) {
  const body = loadCaseHtml("ai");
  return <CaseShell entry={entry} body={body} />;
}
