type GridTone = "dark" | "light";

/**
 * SiteGrid, the foundational technical-grid overlay shared across every page.
 *
 * One rule: the same 10px vertical / 12px horizontal rhythm, just retoned for
 * light vs dark surfaces. It sits behind page content and below any richer
 * background layers (galaxy, dashboards, canvases) so every page reads as
 * being drawn on the same underlying graph paper.
 *
 * Usage:
 *   <div className="relative ...">
 *     <SiteGrid tone="dark" />
 *     ...page content...
 *   </div>
 */
const gridStyle: Record<GridTone, { backgroundImage: string; opacity: number }> = {
  dark: {
    backgroundImage:
      "repeating-linear-gradient(0deg, rgba(232,230,226,0.06) 0px, rgba(232,230,226,0.06) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(90deg, rgba(232,230,226,0.04) 0px, rgba(232,230,226,0.04) 1px, transparent 1px, transparent 12px)",
    opacity: 1,
  },
  light: {
    backgroundImage:
      "repeating-linear-gradient(0deg, rgba(26,24,22,0.055) 0px, rgba(26,24,22,0.055) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(90deg, rgba(26,24,22,0.04) 0px, rgba(26,24,22,0.04) 1px, transparent 1px, transparent 12px)",
    opacity: 1,
  },
};

export function SiteGrid({
  tone = "dark",
  opacity,
  className = "",
}: {
  tone?: GridTone;
  /** Override the default tone opacity (0 to 1). */
  opacity?: number;
  className?: string;
}) {
  const base = gridStyle[tone];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`.trim()}
      style={{
        backgroundImage: base.backgroundImage,
        opacity: opacity ?? base.opacity,
      }}
    />
  );
}
