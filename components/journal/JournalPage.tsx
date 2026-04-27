"use client";

import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { journalEntries } from "@/components/journal/journal-data";

const JournalPage = () => {
  return (
    <PageShell>
      {/* Page Header */}
      <div className="bg-[#F3EBE2] rounded-2xl p-12 flex flex-col gap-4">
        <p className="text-xs font-medium text-[#6B6B6B] tracking-[3px] m-0">
          JOURNAL
        </p>
        <h1 className="text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight m-0">
        <span style={{ filter: "grayscale(1)" }}>🔥</span> Journal
        </h1>
        <p className="text-lg text-[#3D3D3D] leading-relaxed m-0">
          Thoughts on AI, tech, and building things.
        </p>
      </div>

      {/* Entry Cards */}
      {journalEntries.map((entry) => (
        <Link
          key={entry.id}
          href={`/journal/${entry.slug}`}
          className="group bg-[#F3EBE2] rounded-2xl px-12 py-10 flex items-start justify-between gap-8 no-underline hover:bg-[#EDE5DC] transition-colors"
        >
          <div className="flex-1 flex flex-col gap-3">
            <time className="text-[13px] text-[#6B6B6B]">
              {new Date(entry.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h2 className="text-xl md:text-2xl text-[#1A1A1A] leading-snug m-0">
              {entry.title}
            </h2>
            <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
              {entry.summary}
            </p>

            {/* Tags */}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {entry.podcastUrl && (
                <span className="inline-flex items-center gap-1.5 bg-[#C4CFDE] text-[#3D3D3D] text-[11px] font-medium px-3 py-1 rounded-full">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                    />
                  </svg>
                  Podcast
                </span>
              )}
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-[#3D3D3D] border border-[#C5BEB6] bg-[#F3EBE2] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <svg
            className="w-5 h-5 text-[#C5BEB6] group-hover:text-[#1A1A1A] transition-colors mt-8 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      ))}

      {/* Empty State */}
      {journalEntries.length <= 1 && (
        <div className="bg-[#F3EBE2] rounded-2xl py-20 px-12 flex flex-col items-center gap-3">
          <p className="text-lg text-[#6B6B6B] m-0">
            More entries coming soon...
          </p>
          <p className="text-sm text-[#8A8A8A] m-0">
            Check back for new hot takes on AI, tech, and building things.
          </p>
        </div>
      )}
    </PageShell>
  );
};

export default JournalPage;
