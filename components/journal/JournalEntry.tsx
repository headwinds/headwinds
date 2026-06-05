"use client";

import React from "react";
import Link from "next/link";
import type { JournalEntry as JournalEntryType } from "./journal-data";

interface JournalEntryProps {
  entry: JournalEntryType;
}

const JournalEntry = ({ entry }: JournalEntryProps) => {
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="text-lg font-normal text-[#1A1A1A] mt-8 mb-2 m-0"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("# ")) {
        return (
          <h1
            key={i}
            className="text-xl font-normal text-[#1A1A1A] mt-8 mb-2 m-0"
          >
            {trimmed.replace("# ", "")}
          </h1>
        );
      }
      return (
        <p
          key={i}
          className="text-sm text-[#3D3D3D] leading-relaxed m-0 mb-4"
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="bg-[#F3EBE2] rounded-2xl p-8 md:p-12 flex flex-col gap-6 max-w-3xl mx-auto w-full">
      {/* Back link */}
      <Link
        href="/journal"
        className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] no-underline flex items-center gap-2 transition-colors w-fit"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Journal
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] m-0">
          {new Date(entry.date)
            .toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            .toUpperCase()}
        </p>
        <h1 className="text-2xl md:text-3xl font-normal text-[#1A1A1A] leading-snug m-0">
          {entry.title}
        </h1>
        <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
          {entry.summary}
        </p>
      </div>

      {/* Podcast card */}
      {entry.podcastUrl && (
        <a
          href={entry.podcastUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl bg-[#EAE3DA] hover:bg-[#EDE5DC] p-4 no-underline transition-colors max-w-2xl group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#C4CFDE] flex items-center justify-center shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3D3D3D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#3D3D3D] transition-colors">
              Listen to the Podcast
            </span>
            {entry.podcastSource && (
              <span className="text-[11px] text-[#6B6B6B] tracking-wide">
                {entry.podcastSource}
              </span>
            )}
          </div>
          <svg
            className="w-4 h-4 text-[#C5BEB6] group-hover:text-[#6B6B6B] transition-colors ml-auto shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </a>
      )}

      {/* Content */}
      <div className="border-t border-[#D5CEC6] pt-6 max-w-2xl">
        {renderContent(entry.content)}
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap border-t border-[#D5CEC6] pt-6 max-w-2xl">
        <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] mr-2">
          TAGS
        </span>
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] text-[#3D3D3D] border border-[#D5CEC6] bg-[#F3EBE2] px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JournalEntry;
