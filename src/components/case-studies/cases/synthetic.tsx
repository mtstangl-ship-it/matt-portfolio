import type { CaseStudyEntry } from "@/content/case-studies";
import { loadCaseHtml } from "@/content/cases/loader";
import { CaseShell } from "../CaseShell";

/**
 * Synthetic Users case.
 * Route slug is `synthetic`, reference HTML uses `data-case="synth"`.
 * Passing the reference's ID preserves any future CSS rules the ported
 * stylesheet may scope to `synth`; the route-level accent vars in
 * globals.css are keyed on `synthetic` separately.
 */
export function SyntheticCase({ entry }: { entry: CaseStudyEntry }) {
  const body = loadCaseHtml("synth");
  return <CaseShell entry={entry} body={body} />;
}
