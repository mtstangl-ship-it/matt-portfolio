"use client";

import dynamic from "next/dynamic";

/** Static shell while the heavy canvas chunk loads (~2.6k points + rAF). Matches hero band sizing. */
function HeroCanvasPlaceholder() {
  return (
    <div className="pointer-events-none relative z-0 flex h-full min-w-0 max-w-full flex-1 items-center justify-center self-stretch overflow-hidden">
      <div className="absolute inset-0 bg-dashboard-bg" aria-hidden />
      <div
        className="absolute inset-0 opacity-95"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 35%, rgba(34,211,199,0.14), transparent 58%), radial-gradient(ellipse 60% 50% at 70% 80%, rgba(13,148,136,0.06), transparent 55%), linear-gradient(180deg, rgba(15,14,13,0.95) 0%, rgba(10,9,8,1) 100%)",
        }}
      />
    </div>
  );
}

const HeroAtmosphereBackground = dynamic(
  () =>
    import("./HeroAtmosphereBackground").then((m) => ({
      default: m.HeroAtmosphereBackground,
    })),
  {
    ssr: false,
    loading: () => <HeroCanvasPlaceholder />,
  }
);

export function HeroCanvasLazy() {
  return <HeroAtmosphereBackground />;
}
