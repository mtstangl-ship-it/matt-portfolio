import type { ReactNode } from "react";

/** Request-time render so root layout reads `x-matt-pathname` (Chrome SSR = CSR for Tier-A Home). */
export const dynamic = "force-dynamic";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return children;
}
