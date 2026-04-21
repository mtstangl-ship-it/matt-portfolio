import type { CaseStudyEntry } from "@/content/case-studies";
import { loadCaseHtml } from "@/content/cases/loader";
import { CaseShell } from "../CaseShell";

export function AutodeskCase({ entry }: { entry: CaseStudyEntry }) {
  const body = loadCaseHtml("autodesk");
  return <CaseShell entry={entry} body={body} />;
}
