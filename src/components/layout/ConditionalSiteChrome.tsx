import { headers } from "next/headers";
import { ConditionalSiteChromeClient } from "./ConditionalSiteChromeClient";

export function ConditionalSiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = headers().get("x-matt-pathname") ?? "";
  return <ConditionalSiteChromeClient serverPathname={pathname}>{children}</ConditionalSiteChromeClient>;
}
