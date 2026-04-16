/**
 * GalaxyBackground — fixed, viewport-wide deep-space field.
 *
 * Mounted once at the root of the About page. Renders:
 * - Layered nebula gradient (very subtle teal / indigo)
 * - 64 twinkling stars at deterministic positions (no SSR mismatch)
 * - 4 shooting stars on staggered infinite loops
 * - A drifting dust layer
 *
 * All animations honor prefers-reduced-motion.
 */

const KEYFRAMES = `
@keyframes galaxy-twinkle {
  0%, 100% { opacity: var(--g-min, 0.18); }
  50% { opacity: var(--g-max, 0.85); }
}
@keyframes galaxy-shoot-a {
  0% { transform: translate3d(-12vw, 18vh, 0) rotate(20deg); opacity: 0; }
  2% { opacity: 1; }
  9% { opacity: 1; }
  12% { transform: translate3d(112vw, 48vh, 0) rotate(20deg); opacity: 0; }
  100% { transform: translate3d(-12vw, 18vh, 0) rotate(20deg); opacity: 0; }
}
@keyframes galaxy-shoot-b {
  0% { transform: translate3d(115vw, 10vh, 0) rotate(160deg); opacity: 0; }
  3% { opacity: 1; }
  10% { opacity: 1; }
  13% { transform: translate3d(-15vw, 54vh, 0) rotate(160deg); opacity: 0; }
  100% { transform: translate3d(115vw, 10vh, 0) rotate(160deg); opacity: 0; }
}
@keyframes galaxy-shoot-c {
  0% { transform: translate3d(-10vw, 72vh, 0) rotate(-12deg); opacity: 0; }
  3% { opacity: 1; }
  11% { opacity: 1; }
  14% { transform: translate3d(112vw, 84vh, 0) rotate(-12deg); opacity: 0; }
  100% { transform: translate3d(-10vw, 72vh, 0) rotate(-12deg); opacity: 0; }
}
@keyframes galaxy-drift-a {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(20px, -14px, 0); }
}
@keyframes galaxy-drift-b {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(-16px, 22px, 0); }
}
@keyframes galaxy-pulse {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.55; }
}
@media (prefers-reduced-motion: reduce) {
  .galaxy-bg *, .galaxy-bg { animation: none !important; }
}
`;

/** Deterministic star field — tuned for even spatial distribution. */
const GALAXY_STARS: Array<{
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkle: number;
  delay: number;
}> = Array.from({ length: 70 }).map((_, i) => {
  const h1 = (i * 2654435761) >>> 0;
  const h2 = ((i + 11) * 40503) >>> 0;
  const h3 = ((i + 7) * 75731) >>> 0;
  const h4 = ((i + 3) * 131071) >>> 0;
  return {
    x: (h1 % 10000) / 100,
    y: (h2 % 10000) / 100,
    size: 0.9 + ((h3 % 26) / 10),
    baseOpacity: 0.25 + ((h4 % 55) / 100),
    twinkle: 3 + ((h1 % 55) / 10),
    delay: (h2 % 80) / 10,
  };
});

function ShootingStar({
  top,
  animation,
  duration,
  delay,
  length = 160,
}: {
  top: string;
  animation: "galaxy-shoot-a" | "galaxy-shoot-b" | "galaxy-shoot-c";
  duration: string;
  delay: string;
  length?: number;
}) {
  return (
    <div
      className="absolute left-0"
      style={{
        top,
        width: `${length}px`,
        height: "1.25px",
        background:
          "linear-gradient(to right, rgba(34,211,199,0) 0%, rgba(34,211,199,0.6) 55%, rgba(215,255,250,1) 100%)",
        filter: "drop-shadow(0 0 6px rgba(34,211,199,0.8))",
        animation: `${animation} ${duration} linear ${delay} infinite`,
        willChange: "transform, opacity",
      }}
    />
  );
}

export function GalaxyBackground() {
  return (
    <div
      aria-hidden
      className="galaxy-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* Base deep-space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #0a1526 0%, #060d1a 45%, #040812 100%)",
        }}
      />

      {/* Nebula blobs — very soft */}
      <div
        className="absolute"
        style={{
          left: "-10%",
          top: "5%",
          width: "55vw",
          height: "55vh",
          background:
            "radial-gradient(circle at 40% 40%, rgba(34,211,199,0.07) 0%, rgba(34,211,199,0.02) 40%, transparent 70%)",
          animation: "galaxy-drift-a 32s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "-8%",
          top: "35%",
          width: "45vw",
          height: "45vh",
          background:
            "radial-gradient(circle at 50% 50%, rgba(125,92,255,0.06) 0%, rgba(125,92,255,0.02) 45%, transparent 70%)",
          animation: "galaxy-drift-b 38s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute"
        style={{
          left: "30%",
          bottom: "-10%",
          width: "60vw",
          height: "50vh",
          background:
            "radial-gradient(circle at 50% 50%, rgba(34,211,199,0.05) 0%, transparent 70%)",
          animation: "galaxy-drift-a 44s ease-in-out infinite reverse",
          filter: "blur(60px)",
        }}
      />

      {/* Dust grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Twinkling starfield */}
      {GALAXY_STARS.map((s, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-accent-signal"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.baseOpacity,
            boxShadow: s.size > 2 ? "0 0 4px rgba(34,211,199,0.6)" : undefined,
            ["--g-min" as string]: String(Math.max(0.1, s.baseOpacity - 0.2)),
            ["--g-max" as string]: String(Math.min(0.95, s.baseOpacity + 0.35)),
            animation: `galaxy-twinkle ${s.twinkle}s ease-in-out ${s.delay}s infinite`,
            willChange: "opacity",
          }}
        />
      ))}

      {/* Warm tiny stars for variety */}
      {[
        { x: 18, y: 12, size: 1.4, o: 0.5 },
        { x: 72, y: 8, size: 1.2, o: 0.4 },
        { x: 38, y: 88, size: 1.4, o: 0.45 },
        { x: 82, y: 62, size: 1.3, o: 0.4 },
        { x: 6, y: 56, size: 1.5, o: 0.5 },
      ].map((s, i) => (
        <span
          key={`warm-${i}`}
          className="absolute block rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: "#ffd4a8",
            opacity: s.o,
            boxShadow: "0 0 6px rgba(255,212,168,0.6)",
            animation: `galaxy-pulse ${4 + i}s ease-in-out ${i * 0.6}s infinite`,
          }}
        />
      ))}

      {/* Shooting stars — three staggered */}
      <ShootingStar top="15%" animation="galaxy-shoot-a" duration="18s" delay="3s" length={180} />
      <ShootingStar top="44%" animation="galaxy-shoot-b" duration="24s" delay="9s" length={150} />
      <ShootingStar top="78%" animation="galaxy-shoot-c" duration="32s" delay="18s" length={130} />
    </div>
  );
}
