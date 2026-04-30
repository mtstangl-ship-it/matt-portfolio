"use client";

import { useEffect } from "react";

const CLS = "about-v3-active";

/** Applies dark-sheet body styles scoped via CSS to About only. */
export function AboutBodyClass() {
  useEffect(() => {
    document.body.classList.add(CLS);
    return () => document.body.classList.remove(CLS);
  }, []);
  return null;
}
