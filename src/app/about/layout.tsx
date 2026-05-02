import type { ReactNode } from "react";
import { AboutBodyClass } from "./AboutBodyClass";
import { AboutCrosshairObserver } from "./AboutCrosshairObserver";
import "./about-v3/index.css";

/** Request-time render so root layout reads `x-matt-pathname` (Chrome SSR = CSR for About v3). */
export const dynamic = "force-dynamic";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AboutBodyClass />
      <AboutCrosshairObserver />
      {children}
    </>
  );
}
