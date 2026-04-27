"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import JournalEntryView from "@/components/journal/JournalEntry";
import { getEntryBySlug } from "@/components/journal/journal-data";

const JournalEntryPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const entry = getEntryBySlug(slug);

  if (!entry) {
    return (
      <PageShell>
        <div className="bg-[#F3EBE2] rounded-2xl py-20 px-12 flex flex-col items-center gap-4">
          <h1 className="text-2xl font-normal text-[#1A1A1A] m-0">
            Entry not found
          </h1>
          <p className="text-sm text-[#6B6B6B] m-0">
            The journal entry &ldquo;{slug}&rdquo; doesn&apos;t exist.
          </p>
          <Link
            href="/journal"
            className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] no-underline transition-colors"
          >
            ← Back to Journal
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <JournalEntryView entry={entry} />
    </PageShell>
  );
};

export default JournalEntryPage;
