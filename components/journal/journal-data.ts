export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  podcastUrl?: string;
  podcastSource?: string;
  tags: string[];
}

export const journalEntries: JournalEntry[] = [
  {
    id: "ai-agent-sales-team",
    slug: "ai-agent-sales-team",
    title: "We replaced our sales team with 20 AI agents—here's what happened",
    date: "2026-04-01",
    summary:
      "Jason Lemkin on SaaStr explores what happens when you replace an entire sales team with AI agents. My hot take: what if we could dial down AI to work more human-like hours?",
    content: `## My Take

What if we could dial down AI to work more human-like or even superhuman hours like 80-100 hrs in a week instead of 24/7 (aka 168 hrs/week)? Then, we can always keep a human in the loop.

I'm looking for ways to create a more active AI experience where it isn't waiting for your prompt. If a human editor (or art director!) was standing over your shoulder, they would actively critique the work without being asked.

The author may not realize what is wrong so how could they ask for guidance if they don't see the flaw. A human would review the doc and make proactive recommendations; an AI could do likewise constantly sweeping the doc within an interval or perhaps limited to a few times as we need to be wary of token expenditure.

## The Podcast

Jason Lemkin from SaaStr shares what happened when they replaced their sales team with 20 AI agents. The results were surprising — not because AI outperformed humans, but because the hybrid approach revealed how much of sales is still fundamentally about human connection and timing.

## Key Takeaway

The future isn't about replacing humans with AI or vice versa — it's about finding the right cadence. An AI that works at human pace but with superhuman consistency might be the sweet spot.`,
    podcastUrl:
      "https://pca.st/episode/8b964ea9-8675-4178-8306-a13f9fde5c3f",
    podcastSource: "SaaStr - Jason Lemkin",
    tags: ["AI", "sales", "automation", "hot-take"],
  },
];

export function getEntryBySlug(slug: string): JournalEntry | undefined {
  return journalEntries.find((entry) => entry.slug === slug);
}
