"use client";

import { usePathname } from "next/navigation";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * About v3 is a full-bleed dark “drawing sheet” with its own pill nav.
 * Tier-A Centaur (`/case-studies/ai`) uses CaseShell + FicheNav — omit legacy editorial chrome.
 * Suppress the global chrome on those routes only.
 */
export function ConditionalSiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLegacyChrome =
    pathname === "/about" || pathname === "/case-studies/ai";

  if (hideLegacyChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
