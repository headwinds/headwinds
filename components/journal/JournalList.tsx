"use client";

import React from "react";
import { Column } from "cross-country";
import { Tag } from "antd";
import { SoundOutlined, RightOutlined } from "@ant-design/icons";
import { journalEntries } from "./journal-data";
import Link from "next/link";

const JournalList = () => {
  return (
    <Column
      customStyle={{
        padding: 0,
        gap: 24,
        width: "100%",
        maxWidth: 720,
      }}
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 m-0">
        🔥 Journal
        </h1>
        <p className="text-sm text-gray-500 mt-1 m-0">
          Thoughts on AI, tech, and building things
        </p>
      </div>

      {/* Entry cards */}
      {journalEntries.map((entry) => (
        <Link
          key={entry.id}
          href={`/journal/${entry.slug}`}
          className="group block rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md no-underline"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* Date */}
              <time className="text-xs text-gray-400 font-mono">
                {new Date(entry.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              {/* Title */}
              <h2 className="text-base font-semibold text-gray-900 mt-1 mb-2 leading-tight m-0 group-hover:text-blue-600 transition-colors">
                {entry.title}
              </h2>

              {/* Summary */}
              <p className="text-sm text-gray-600 leading-relaxed m-0">
                {entry.summary}
              </p>

              {/* Tags + podcast indicator */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {entry.podcastUrl && (
                  <Tag
                    icon={<SoundOutlined />}
                    color="purple"
                    style={{ fontSize: 11, borderRadius: 12, margin: 0 }}
                  >
                    Podcast
                  </Tag>
                )}
                {entry.tags.map((tag) => (
                  <Tag
                    key={tag}
                    style={{ fontSize: 11, borderRadius: 12, margin: 0 }}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <RightOutlined
              className="text-gray-300 group-hover:text-blue-500 transition-colors mt-4"
              style={{ fontSize: 14 }}
            />
          </div>
        </Link>
      ))}

      {journalEntries.length === 0 && (
        <div className="text-center py-10 text-gray-400 text-base">
          No entries yet. Check back soon.
        </div>
      )}
    </Column>
  );
};

export default JournalList;
