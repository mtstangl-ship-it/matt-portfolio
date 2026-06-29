import "@/styles/case-centaur/index.css";

/** Request-time render so root layout reads `x-matt-pathname` (Chrome SSR = CSR for Tier-A shell). */
export const dynamic = "force-dynamic";

export default function CaseAiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
