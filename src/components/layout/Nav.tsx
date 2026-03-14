import Link from "next/link";
import { navLinks } from "@/content/nav";

export function Nav() {
  return (
    <nav className="border-b-2 border-ink-200 bg-paper-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-card-title font-bold text-ink-950">
          Matt Stangl
        </Link>
        <ul className="flex gap-8">
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
