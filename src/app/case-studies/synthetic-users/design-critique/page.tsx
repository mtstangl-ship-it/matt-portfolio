import type { Metadata } from "next";
import { SyntheticUsersArtifactShell } from "@/components/case-studies/SyntheticUsersArtifactShell";

export const metadata: Metadata = {
  title: "Figure 04-B · Design Critique",
  robots: { index: false, follow: false },
};

export default function SyntheticUsersDesignCritiquePage() {
  return (
    <SyntheticUsersArtifactShell
      figureStamp="FIG. 04-B · DESIGN CRITIQUE"
      metaLine="1 persona · full site · 8 sections"
      embedSrc="/case-studies/synthetic-users/design-critique/embed"
    />
  );
}
