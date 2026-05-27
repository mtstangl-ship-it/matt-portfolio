/** Stress-profile SVG strings ported from prototype/Impact (Build).html */

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

  return `
<svg viewBox="0 0 1000 460" preserveAspectRatio="none" class="p2-svg" aria-hidden="true">
  <rect class="lane-before" x="60"  y="20"  width="880" height="380"/>
  <rect class="lane-after"  x="60"  y="20"  width="660" height="380"/>
  <text class="lane-label before" x="930" y="42"  text-anchor="end">Before · legacy</text>
  <text class="lane-label after"  x="70"  y="42"  text-anchor="start">After · redesign</text>

  <g class="grid">
    <line x1="60" y1="80"  x2="940" y2="80"/>
    <line x1="60" y1="160" x2="940" y2="160"/>
    <line x1="60" y1="240" x2="940" y2="240"/>
    <line x1="60" y1="320" x2="940" y2="320"/>
  </g>
  <line class="axis" x1="60"  y1="20"  x2="60"  y2="400"/>
  <line class="axis" x1="60"  y1="400" x2="940" y2="400"/>

  <text class="y-label" x="30"  y="60"  text-anchor="start" transform="rotate(-90 30 60)">↑ CALM</text>
  <text class="y-label" x="30"  y="380" text-anchor="end"   transform="rotate(-90 30 380)">↓ DISTRESSED</text>
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

  <path class="curve-before-shade"
        d="M 60 140
           C 110 130, 150 130, 186 150
           C 220 220, 254 300, 270 290
           C 280 240, 300 170, 312 150
           C 360 240, 410 310, 438 300
           C 460 250, 470 180, 478 160
           C 580 270, 640 315, 690 310
           C 706 260, 718 180, 728 170
           C 800 130, 880 112, 916 110
           L 916 400 L 60 400 Z"/>

  <path class="curve-before"
        d="M 60 140
           C 110 130, 150 130, 186 150
           C 220 220, 254 300, 270 290
           C 280 240, 300 170, 312 150
           C 360 240, 410 310, 438 300
           C 460 250, 470 180, 478 160
           C 580 270, 640 315, 690 310
           C 706 260, 718 180, 728 170
           C 800 130, 880 112, 916 110"/>
  <rect class="endpoint before" x="908" y="102" width="16" height="16"/>

  <line class="restart-line" x1="270" y1="290" x2="270" y2="62"/>
  <text class="restart" data-annotation="restart-1" x="276" y="66">${restart1}</text>
  <line class="restart-line" x1="438" y1="300" x2="438" y2="76"/>
  <text class="restart" data-annotation="restart-2" x="444" y="80">${restart2}</text>
  <line class="restart-line" x1="690" y1="310" x2="690" y2="62"/>
  <text class="restart" data-annotation="restart-3" x="696" y="66">${restart3}</text>

  <path class="curve-after"
        d="M 60 130
           C 140 130, 220 150, 280 180
           C 340 210, 380 235, 420 240
           C 460 240, 500 232, 540 215
           C 580 196, 620 170, 660 140
           L 720 110"/>
  <polygon class="endpoint after" points="720,98 732,110 720,122 708,110"/>

  <line class="preserve-line" x1="60"  y1="130" x2="60"  y2="356"/>
  <text class="preserve" data-annotation="preserve-1" x="68"  y="380">${preserve1}</text>
  <line class="preserve-line" x1="312" y1="208" x2="312" y2="356"/>
  <text class="preserve" data-annotation="preserve-2" x="320" y="380">${preserve2}</text>
  <line class="preserve-line" x1="720" y1="110" x2="720" y2="356"/>
  <text class="preserve" data-annotation="preserve-3" x="640" y="380">${preserve3}</text>

  <rect class="stamp-box before" x="624" y="74"  width="170" height="22"/>
  <text class="stamp before" x="709" y="90" text-anchor="middle">RUN 01 · LEGACY</text>
  <rect class="stamp-box after"  x="80" y="240" width="180" height="22"/>
  <text class="stamp after" x="170" y="256" text-anchor="middle">RUN 02 · REDESIGN</text>

  <line class="dim-line" x1="720" y1="60" x2="916" y2="60"/>
  <polygon class="dim-arr" points="720,60 736,54 736,66"/>
  <polygon class="dim-arr" points="916,60 900,54 900,66"/>
  <line class="dim-line" x1="720" y1="110" x2="720" y2="60"/>
  <line class="dim-line" x1="916" y1="110" x2="916" y2="60"/>
  <text class="dim"     x="818" y="48"  text-anchor="middle">6.8 D → 4.7 D · −31% MTTR</text>
  <text class="dim-sub" x="818" y="30"  text-anchor="middle">≈ 2.1 days returned per case</text>
</svg>`;
}

export function buildVerticalSVG(compactLabels = false): string {
  return `
<svg viewBox="0 0 460 1000" preserveAspectRatio="none" class="p2-svg" aria-hidden="true">
  <rect class="lane-before" x="60" y="60"  width="380" height="880"/>
  <rect class="lane-after"  x="60" y="60"  width="380" height="660"/>
  <text class="lane-label before" x="430" y="36" text-anchor="end">Before · legacy ↓</text>
  <text class="lane-label after"  x="70"  y="36" text-anchor="start">After · redesign ↑</text>

  <g class="grid">
    <line x1="140" y1="60" x2="140" y2="940"/>
    <line x1="220" y1="60" x2="220" y2="940"/>
    <line x1="300" y1="60" x2="300" y2="940"/>
    <line x1="380" y1="60" x2="380" y2="940"/>
  </g>
  <line class="axis" x1="60" y1="60" x2="60"  y2="940"/>
  <line class="axis" x1="60" y1="60" x2="440" y2="60"/>

  <text class="ax-label" x="250" y="48" text-anchor="middle">← CALM        DISTRESSED →</text>
  <text class="y-label" x="20" y="56" text-anchor="end">D0</text>
  <text class="y-label" x="20" y="200" text-anchor="end">D2</text>
  <text class="y-label" x="20" y="345" text-anchor="end">D3</text>
  <text class="y-label" x="20" y="490" text-anchor="end">D4</text>
  <text class="y-label" x="20" y="635" text-anchor="end">D5</text>
  <text class="y-label" x="20" y="780" text-anchor="end">D6</text>
  <text class="y-label" x="20" y="925" text-anchor="end">D7</text>

  <path class="curve-before"
        d="M 140 70
           C 130 110, 130 150, 150 186
           C 220 220, 300 254, 290 270
           C 240 280, 170 300, 150 312
           C 240 360, 310 410, 300 438
           C 250 460, 180 470, 160 478
           C 270 580, 315 640, 310 690
           C 260 706, 180 718, 170 728
           C 130 800, 112 880, 110 916"/>
  <rect class="endpoint before" x="102" y="908" width="16" height="16"/>

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
           L 110 720"/>
  <polygon class="endpoint after" points="98,720 110,708 122,720 110,732"/>

  <line class="preserve-line" x1="130" y1="70"  x2="380" y2="70"/>
  <text class="preserve" data-annotation="preserve-1" x="380" y="62" text-anchor="end">${compactLabels ? "✓" : "✓ NAMED OWNER · D0"}</text>
  <line class="preserve-line" x1="208" y1="312" x2="380" y2="312"/>
  <text class="preserve" data-annotation="preserve-2" x="380" y="304" text-anchor="end">${compactLabels ? "✓" : "✓ CONTEXT PRESERVED · D2"}</text>
  <line class="preserve-line" x1="110" y1="720" x2="380" y2="720"/>
  <text class="preserve" data-annotation="preserve-3" x="380" y="712" text-anchor="end">${compactLabels ? "✓" : "✓ RESOLVED · D4.7"}</text>

  <rect class="stamp-box before" x="234" y="600" width="170" height="22"/>
  <text class="stamp before" x="319" y="616" text-anchor="middle">RUN 01 · LEGACY</text>
  <rect class="stamp-box after" x="160" y="240" width="180" height="22"/>
  <text class="stamp after" x="250" y="256" text-anchor="middle">RUN 02 · REDESIGN</text>

  <line class="dim-line" x1="60" y1="720" x2="60" y2="916"/>
  <polygon class="dim-arr" points="60,720 54,736 66,736"/>
  <polygon class="dim-arr" points="60,916 54,900 66,900"/>
  <text class="dim" x="92" y="822">6.8 D → 4.7 D · −31% MTTR</text>
  <text class="dim-sub" x="92" y="840">≈ 2.1 days returned per case</text>
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
