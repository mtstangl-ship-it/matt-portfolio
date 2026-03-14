import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { contactCta } from "@/content/home";

export function ContactCTA() {
  return (
    <Section className="border-t border-ink-200 py-section">
      <div className="mx-auto max-w-xl text-center prose-optimal">
        <h2 className="font-display text-section font-semibold tracking-tight text-ink-950">
          {contactCta.headline}
        </h2>
        <p className="font-body mt-8 text-body-lg text-ink-600 leading-[1.7]">
          {contactCta.subhead}
        </p>
        <Link
          href={contactCta.ctaHref}
          className="font-body mt-10 inline-block rounded-sm bg-accent px-10 py-4 text-metric-sm font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-accent-dark"
        >
          {contactCta.cta}
        </Link>
      </div>
    </Section>
  );
}
