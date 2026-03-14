import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-ink-200 bg-paper-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <p className="font-body text-metric-sm text-ink-500">© {new Date().getFullYear()}</p>
        <div className="flex gap-8">
          <Link
            href="/contact"
            className="font-body text-metric-sm font-medium text-ink-500 transition-colors hover:text-ink-950"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
