import type { Metadata } from "next";
import { SyntheticUsersArtifactShell } from "@/components/case-studies/SyntheticUsersArtifactShell";

export const metadata: Metadata = {
  title: "Figure 04-A · QA Report",
  robots: { index: false, follow: false },
};

export default function SyntheticUsersQaReportPage() {
  return (
    <SyntheticUsersArtifactShell
      figureStamp="FIG. 04-A · QA REPORT"
      metaLine="5 personas · 4 environments · 18 surfaced"
      embedSrc="/case-studies/synthetic-users/qa-report/embed"
    />
  );
}
