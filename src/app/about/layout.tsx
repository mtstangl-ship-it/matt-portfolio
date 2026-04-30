import type { ReactNode } from "react";
import { AboutBodyClass } from "./AboutBodyClass";
import { AboutCrosshairObserver } from "./AboutCrosshairObserver";
import "./about-v3/index.css";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AboutBodyClass />
      <AboutCrosshairObserver />
      {children}
    </>
  );
}
