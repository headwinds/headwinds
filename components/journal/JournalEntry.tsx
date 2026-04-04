"use client";

import React from "react";
import { Column } from "cross-country";
import { Tag } from "antd";
import { ArrowLeftOutlined, SoundOutlined } from "@ant-design/icons";
import Link from "next/link";
import type { JournalEntry as JournalEntryType } from "./journal-data";

interface JournalEntryProps {
  entry: JournalEntryType;
}

const JournalEntry = ({ entry }: JournalEntryProps) => {
  // Simple markdown-ish rendering: split on ## headings and paragraphs
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="text-lg font-semibold text-gray-900 mt-6 mb-2 m-0"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("# ")) {
        return (
          <h1
            key={i}
            className="text-xl font-bold text-gray-900 mt-6 mb-2 m-0"
          >
            {trimmed.replace("# ", "")}
          </h1>
        );
      }
      return (
        <p
          key={i}
          className="text-sm text-gray-700 leading-relaxed m-0 mb-3"
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <Column
      customStyle={{
        padding: 0,
        gap: 16,
        width: "100%",
        maxWidth: 720,
      }}
    >
      {/* Back link */}
      <Link
        href="/journal"
        className="text-sm text-gray-400 hover:text-gray-700 no-underline flex items-center gap-1 transition-colors"
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        Back to Journal
      </Link>

      {/* Date */}
      <time className="text-xs text-gray-400 font-mono">
        {new Date(entry.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 leading-tight m-0">
        {entry.title}
      </h1>

      {/* Podcast link */}
      {entry.podcastUrl && (
        <a
          href={entry.podcastUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 p-3 no-underline hover:bg-purple-100 transition-colors"
        >
          <SoundOutlined style={{ color: "#7c3aed", fontSize: 18 }} />
          <div>
            <div className="text-sm font-medium text-purple-700">
              Listen to the Podcast
            </div>
            {entry.podcastSource && (
              <div className="text-xs text-purple-500">
                {entry.podcastSource}
              </div>
            )}
          </div>
        </a>
      )}

      {/* Content */}
      <div className="mt-2">{renderContent(entry.content)}</div>

      {/* Tags */}
      <div className="flex items-center gap-2 mt-4 flex-wrap border-t border-gray-100 pt-4">
        {entry.tags.map((tag) => (
          <Tag
            key={tag}
            style={{ fontSize: 11, borderRadius: 12, margin: 0 }}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </Column>
  );
};

export default JournalEntry;
