import { cn } from "@/lib/utils";

/**
 * Shared “instrument panel” language between the home Transformation Impact
 * band and the Impact /mission console: same top accent, grid scales, canvas
 * panel chrome, and hairline so the two surfaces read as one system.
 */

export const DASHBOARD_SESSION_TOP_RULE =
  "border-t-2 border-accent-signal/50";

export const DASHBOARD_CANVAS_PANEL =
  "rounded-lg border border-dashboard-border/70 bg-dashboard-surface/40 shadow-card";

/** Fine graph paper (matches viz bands inside company cards). */
export function DashboardFineGridOverlay({
  className,
  opacity = 0.12,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        opacity,
        backgroundImage: `
            linear-gradient(to right, rgb(34 211 199) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(34 211 199) 1px, transparent 1px)
          `,
        backgroundSize: "14px 14px",
      }}
      aria-hidden
    />
  );
}

/** Section-scale grid (home hero band behind cards). */
export function DashboardCoarseGridOverlay({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `
            linear-gradient(to right, rgb(34 211 199) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(34 211 199) 1px, transparent 1px)
          `,
        backgroundSize: "24px 24px",
      }}
      aria-hidden
    />
  );
}

export function DashboardRadialWash({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        opacity: 0.5,
        background:
          "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(34,211,199,0.12), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(34,211,199,0.04), transparent 50%)",
      }}
      aria-hidden
    />
  );
}

export function DashboardTopHairline({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent-signal/70 to-transparent",
        className
      )}
      aria-hidden
    />
  );
}

/** Soft constellation specks (home section only; optional on Impact). */
export function DashboardStarfieldSpecks({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 opacity-[0.06]", className)}
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(34,211,199,0.25), transparent 45%), radial-gradient(circle at 70% 10%, rgba(34,211,199,0.18), transparent 50%), radial-gradient(circle at 60% 70%, rgba(34,211,199,0.12), transparent 55%)",
      }}
      aria-hidden
    />
  );
}

/** Tab / mode rail chrome shared with Impact console header. */
export const DASHBOARD_MODE_RAIL =
  "relative overflow-hidden rounded-sm p-1.5 shadow-[inset_0_0_0_1px_rgba(232,230,226,0.08)]";
export const DASHBOARD_MODE_RAIL_SURFACE = "bg-[rgba(14,13,12,0.4)]";
