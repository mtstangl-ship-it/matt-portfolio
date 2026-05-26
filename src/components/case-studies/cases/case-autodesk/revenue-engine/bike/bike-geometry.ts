export const BIKE_INK = "#e8efed";
export const BIKE_INK_DIM = "rgba(232,239,237,0.55)";
export const BIKE_BG = "#0a0f0e";

export const BIKE_G = {
  rearHub: { x: 78, y: 168 },
  frontHub: { x: 322, y: 168 },
  wheelR: 40,
  headTop: { x: 310, y: 78 },
  headBottom: { x: 296, y: 118 },
  seatPostTop: { x: 200, y: 86 },
  bbCenter: { x: 188, y: 130 },
  swingPivot: { x: 178, y: 132 },
  engine: { x1: 158, y1: 118, x2: 218, y2: 158 },
  tank: { x1: 200, y1: 56, x2: 296, y2: 92 },
  seat: { x1: 110, y1: 80, x2: 200, y2: 90 },
  tail: { x1: 90, y1: 80, x2: 112, y2: 84 },
  headlight: { x: 332, y: 95 },
} as const;

export const BIKE_S = {
  seatHump: 8,
  barHeight: 6,
  barReach: 14,
  tailLength: 12,
} as const;

export function arcPath(cx: number, cy: number, r: number, a1: number, a2: number): string {
  const x1 = cx + Math.cos(a1) * r;
  const y1 = cy + Math.sin(a1) * r;
  const x2 = cx + Math.cos(a2) * r;
  const y2 = cy + Math.sin(a2) * r;
  const large = Math.abs(a2 - a1) > Math.PI ? 1 : 0;
  const sweep = a2 > a1 ? 1 : 0;
  return `M ${x1},${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2},${y2}`;
}

export function getTierAccent(tier: "growth" | "nurture"): string {
  return tier === "growth" ? "#b59bd6" : "#3dd17a";
}
