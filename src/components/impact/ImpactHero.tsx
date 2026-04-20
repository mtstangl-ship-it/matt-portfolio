"use client";

import { motion, useReducedMotion } from "framer-motion";
import { impactPage } from "@/content/impact-page";

export function ImpactHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-dashboard-border/90 bg-dashboard-bg pt-section-sm pb-section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(900px 420px at 10% -10%, rgba(34,211,199,0.14), transparent 55%), radial-gradient(700px 320px at 95% 10%, rgba(34,211,199,0.08), transparent 55%), radial-gradient(600px 260px at 50% 120%, rgba(13,148,136,0.06), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-signal/70 to-transparent"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[30%] h-[1px] bg-gradient-to-r from-transparent via-accent-signal/35 to-transparent"
        initial={false}
        animate={reducedMotion ? { x: 0, opacity: 0.35 } : { x: ["-12%", "12%", "-12%"], opacity: [0.2, 0.55, 0.2] }}
        transition={reducedMotion ? { duration: 0 } : { duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(34,211,199,0.35) 1px, transparent 1px), radial-gradient(circle at 80% 35%, rgba(34,211,199,0.25) 1px, transparent 1px), radial-gradient(circle at 62% 78%, rgba(34,211,199,0.25) 1px, transparent 1px)",
          backgroundSize: "140px 140px, 180px 180px, 210px 210px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[40rem]">
            <p className="font-body text-[0.625rem] font-medium uppercase tracking-[0.14em] text-dashboard-ink-light/85">
              Signal → System → Impact
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-4 font-display text-hero-tight font-semibold leading-[1.02] tracking-[-0.03em] text-dashboard-ink-light"
            >
              {impactPage.hero.headline}
            </motion.h1>
            <p className="mt-4 max-w-[42rem] font-body text-[0.9375rem] font-bold leading-[1.6] text-dashboard-ink-muted">
              {impactPage.hero.subhead}
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:w-[20rem]">
            <div className="rounded-sm border border-dashboard-border/70 bg-dashboard-muted/55 p-4 shadow-[inset_0_1px_0_rgba(232,230,226,0.06)]">
              <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-light/80">
                Executive proof layer
              </p>
              <p className="mt-2 font-body text-[0.8125rem] font-bold leading-[1.55] text-dashboard-ink-muted">
                Instrumented outcomes from three transformations, designed to be shown, not just explained.
              </p>
            </div>

            <motion.div
              aria-hidden
              className="relative h-[3px] w-full overflow-hidden rounded-sm bg-dashboard-border/70"
              initial={false}
              animate={
                reducedMotion
                  ? { opacity: 1 }
                  : { opacity: [0.7, 1, 0.7], boxShadow: ["none", "0 0 18px rgba(34,211,199,0.22)", "none"] }
              }
              transition={reducedMotion ? { duration: 0 } : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-signal/70 to-transparent"
                style={{ transform: "translateX(-40%)", animation: "ticker 6s linear infinite" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

