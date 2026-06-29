"use client";

import { useState } from "react";

interface CompanyWordmarkProps {
  name: string;
  src?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
}

const sizes = {
  sm: { height: 28, width: 100, class: "h-7 w-[6.25rem]" },
  md: { height: 36, width: 130, class: "h-9 w-[8.125rem]" },
  lg: { height: 40, width: 150, class: "h-10 w-[9.375rem]" },
};

export function CompanyWordmark({
  name,
  src,
  className = "",
  size = "md",
  inverted = false,
}: CompanyWordmarkProps) {
  const dim = sizes[size];
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <span
        className={` block font-bold tracking-[0.05em] ${inverted ? "text-dashboard-ink-muted" : "text-ink-700"} ${dim.class} ${className}`.trim()}
        style={{ fontSize: size === "sm" ? "0.75rem" : size === "md" ? "0.8125rem" : "0.875rem" }}
      >
        {name}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={dim.width}
      height={dim.height}
      className={`object-contain ${inverted ? "brightness-0 invert opacity-90" : ""} ${dim.class} ${className}`.trim()}
      onError={() => setError(true)}
    />
  );
}
