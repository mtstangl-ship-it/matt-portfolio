import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { contactCta } from "@/content/home";

export function ContactCTA() {
  return (
    <Section className="relative overflow-hidden border-t border-ink-200/55 bg-support-50 py-section">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(34,211,199,0.12), transparent 55%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(13,148,136,0.05), transparent 50%), linear-gradient(to bottom, rgba(0,0,0,0.015), transparent 40%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-xl text-center prose-optimal">
        <h2 className=" text-section font-bold text-ink-950">
          {contactCta.headline}
        </h2>
        <p className=" mt-3 text-[0.9375rem] font-bold leading-[1.55] text-ink-900 sm:mt-4 sm:text-body-lg">
          {contactCta.subhead}
        </p>
        <Link
          href={contactCta.ctaHref}
          className=" mt-5 inline-flex w-full max-w-xs items-center justify-center rounded-sm bg-accent px-6 py-3.5 text-metric-sm font-bold uppercase text-white shadow-[0_2px_8px_-2px_rgba(13,148,136,0.4)] transition-all hover:bg-accent-dark hover:shadow-[0_4px_12px_-2px_rgba(13,148,136,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:mt-6 sm:inline-block sm:w-auto sm:max-w-none sm:px-10 sm:py-4"
        >
          {contactCta.cta}
        </Link>
      </div>
    </Section>
  );
}
