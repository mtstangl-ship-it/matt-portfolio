import Link from "next/link";
import type { CaseStudyEntry } from "@/content/case-studies";

const panelShell =
  "group relative flex h-full flex-col rounded-sm border border-dashboard-border/85 bg-dashboard-card text-left text-dashboard-ink-light shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-px hover:shadow-[0_0_32px_-10px_rgba(34,211,199,0.22),inset_0_1px_0_rgba(255,255,255,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-50";

const labelClass =
  "font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-accent-signal/90";

function MetaRow({ k, v }: { k: string; v: string }) {
  return (
    <p className="font-mono text-[0.6875rem] leading-snug text-dashboard-ink-muted">
      <span className="text-dashboard-ink-light/90">{k}: </span>
      {v}
    </p>
  );
}

export type CaseStudyPanelMode = "homeFeatured" | "homeSupporting" | "pageFeatured" | "pageSupporting";

export function CaseStudyIntelPanel({
  entry,
  mode,
}: {
  entry: CaseStudyEntry;
  mode: CaseStudyPanelMode;
}) {
  const href = `/case-studies/${entry.slug}`;
  const isFeatured = mode === "homeFeatured" || mode === "pageFeatured";
  const padding =
    mode === "homeFeatured"
      ? "p-6 sm:p-8"
      : mode === "pageFeatured"
        ? "p-6 sm:p-8 lg:p-9"
        : "p-5 sm:p-6";

  return (
    <Link href={href} className={`${panelShell} ${padding}`}>
      <span className={labelClass}>{entry.panelLabel}</span>
      <h3
        className={` font-bold tracking-[-0.02em] text-dashboard-ink-light [text-wrap:balance] ${
          isFeatured ? "mt-4 text-xl sm:text-2xl" : "mt-3 text-lg sm:text-xl"
        }`}
      >
        {entry.title}
      </h3>
      <p
        className={` font-semibold leading-relaxed text-dashboard-ink-muted ${
          isFeatured ? "mt-3 text-[0.9375rem] sm:max-w-3xl" : "mt-2.5 text-sm sm:text-[0.9375rem]"
        }`}
      >
        {entry.teaserLine}
      </p>

      {mode === "homeFeatured" && (entry.tools || entry.mode) && (
        <div className="mt-5 space-y-1 border-t border-white/[0.08] pt-5">
          {entry.tools ? <MetaRow k="TOOLS" v={entry.tools} /> : null}
          {entry.mode ? <MetaRow k="MODE" v={entry.mode} /> : null}
        </div>
      )}

      {mode === "pageFeatured" && (entry.tools || entry.method || entry.output) && (
        <div className="mt-6 space-y-1.5 border-t border-white/[0.08] pt-6">
          {entry.tools ? <MetaRow k="TOOLS" v={entry.tools} /> : null}
          {entry.method ? <MetaRow k="METHOD" v={entry.method} /> : null}
          {entry.output ? <MetaRow k="OUTPUT" v={entry.output} /> : null}
        </div>
      )}

      {(mode === "homeSupporting" || mode === "pageSupporting") && entry.supportingMeta && (
        <div className="mt-4 border-t border-white/[0.08] pt-4">
          <p className="font-mono text-[0.6875rem] leading-snug text-dashboard-ink-muted">{entry.supportingMeta}</p>
        </div>
      )}

      {mode === "homeFeatured" && entry.artifact && (
        <div className="mt-5 rounded-sm border border-accent-signal/25 bg-dashboard-muted/90 px-4 py-3">
          <p className="font-mono text-[0.6875rem] leading-relaxed text-dashboard-ink-muted">
            <span className="select-none text-accent-signal/80">› </span>
            {entry.artifact}
          </p>
        </div>
      )}

      {mode === "pageFeatured" && entry.artifact && (
        <div className="mt-6 rounded-sm border border-accent-signal/25 bg-dashboard-muted/90 px-4 py-3.5 sm:px-5">
          <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-accent-signal/85">
            Artifact
          </p>
          <p className="font-mono mt-2 text-[0.75rem] leading-relaxed text-dashboard-ink-muted">
            {entry.artifact}
          </p>
        </div>
      )}

      <span className="mt-5 inline-flex items-center font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent-signal/75 transition-colors group-hover:text-accent-signal">
        Open study →
      </span>
    </Link>
  );
}
