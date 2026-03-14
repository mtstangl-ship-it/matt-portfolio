import Image from "next/image";

interface CompanyWordmarkProps {
  name: string;
  src?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { height: 20, width: 80, class: "h-5 w-20" },
  md: { height: 24, width: 100, class: "h-6 w-[6.25rem]" },
  lg: { height: 28, width: 120, class: "h-7 w-[7.5rem]" },
};

export function CompanyWordmark({
  name,
  src,
  className = "",
  size = "md",
}: CompanyWordmarkProps) {
  const dim = sizes[size];

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={dim.width}
        height={dim.height}
        className={`object-contain object-left opacity-80 transition-opacity hover:opacity-95 ${dim.class} ${className}`.trim()}
        style={{ filter: "grayscale(1) contrast(0.9) brightness(0.97)" }}
      />
    );
  }

  return (
    <span
      className={`font-body block font-semibold tracking-[0.05em] text-ink-600 ${dim.class} ${className}`.trim()}
      style={{ fontSize: size === "sm" ? "0.6875rem" : size === "md" ? "0.75rem" : "0.8125rem" }}
    >
      {name}
    </span>
  );
}
