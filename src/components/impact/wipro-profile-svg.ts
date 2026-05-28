/** Stress-profile SVG — stroke curves, annotations, and in-canvas delta span. */

/** Chart x for day index (0–7 scale, e.g. 6.8). */
function dayX(day: number): number {
  return Math.round(60 + day * (880 / 7));
}

/** Shared resolution endpoints — before resolves later and more distressed. */
export const HORIZONTAL_RESOLUTION = {
  before: { x: dayX(6.8), y: 132 },
  after: { x: dayX(4.7), y: 94 },
} as const;

export const VERTICAL_RESOLUTION = {
  before: { x: 158, y: dayX(6.8) },
  after: { x: 108, y: dayX(4.7) },
} as const;

function deltaSpanHorizontal(): string {
  const { before, after } = HORIZONTAL_RESOLUTION;
  const mx = Math.round((before.x + after.x) / 2);
  const my = Math.round((before.y + after.y) / 2) - 14;
  return `
  <g class="delta-span">
    <line class="delta-span-line" x1="${after.x}" y1="${after.y}" x2="${before.x}" y2="${before.y}"/>
    <line class="delta-span-tick" x1="${after.x}" y1="${after.y - 10}" x2="${after.x}" y2="${after.y + 10}"/>
    <line class="delta-span-tick" x1="${before.x}" y1="${before.y - 10}" x2="${before.x}" y2="${before.y + 10}"/>
    <text class="delta-span-label" x="${mx}" y="${my}" text-anchor="middle">6.8 D → 4.7 D · −31% MTTR · ≈ 2.1 DAYS RETURNED PER CASE</text>
  </g>`;
}

function deltaSpanVertical(): string {
  const { before, after } = VERTICAL_RESOLUTION;
  const mx = Math.round((before.x + after.x) / 2);
  const my = Math.round((before.y + after.y) / 2);
  return `
  <g class="delta-span">
    <line class="delta-span-line" x1="${after.x}" y1="${after.y}" x2="${before.x}" y2="${before.y}"/>
    <line class="delta-span-tick" x1="${after.x - 10}" y1="${after.y}" x2="${after.x + 10}" y2="${after.y}"/>
    <line class="delta-span-tick" x1="${before.x - 10}" y1="${before.y}" x2="${before.x + 10}" y2="${before.y}"/>
    <text class="delta-span-label delta-span-label--vertical" x="${mx}" y="${my + 28}" text-anchor="middle">6.8 D → 4.7 D · −31% MTTR · ≈ 2.1 DAYS RETURNED PER CASE</text>
  </g>`;
}

export function buildHorizontalSVG(compactLabels = false): string {
  const restart1 = compactLabels
    ? "⚠"
    : "⚠ RESTART · CONTEXT LOST · D2.1";
  const restart2 = compactLabels
    ? "⚠"
    : "⚠ RESTART · CONTEXT LOST · D3.5";
  const restart3 = compactLabels
    ? "⚠"
    : "⚠ RESTART · CONTEXT LOST · D5.4";
  const preserve1 = compactLabels ? "✓" : "✓ NAMED OWNER · D0";
  const preserve2 = compactLabels ? "✓" : "✓ CONTEXT PRESERVED · D2";
  const preserve3 = compactLabels ? "✓" : "✓ RESOLVED · D4.7";
  const { before, after } = HORIZONTAL_RESOLUTION;

  return `
<svg viewBox="0 0 1000 460" preserveAspectRatio="none" class="p2-svg" aria-hidden="true">
  <g class="grid">
    <line x1="60" y1="80"  x2="940" y2="80"/>
    <line x1="60" y1="160" x2="940" y2="160"/>
    <line x1="60" y1="240" x2="940" y2="240"/>
    <line x1="60" y1="320" x2="940" y2="320"/>
  </g>
  <line class="axis" x1="60"  y1="20"  x2="60"  y2="400"/>
  <line class="axis" x1="60"  y1="400" x2="940" y2="400"/>

  <text class="y-label y-label--calm" x="14"  y="64"  text-anchor="start" transform="rotate(-90 14 64)">↑ CALM</text>
  <text class="y-label y-label--stress" x="14"  y="384" text-anchor="end"   transform="rotate(-90 14 384)">↓ DISTRESSED</text>
  <text class="ax-label" x="500" y="436" text-anchor="middle">TIME · DAYS POST-CASE-OPEN</text>

  <g class="day-tick">
    <line x1="60"  y1="400" x2="60"  y2="406"/>
    <line x1="186" y1="400" x2="186" y2="406"/>
    <line x1="312" y1="400" x2="312" y2="406"/>
    <line x1="438" y1="400" x2="438" y2="406"/>
    <line x1="564" y1="400" x2="564" y2="406"/>
    <line x1="690" y1="400" x2="690" y2="406"/>
    <line x1="816" y1="400" x2="816" y2="406"/>
    <line x1="940" y1="400" x2="940" y2="406"/>
  </g>
  <g class="day-num">
    <text x="60"  y="418" text-anchor="middle">D0</text>
    <text x="186" y="418" text-anchor="middle">D1</text>
    <text x="312" y="418" text-anchor="middle">D2</text>
    <text x="438" y="418" text-anchor="middle">D3</text>
    <text x="564" y="418" text-anchor="middle">D4</text>
    <text x="690" y="418" text-anchor="middle">D5</text>
    <text x="816" y="418" text-anchor="middle">D6</text>
    <text x="940" y="418" text-anchor="middle">D7</text>
  </g>

  <path class="curve-before"
        d="M 60 140
           C 110 130, 150 130, 186 150
           C 220 220, 254 300, 270 290
           C 280 240, 300 170, 312 150
           C 360 240, 410 310, 438 300
           C 460 250, 470 180, 478 160
           C 580 270, 640 315, 690 310
           C 706 260, 718 180, 728 170
           C 800 138, 870 134, ${before.x} ${before.y}"/>
  <rect class="endpoint before" x="${before.x - 8}" y="${before.y - 8}" width="16" height="16"/>

  <line class="restart-line" x1="270" y1="290" x2="270" y2="72"/>
  <text class="restart" data-annotation="restart-1" x="276" y="76">${restart1}</text>
  <line class="restart-line" x1="438" y1="300" x2="438" y2="86"/>
  <text class="restart" data-annotation="restart-2" x="444" y="90">${restart2}</text>
  <line class="restart-line" x1="690" y1="310" x2="690" y2="72"/>
  <text class="restart" data-annotation="restart-3" x="696" y="76">${restart3}</text>

  <path class="curve-after"
        d="M 60 130
           C 140 130, 220 150, 280 180
           C 340 210, 380 235, 420 240
           C 460 240, 500 232, 540 215
           C 580 196, 620 170, 640 148
           L ${after.x} ${after.y}"/>
  <polygon class="endpoint after" points="${after.x},${after.y - 12} ${after.x + 12},${after.y} ${after.x},${after.y + 12} ${after.x - 12},${after.y}"/>

  <line class="preserve-line" x1="60"  y1="130" x2="60"  y2="58"/>
  <text class="preserve" data-annotation="preserve-1" x="68"  y="54">${preserve1}</text>
  <line class="preserve-line" x1="312" y1="208" x2="312" y2="172"/>
  <text class="preserve" data-annotation="preserve-2" x="320" y="168">${preserve2}</text>
  <line class="preserve-line" x1="${after.x}" y1="${after.y}" x2="${after.x - 48}" y2="${after.y - 28}"/>
  <text class="preserve" data-annotation="preserve-3" x="${after.x - 54}" y="${after.y - 32}" text-anchor="end">${preserve3}</text>

  ${deltaSpanHorizontal()}
</svg>`;
}

export function buildVerticalSVG(compactLabels = false): string {
  const timeY = (day: number) => Math.round(60 + day * (880 / 7));
  const { before, after } = VERTICAL_RESOLUTION;

  return `
<svg viewBox="0 0 460 1000" preserveAspectRatio="none" class="p2-svg" aria-hidden="true">
  <g class="grid">
    <line x1="140" y1="60" x2="140" y2="940"/>
    <line x1="220" y1="60" x2="220" y2="940"/>
    <line x1="300" y1="60" x2="300" y2="940"/>
    <line x1="380" y1="60" x2="380" y2="940"/>
  </g>
  <line class="axis" x1="60" y1="60" x2="60"  y2="940"/>
  <line class="axis" x1="60" y1="60" x2="440" y2="60"/>

  <text class="x-label x-label--calm" x="72"  y="48" text-anchor="start">↑ CALM</text>
  <text class="x-label x-label--stress" x="420" y="48" text-anchor="end">DISTRESSED ↓</text>
  <text class="ax-label ax-label--time" x="22" y="500" text-anchor="middle" transform="rotate(-90 22 500)">TIME · DAYS POST-CASE-OPEN</text>

  <g class="day-tick">
    <line x1="54" y1="60"  x2="60"  y2="60"/>
    <line x1="54" y1="186" x2="60"  y2="186"/>
    <line x1="54" y1="312" x2="60"  y2="312"/>
    <line x1="54" y1="438" x2="60"  y2="438"/>
    <line x1="54" y1="564" x2="60"  y2="564"/>
    <line x1="54" y1="690" x2="60"  y2="690"/>
    <line x1="54" y1="816" x2="60"  y2="816"/>
    <line x1="54" y1="940" x2="60"  y2="940"/>
  </g>
  <g class="day-num">
    <text class="day-label" x="48" y="64"  text-anchor="end">D0</text>
    <text class="day-label" x="48" y="190" text-anchor="end">D1</text>
    <text class="day-label" x="48" y="316" text-anchor="end">D2</text>
    <text class="day-label" x="48" y="442" text-anchor="end">D3</text>
    <text class="day-label" x="48" y="568" text-anchor="end">D4</text>
    <text class="day-label" x="48" y="694" text-anchor="end">D5</text>
    <text class="day-label" x="48" y="820" text-anchor="end">D6</text>
    <text class="day-label" x="48" y="944" text-anchor="end">D7</text>
  </g>

  <path class="curve-before"
        d="M 140 70
           C 130 110, 130 150, 150 186
           C 220 220, 300 254, 290 270
           C 240 280, 170 300, 150 312
           C 240 360, 310 410, 300 438
           C 250 460, 180 470, 160 478
           C 270 580, 315 640, 310 690
           C 260 706, 180 718, 170 728
           C 148 800, ${before.x} 880, ${before.x} ${before.y}"/>
  <rect class="endpoint before" x="${before.x - 8}" y="${before.y - 8}" width="16" height="16"/>

  <line class="restart-line" x1="290" y1="270" x2="60" y2="270"/>
  <text class="restart" data-annotation="restart-1" x="296" y="266">${compactLabels ? "⚠" : "⚠ RESTART · D2.1"}</text>
  <line class="restart-line" x1="300" y1="438" x2="60" y2="438"/>
  <text class="restart" data-annotation="restart-2" x="306" y="434">${compactLabels ? "⚠" : "⚠ RESTART · D3.5"}</text>
  <line class="restart-line" x1="310" y1="690" x2="60" y2="690"/>
  <text class="restart" data-annotation="restart-3" x="316" y="686">${compactLabels ? "⚠" : "⚠ RESTART · D5.4"}</text>

  <path class="curve-after"
        d="M 130 70
           C 130 140, 150 220, 180 280
           C 210 340, 235 380, 240 420
           C 240 460, 232 500, 215 540
           C 196 580, 170 620, 140 660
           L ${after.x} ${after.y}"/>
  <polygon class="endpoint after" points="${after.x},${after.y - 12} ${after.x + 12},${after.y} ${after.x},${after.y + 12} ${after.x - 12},${after.y}"/>

  <line class="preserve-line" x1="130" y1="70"  x2="380" y2="70"/>
  <text class="preserve" data-annotation="preserve-1" x="380" y="62" text-anchor="end">${compactLabels ? "✓" : "✓ NAMED OWNER · D0"}</text>
  <line class="preserve-line" x1="208" y1="312" x2="380" y2="312"/>
  <text class="preserve" data-annotation="preserve-2" x="380" y="304" text-anchor="end">${compactLabels ? "✓" : "✓ CONTEXT PRESERVED · D2"}</text>
  <line class="preserve-line" x1="${after.x}" y1="${after.y}" x2="380" y2="${after.y}"/>
  <text class="preserve" data-annotation="preserve-3" x="380" y="${after.y - 8}" text-anchor="end">${compactLabels ? "✓" : "✓ RESOLVED · D4.7"}</text>

  ${deltaSpanVertical()}
</svg>`;
}

export const PROFILE_ANNOTATION_LABELS: Record<string, string> = {
  "restart-1": "⚠ RESTART · CONTEXT LOST · D2.1",
  "restart-2": "⚠ RESTART · CONTEXT LOST · D3.5",
  "restart-3": "⚠ RESTART · CONTEXT LOST · D5.4",
  "preserve-1": "✓ NAMED OWNER · D0",
  "preserve-2": "✓ CONTEXT PRESERVED · D2",
  "preserve-3": "✓ RESOLVED · D4.7",
};
