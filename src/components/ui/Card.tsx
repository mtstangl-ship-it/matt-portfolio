interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "elevated" | "bordered" | "subtle";
  style?: React.CSSProperties;
}

export function Card({
  children,
  className = "",
  variant = "bordered",
  style,
}: CardProps) {
  const base = "rounded-sm bg-paper-50 transition-shadow duration-200";
  const variants = {
    elevated: "shadow-card-elevated hover:shadow-card-hover border-2 border-ink-200/70",
    bordered: "border-2 border-ink-200/70",
    subtle: "border border-ink-200/60 bg-paper-100 shadow-card",
  };
  return (
    <div
      className={`${base} ${variants[variant]} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
