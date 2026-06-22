import React from "react";
import salesAgents from "./articles/sales-agents/sales-entry";
import hermesHealer from "./articles/hermes-healer/hermes-healer";

export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string | React.ReactNode;
  podcastUrl?: string;
  podcastSource?: string;
  tags: string[];
}

export const journalEntries: JournalEntry[] = [salesAgents, hermesHealer];

export function getEntryBySlug(slug: string): JournalEntry | undefined {
  return journalEntries.find((entry) => entry.slug === slug);
}
