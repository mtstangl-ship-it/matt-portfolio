import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-200/80 bg-surface-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-6">
        <p className="text-metric-sm text-ink-500">© {new Date().getFullYear()}</p>
        <div className="flex gap-8">
          <Link
            href="/contact"
            className="text-metric-sm font-medium text-ink-500 transition-colors hover:text-ink-950"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
