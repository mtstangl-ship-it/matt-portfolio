import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { contactCta } from "@/content/home";

export function ContactCTA() {
  return (
    <Section className="relative overflow-hidden border-t border-ink-200/50 bg-support-100 py-section">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(34,211,199,0.18), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.03), rgba(0,0,0,0) 45%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-xl px-2 text-center prose-optimal sm:px-0">
        <h2 className="font-display text-section font-bold text-ink-950">
          {contactCta.headline}
        </h2>
        <p className="font-body mt-4 text-body-lg font-bold leading-[1.5] text-ink-900">
          {contactCta.subhead}
        </p>
        <Link
          href={contactCta.ctaHref}
          className="font-body mt-6 inline-flex w-full max-w-xs items-center justify-center rounded-sm bg-accent px-8 py-3.5 text-metric-sm font-bold uppercase text-white transition-colors hover:bg-accent-dark sm:inline-block sm:w-auto sm:max-w-none sm:px-10 sm:py-4"
        >
          {contactCta.cta}
        </Link>
      </div>
    </Section>
  );
}
