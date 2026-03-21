import Link from "next/link";
import { navLinks } from "@/content/nav";

export function Nav() {
  return (
    <nav className="border-b border-ink-200/80 bg-surface-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-6">
        <Link href="/" className="font-display shrink-0 text-card-title font-bold text-ink-950">
          Matt Stangl
        </Link>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end sm:gap-x-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-body text-metric-sm font-medium text-ink-600 transition-colors hover:text-ink-950"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
