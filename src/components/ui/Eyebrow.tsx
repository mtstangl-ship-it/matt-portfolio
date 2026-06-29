import type { ElementType, ReactNode } from "react";

type EyebrowTone = "accent" | "signal" | "muted";

const toneClass: Record<EyebrowTone, string> = {
  // Light surfaces, teal accent on paper.
  accent: "text-accent/90",
  // Dark surfaces, signal teal on dashboard ink.
  signal: "text-accent-signal",
  // Quiet variant for meta rows and secondary labels.
  muted: "text-dashboard-ink-muted/75",
};

/**
 * Eyebrow, the one mono label primitive.
 *
 * Every page-level kicker, section tag, and meta row routes through this
 * component so the site has a single, consistent uppercase/mono rhythm.
 * Sizing comes from the `text-eyebrow` token (0.5rem + 0.25em tracking).
 */
export function Eyebrow({
  children,
  tone = "accent",
  as: Component = "p",
  className = "",
}: {
  children: ReactNode;
  tone?: EyebrowTone;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Component
      className={`font-mono text-eyebrow font-semibold uppercase ${toneClass[tone]} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
