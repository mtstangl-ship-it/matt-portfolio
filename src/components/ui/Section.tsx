interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
  container?: boolean;
}

/** Shared grid: max-w-6xl, responsive horizontal padding. Use for all section content. */
const containerClass = "mx-auto w-full max-w-6xl px-4 sm:px-6";

export function Section({
  children,
  className = "",
  as: Component = "section",
  container = true,
}: SectionProps) {
  return (
    <Component className={`${container ? containerClass : ""} ${className}`.trim()}>
      {children}
    </Component>
  );
}
