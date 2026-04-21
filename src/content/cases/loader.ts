import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Server-side loader for the extracted case-study HTML bodies.
 *
 * The five HTML files were ported from reference/Case Study.html via
 * scripts/port-cases.mjs. They sit next to this loader so the path
 * resolution is stable regardless of Next.js's build cwd, as long as we
 * use a path rooted at `process.cwd()`.
 *
 * `readFileSync` runs at module-load time in server components, which
 * Next will cache. Each page module imports the function, calls it for
 * its case, and passes the result into CaseShell's `body` prop.
 */
const DIR = join(process.cwd(), "src/content/cases");

export type CaseHtmlId = "ai" | "synth" | "autodesk" | "wipro" | "ey";

const cache = new Map<CaseHtmlId, string>();

export function loadCaseHtml(id: CaseHtmlId): string {
  const cached = cache.get(id);
  if (cached) return cached;
  const html = readFileSync(join(DIR, `${id}.html`), "utf8");
  cache.set(id, html);
  return html;
}
