import { STAGE_PARTS_CUMULATIVE, type RevenueEngineTier } from "../content/revenue-engine-data";
import { BikeDrawing } from "./BikeDrawing";
import { getTierAccent } from "./bike-geometry";

type RStageSvgProps = {
  tier: RevenueEngineTier;
  vbH?: number;
  bikeScale?: number;
  bikeTranslateX?: number;
  bikeTranslateY?: number;
  className?: string;
};

export function RStageSvg({
  tier,
  vbH = 360,
  bikeScale = 1.4,
  bikeTranslateX = 540,
  bikeTranslateY = 100,
  className = "re-bike-svg",
}: RStageSvgProps) {
  const vbW = 1600;
  const accent = getTierAccent(tier);
  const horizonY = vbH * 0.55;
  const tx = bikeTranslateX;
  const ty = bikeTranslateY;
  const parts = new Set(STAGE_PARTS_CUMULATIVE[4]);

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path
        d={`M 0,${horizonY - 22} L 90,${horizonY - 44} L 180,${horizonY - 28} L 280,${horizonY - 50} L 380,${horizonY - 30} L 470,${horizonY - 50} L 580,${horizonY - 26} L 680,${horizonY - 52} L 800,${horizonY - 26} L 920,${horizonY - 50} L 1020,${horizonY - 28} L 1140,${horizonY - 50} L 1260,${horizonY - 24} L 1380,${horizonY - 48} L 1500,${horizonY - 26} L 1600,${horizonY - 32}`}
        stroke="rgba(232,239,237,0.22)"
        strokeWidth={0.7}
        fill="none"
      />
      <line
        x1={0}
        y1={horizonY}
        x2={vbW}
        y2={horizonY}
        stroke="rgba(232,239,237,0.5)"
        strokeWidth={0.8}
      />
      {Array.from({ length: 7 }, (_, row) => {
        const t = row / 7;
        const y = horizonY + 4 + t * (vbH - horizonY - 10);
        const dashLen = 40 + t * 70;
        const gap = 40 - t * 16;
        return Array.from({ length: 33 }, (_, i) => {
          const x = (i - 3) * (dashLen + gap);
          return (
            <line
              key={`${row}-${i}`}
              x1={x}
              y1={y}
              x2={x + dashLen}
              y2={y}
              stroke="#e8efed"
              strokeWidth={0.6 + t * 0.8}
              opacity={0.18 + t * 0.65}
            />
          );
        });
      })}
      <g transform={`translate(${tx} ${ty}) scale(${bikeScale})`}>
        <BikeDrawing parts={parts} tier={tier} accent={accent} motion rider ground={false} />
      </g>
      {[
        { yOff: 30, len: 240, x: 60 },
        { yOff: 70, len: 300, x: 30 },
        { yOff: 110, len: 190, x: 80 },
      ].map((s, i) => (
        <line
          key={s.x}
          x1={s.x}
          y1={horizonY + s.yOff}
          x2={s.x + s.len}
          y2={horizonY + s.yOff}
          stroke={accent}
          strokeWidth={1.6 - i * 0.3}
          strokeLinecap="round"
          opacity={0.85 - i * 0.2}
        />
      ))}
    </svg>
  );
}
