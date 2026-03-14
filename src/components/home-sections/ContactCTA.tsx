import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { contactCta } from "@/content/home";

export function ContactCTA() {
  return (
    <Section className="border-t-2 border-accent/30 bg-gradient-to-b from-accent-muted/40 to-ink-100 py-section">
      <div className="mx-auto max-w-xl text-center prose-optimal">
        <h2 className="font-display text-section font-bold text-ink-950">
          {contactCta.headline}
        </h2>
        <p className="font-body mt-4 text-body-lg font-bold text-ink-900 leading-[1.5]">
          {contactCta.subhead}
        </p>
        <Link
          href={contactCta.ctaHref}
          className="font-body mt-6 inline-block rounded-sm bg-accent px-10 py-4 text-metric-sm font-bold uppercase text-white transition-colors hover:bg-accent-dark"
        >
          {contactCta.cta}
        </Link>
      </div>
    </Section>
  );
}
