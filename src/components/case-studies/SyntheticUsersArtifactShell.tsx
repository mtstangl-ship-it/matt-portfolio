import Link from "next/link";

type Props = {
  figureStamp: string;
  metaLine: string;
  embedSrc: string;
};

/**
 * Thin fiche-style chrome above embedded HTML artifacts.
 * Iframe loads unmodified index.html so inline scripts (e.g. QA showTab) keep working.
 */
export function SyntheticUsersArtifactShell({
  figureStamp,
  metaLine,
  embedSrc,
}: Props) {
  return (
    <div className="flex min-h-[calc(100dvh-8rem)] flex-col bg-[#0a0f0e] text-[#e8f0ed]">
      <header
        className="flex shrink-0 items-center justify-between gap-4 border-b border-[oklch(0.32_0.02_190_/_0.55)] px-4 py-3 sm:px-6"
        style={{ fontFamily: "var(--font-jetbrains), ui-monospace, monospace" }}
      >
        <Link
          href="/case-studies/synthetic-users"
          className="text-[11px] font-medium uppercase tracking-[0.12em] text-[oklch(0.78_0.11_190)] transition hover:text-[oklch(0.88_0.12_190)]"
        >
          ← BACK TO CASE STUDY
        </Link>
        <span className="hidden text-center text-[10px] font-medium uppercase tracking-[0.14em] text-[oklch(0.82_0.01_200)] sm:block sm:flex-1">
          {figureStamp}
        </span>
        <span className="max-w-[42%] text-right text-[10px] leading-snug text-[oklch(0.62_0.02_200)] sm:max-w-none">
          {metaLine}
        </span>
      </header>
      <p className="border-b border-[oklch(0.32_0.02_190_/_0.35)] px-4 py-2 text-center text-[10px] uppercase tracking-[0.12em] text-[oklch(0.72_0.01_200)] sm:hidden">
        {figureStamp}
      </p>
      <iframe
        title={figureStamp}
        src={embedSrc}
        className="min-h-0 w-full flex-1 border-0 bg-[#0a0f0e]"
        style={{ minHeight: "min(85dvh, 900px)" }}
      />
    </div>
  );
}
