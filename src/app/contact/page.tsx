import type { Metadata } from "next";
import { Eyebrow, PageHero, Section, SiteGrid } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a mission brief, share a problem worth solving, or send a note.",
};

const channels = [
  {
    label: "Email",
    value: "matt@matt-stangl.com",
    href: "mailto:matt@matt-stangl.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mattstangl",
    href: "https://www.linkedin.com/in/mattstangl",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-paper-50">
      <SiteGrid tone="light" opacity={0.3} />
      <PageHero
        eyebrow="Open channel"
        title="Start a mission brief."
        subtitle="Bring a splintered experience, a modernization mandate, or a thesis that needs a second read. I reply to everything that isn't a pitch deck."
        tone="light"
      />

      <Section className="relative py-section">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative block border border-ink-200/70 bg-paper-100 px-6 py-5 shadow-card transition-colors hover:border-accent/50 hover:bg-paper-50"
            >
              <Eyebrow tone="accent" className="tracking-[0.25em]">
                {c.label}
              </Eyebrow>
              <p className=" mt-3 text-card-title font-semibold text-ink-950">
                {c.value}
              </p>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
