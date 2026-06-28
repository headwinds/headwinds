import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CastleKeep | headwinds",
  robots: { index: false, follow: false },
};

const CASTLEKEEP_ITEMS = [
  { href: "/castlekeep/login", label: "Login", description: "Sign in to CastleKeep." },
  { href: "/castlekeep/surveys", label: "Surveys", description: "Open surveys from the Scout server." },
];

export default function CastleKeepPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">CastleKeep</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Workspace area for Scout-backed headwinds flows.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CASTLEKEEP_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-4 transition-colors hover:border-[var(--bg-accent)]"
          >
            <div className="text-sm font-semibold">{item.label}</div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">{item.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
