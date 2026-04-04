"use client";

import { useParams } from "next/navigation";
import Nav from "@/components/headwinds-nav";
import JournalEntryView from "@/components/journal/JournalEntry";
import { getEntryBySlug } from "@/components/journal/journal-data";
import Link from "next/link";

const JournalEntryPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const entry = getEntryBySlug(slug);

  if (!entry) {
    return (
      <div className="flex flex-col items-center justify-between m-1">
        <Nav />
        <div className="text-center py-20">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Entry not found
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            The journal entry &ldquo;{slug}&rdquo; doesn&apos;t exist.
          </p>
          <Link
            href="/journal"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between m-1">
      <Nav />
      <JournalEntryView entry={entry} />
    </div>
  );
};
export default JournalEntryPage;
