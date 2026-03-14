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
    elevated: "shadow-card hover:shadow-card-hover border-2 border-ink-200",
    bordered: "border-2 border-ink-200",
    subtle: "border border-ink-200 bg-paper-100",
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
