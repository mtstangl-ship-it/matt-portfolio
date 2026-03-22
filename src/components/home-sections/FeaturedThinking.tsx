import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { WorkflowIcon, TransformationIcon, AutomationIcon } from "@/components/icons";
import { SignalMapMotif } from "@/components/visuals";
import { featuredThinking } from "@/content/home";

const topicIcons = { workflow: WorkflowIcon, transformation: TransformationIcon, automation: AutomationIcon };

export function FeaturedThinking() {
  return (
    <Section className="relative overflow-hidden border-t border-ink-200/55 bg-support-50 py-section">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 15% 15%, rgba(34,211,199,0.1), transparent 50%), radial-gradient(ellipse 55% 45% at 88% 70%, rgba(13,148,136,0.06), transparent 52%), linear-gradient(to bottom, rgba(0,0,0,0.01), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(13 148 136) 1px, transparent 1px), linear-gradient(to bottom, rgb(13 148 136) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute right-0 top-24 hidden h-56 w-56 opacity-[0.1] lg:block">
        <SignalMapMotif />
      </div>
      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div className="min-w-0 max-w-lg">
          <h2 className="font-display text-section font-bold text-ink-950">
            {featuredThinking.headline}
          </h2>
          <p className="font-body mt-2 text-subhead font-semibold text-ink-700 max-w-md">
            {featuredThinking.subhead}
          </p>
        </div>
        <Link
          href={featuredThinking.ctaHref}
          className="font-body shrink-0 text-metric-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
        >
          {featuredThinking.cta} →
        </Link>
      </div>
      <div className="relative z-10 mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {featuredThinking.items.map((item, i) => (
          <Link
            key={i}
            href={featuredThinking.ctaHref}
            className="group/card relative animate-fade-up block overflow-hidden rounded-lg border border-ink-200/55 bg-paper-50 p-5 shadow-card-elevated transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-card-hover motion-reduce:animate-none sm:p-6"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="absolute left-5 top-5 bottom-5 w-0.5 rounded-full bg-accent/60 opacity-80 transition-opacity duration-200 group-hover/card:opacity-100" />
            {"topicIcon" in item && (
              <div className="mb-4 pl-3 text-accent/60 transition-colors duration-200 group-hover/card:text-accent/80">
                {(() => {
                  const Icon = topicIcons[item.topicIcon as keyof typeof topicIcons];
                  return Icon ? <Icon className="h-6 w-6" /> : null;
                })()}
              </div>
            )}
            <blockquote className="font-display text-[0.9375rem] font-bold italic leading-[1.5] text-ink-950 pl-3 sm:text-quote sm:leading-[1.45] [text-wrap:balance]">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <footer className="mt-5 flex flex-col gap-2 pl-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="font-body text-eyebrow font-semibold uppercase tracking-wider text-accent/80">
                {item.topic}
              </span>
              <span className="font-mono text-metric-sm tabular-nums text-ink-500">
                {item.date}
              </span>
            </footer>
          </Link>
        ))}
      </div>
    </Section>
  );
}
