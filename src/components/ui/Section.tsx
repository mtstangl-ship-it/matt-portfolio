interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
  container?: boolean;
}

export function Section({
  children,
  className = "",
  as: Component = "section",
  container = true,
}: SectionProps) {
  return (
    <Component
      className={`${container ? "mx-auto max-w-6xl px-6" : ""} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
