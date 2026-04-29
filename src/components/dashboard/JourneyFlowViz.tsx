"use client";

import { sampleKeyframes, useCyclePhase } from "@/components/dashboard/useCyclePhase";

// Revenue through productized services: fragmentation → productization → growth

const accent = "#22d3c7";
const cycleMs = 5000;

const signalDots: [number, number][] = [
  [30, 10],
  [95, 6],
  [55, 26],
  [170, 12],
  [120, 30],
  [200, 22],
  [75, 32],
  [145, 8],
];

const networkPositions: [number, number][] = [
  [55, 16],
  [95, 14],
  [75, 22],
  [165, 16],
  [120, 22],
  [185, 20],
  [85, 26],
  [135, 17],
];

const blockW = 52;
const gap = 26;
const blocks = [
  { x: 24, y: 6, w: blockW, h: 26 },
  { x: 24 + blockW + gap, y: 6, w: blockW, h: 26 },
  { x: 24 + (blockW + gap) * 2, y: 6, w: blockW, h: 26 },
];

const blockCenters: [number, number][] = blocks.map(
  (b) => [b.x + b.w / 2, b.y + b.h / 2] as [number, number]
);

function nearestBlockCenter(i: number): [number, number] {
  const [nx, ny] = networkPositions[i] ?? [120, 19];
  let best = blockCenters[0];
  let bestD = Infinity;
  for (const [cx, cy] of blockCenters) {
    const d = (nx - cx) ** 2 + (ny - cy) ** 2;
    if (d < bestD) {
      bestD = d;
      best = [cx, cy];
    }
  }
  return best;
}

const clusterOffsets: [number, number][] = [
  [-1.5, 0], [1, -0.5], [-1, 0.5], [1.5, 0], [-0.5, 0.5], [0, 0], [1, 0.5], [-0.5, -0.5],
];
const clusterTargets = signalDots.map((_, i) => {
  const [cx, cy] = nearestBlockCenter(i);
  const [ox, oy] = clusterOffsets[i];
  return [cx + ox, cy + oy] as [number, number];
});

const labels = ["Signals", "Offering", "Growth"];

const lineTimes = [0, 0.2, 0.36, 0.42, 0.44, 1];
const lineOpacityLooped = [0, 0, 0.35, 0.38, 0, 0];

const blockTimes = [0, 0.42, 0.44, 0.48, 0.52, 0.62, 1];
const blockOpacityKeyframes = [0, 0, 0, 0, 1, 1, 1];

export function JourneyFlowViz({ isHovered = false }: { isHovered?: boolean } = {}) {
  const phase = useCyclePhase(isHovered, cycleMs);
  const barLabelOpacity = isHovered
    ? sampleKeyframes(blockOpacityKeyframes, blockTimes, phase)
    : 0;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <svg
        viewBox="0 0 240 48"
        className="mx-auto h-auto w-full max-w-[min(100%,280px)] min-h-0 flex-1"
        preserveAspectRatio="xMidYMid meet"
      >
        {[
          [0, 2], [1, 2], [2, 4], [3, 4], [4, 5], [4, 6], [5, 7], [2, 7],
        ].map(([a, b]) => {
          const [ax, ay] = networkPositions[a];
          const [bx, by] = networkPositions[b];
          const opacity = isHovered
            ? sampleKeyframes(lineOpacityLooped, lineTimes, phase)
            : 0;
          return (
            <line
              key={`${a}-${b}`}
              x1={ax}
              y1={ay}
              x2={bx}
              y2={by}
              stroke={accent}
              strokeWidth={0.6}
              strokeLinecap="round"
              opacity={opacity}
            />
          );
        })}

        {blocks.map((block, i) => {
          const yKeyframes = [
            block.y,
            block.y,
            block.y,
            block.y,
            block.y,
            block.y - 4,
            block.y - 4,
          ];
          const opacity = isHovered ? sampleKeyframes(blockOpacityKeyframes, blockTimes, phase) : 0;
          const y = isHovered ? sampleKeyframes(yKeyframes, blockTimes, phase) : block.y;
          return (
            <rect
              key={i}
              x={block.x}
              y={y}
              width={block.w}
              height={block.h}
              rx={1}
              ry={1}
              fill={accent}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={0.6}
              opacity={opacity}
            />
          );
        })}

        {blocks.map((block, i) => (
          <text
            key={`lbl-${labels[i]}`}
            x={block.x + block.w / 2}
            y={block.y + block.h + 8}
            textAnchor="middle"
            fill="currentColor"
            className="text-dashboard-ink-light"
            fontSize={5.25}
            fontWeight={600}
            letterSpacing="0.06em"
            opacity={barLabelOpacity}
            style={{ textTransform: "uppercase" }}
          >
            {labels[i]}
          </text>
        ))}

        {signalDots.map(([sx, sy], i) => {
          const [nx, ny] = networkPositions[i] ?? [sx, sy];
          const [tx, ty] = clusterTargets[i];
          const dotTimes = [0, 0.32, 0.38, 0.5, 0.54, 1];
          const cxKeys = [sx, nx, nx, tx, tx, sx];
          const cyKeys = [sy, ny, ny, ty, ty, sy];
          const opKeys = [0.55, 0.85, 0.85, 0.9, 0, 0.55];
          const cx = isHovered ? sampleKeyframes(cxKeys, dotTimes, phase) : sx;
          const cy = isHovered ? sampleKeyframes(cyKeys, dotTimes, phase) : sy;
          const opacity = isHovered ? sampleKeyframes(opKeys, dotTimes, phase) : 0.5;
          return <circle key={i} r={2.2} cx={cx} cy={cy} fill={accent} opacity={opacity} />;
        })}
      </svg>
    </div>
  );
}
