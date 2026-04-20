"use client";

import { motion } from "framer-motion";
import { impactPage } from "@/content/impact-page";

export function MethodsToOutcomesSection() {
  return (
    <section className="relative border-b border-dashboard-border/90 bg-dashboard-bg py-section-sm">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(34 211 199) 1px, transparent 1px), linear-gradient(to bottom, rgb(34 211 199) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-signal/45 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-[48rem]">
          <h2 className=" text-section font-bold text-dashboard-ink-light">
            {impactPage.transformationModules.methodsHeadline}
          </h2>
          <p className="mt-3  text-subhead font-bold leading-[1.6] text-dashboard-ink-muted">
            {impactPage.transformationModules.methodsSubhead}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {impactPage.transformationModules.methods.map((m) => (
            <motion.article
              key={m.title}
              className="rounded-sm border border-dashboard-border/80 bg-dashboard-muted/55 p-5 shadow-[inset_0_1px_0_rgba(232,230,226,0.06)]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                boxShadow: "0 0 22px -8px rgba(34,211,199,0.35)",
                borderColor: "rgba(34,211,199,0.35)",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className=" text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-muted">
                Method
              </p>
              <h3 className="mt-3  text-[1.05rem] font-semibold leading-[1.2] text-dashboard-ink-light">
                {m.title}
              </h3>
              <p className="mt-2  text-[0.875rem] font-bold leading-[1.65] text-dashboard-ink-muted/95">
                {m.body}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 rounded-sm border border-dashboard-border/70 bg-dashboard-surface/20 p-5 sm:p-6">
          <p className=" text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-light/85">
            Journey architecture, operational proof, healthcare outcomes
          </p>
          <p className="mt-3  text-[0.9375rem] font-bold leading-[1.65] text-dashboard-ink-muted">
            The same operating pattern repeats: align constraints, instrument handoffs, then design the service loop that holds under
            pressure.
          </p>
        </div>
      </div>
    </section>
  );
}

