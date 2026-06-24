import type { JournalEntry } from "../../journal-data";
import HermesHealerContent from "./hermes-healer.mdx";

const hermesHealerEntry: JournalEntry = {
  id: "hermes-the-agent-that-learns-you",
  slug: "hermes-the-agent-that-learns-you",
  title: "Hermes Agent helps you learn about you",
  date: "2026-06-22",
  summary:
    "Hermes doesn't reset between sessions. It accumulates memory, creates  custom skills, and grows more useful every time you use it. It can even learn about you while you sleep.",
  content: (
    <div className="flex flex-col">
      <HermesHealerContent />
    </div>
  ),
  tags: ["AI", "hermes", "agents", "memory", "personalization"],
};

export default hermesHealerEntry;
