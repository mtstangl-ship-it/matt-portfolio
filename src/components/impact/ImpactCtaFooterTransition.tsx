"use client";

import Link from "next/link";
import { impactPage } from "@/content/impact-page";
import { motion } from "framer-motion";

export function ImpactCtaFooterTransition() {
  const cta = impactPage.transformationModules.cta;

  return (
    <section className="relative overflow-hidden border-t-2 border-accent-signal/50 bg-dashboard-bg py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(34,211,199,0.16), transparent 58%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(13,148,136,0.08), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.04), transparent 40%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-signal/70 to-transparent"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-accent-signal/55 to-transparent"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.25, 0.6, 0.25] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-xl px-4 sm:px-6 text-center prose-optimal">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className=" text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-light/85"
        >
          Signal → System → Impact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mt-4  text-section font-bold text-dashboard-ink-light"
        >
          {cta.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-3  text-[0.9375rem] font-bold leading-[1.7] text-dashboard-ink-muted"
        >
          {cta.subhead}
        </motion.p>

        <Link
          href={cta.buttonHref}
          className="mt-6 inline-flex w-full max-w-xs items-center justify-center rounded-sm bg-accent-signal px-6 py-3.5  text-metric-sm font-bold uppercase text-white shadow-[0_2px_10px_-2px_rgba(13,148,136,0.45)] transition-all hover:bg-accent-light hover:shadow-[0_8px_28px_-6px_rgba(13,148,136,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal focus-visible:ring-offset-2 focus-visible:ring-offset-dashboard-bg sm:w-auto sm:px-10"
        >
          {cta.buttonLabel} →
        </Link>

        <div className="mt-6 flex justify-center">
          <div
            aria-hidden
            className="h-px w-full max-w-[18rem] bg-gradient-to-r from-transparent via-accent-signal/55 to-transparent"
          />
        </div>

        <p className="mt-5  text-[0.75rem] font-bold leading-[1.6] text-dashboard-ink-muted/90">
          Built for exec-ready reviews: concise, defensible, and instrumented.
        </p>
      </div>
    </section>
  );
}

