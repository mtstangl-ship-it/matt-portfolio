"use client";

export function SignalMapMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`w-full ${className}`.trim()} aria-hidden preserveAspectRatio="xMidYMid meet">
      <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.15" />
      <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.2" />
      <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.25" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 60 + 20 * Math.cos(rad);
        const y1 = 60 + 20 * Math.sin(rad);
        const x2 = 60 + 50 * Math.cos(rad);
        const y2 = 60 + 50 * Math.sin(rad);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.3" strokeLinecap="round" />
        );
      })}
      <circle cx="60" cy="60" r="6" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 60 + 35 * Math.cos(rad);
        const y = 60 + 35 * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />;
      })}
    </svg>
  );
}
