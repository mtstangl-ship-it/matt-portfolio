import { join } from "path";

const ROOT = join(process.cwd(), "site-content/_artifacts/synthetic-users");

export const SYNTHETIC_USERS_ARTIFACT_PATHS = {
  qaReport: join(ROOT, "qa-report/index.html"),
  designCritique: join(ROOT, "design-critique/index.html"),
} as const;
