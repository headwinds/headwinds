import { JournalEntry } from "../../journal-data";
import StoryContent from "./sales_agents.mdx";

const salesEntry: JournalEntry = {
  id: "ai-agent-sales-team",
  slug: "ai-agent-sales-team",
  title: "We replaced our sales team with 20 AI agents—here's what happened",
  date: "2026-04-01",
  summary:
    "Jason Lemkin on SaaStr explores what happens when you replace an entire sales team with AI agents. My hot take: what if we could dial down AI to work more human-like hours?",
  content: <StoryContent />,
  podcastUrl:
    "https://pca.st/episode/8b964ea9-8675-4178-8306-a13f9fde5c3f",
  podcastSource: "SaaStr - Jason Lemkin",
  tags: ["AI", "sales", "automation", "hot-take"],
};

export default salesEntry;
