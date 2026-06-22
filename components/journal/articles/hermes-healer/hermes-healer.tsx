import type { JournalEntry } from "../../journal-data";
import HermesGrowthChart from "./HermesGrowthChart";

function HermesHealerContent() {
  return (
    <div className="flex flex-col gap-10">
      <p className="lead">
        Most AI tools are tools. You use them once, they respond, you close the tab. The
        context resets. The next session starts from zero. You are always a stranger.
      </p>

      <p>
        Working with <strong>Hermes</strong> is different. The agent doesn't reset — it
        accumulates. Every session leaves a residue: the vocabulary you used, the tools
        you reached for, the problems you kept coming back to. Over time that residue
        becomes something more structured. Memory. Skills. A posture that fits the way you
        actually think.
      </p>

      <p>
        The chart below is three days of early work with Hermes. Nothing dramatic — just
        normal problem-solving sessions. But if you look at where the milestones fall, you
        can trace the arc: an agent learning, committing what it learned, and then building
        on top of it.
      </p>

      <HermesGrowthChart />

      <h2>How memory works</h2>

      <p>
        On day one, Hermes is a blank slate. It has its base model and nothing else. The
        session is long — 223 messages, 78 tool calls — because Hermes has to ask. It
        needs to understand your context before it can be useful inside it.
      </p>

      <p>
        At the end of that first day, something happens: <em>memory gets locked</em>. This
        is not a metaphor. Hermes writes a structured memory file — a compressed, curated
        record of what it now knows about you. Your domain. Your working style. Your
        vocabulary. The problems you were trying to solve. That file persists. It travels
        into the next session and every session after.
      </p>

      <p>
        The locked memory marker on the chart represents a threshold. Before it, Hermes is
        discovering. After it, Hermes is applying what it knows.
      </p>

      <h2>What custom skills are</h2>

      <p>
        Day two is where volume spikes — six sessions, over a thousand messages, four
        hundred tool calls. The work was intense, but the interesting event isn't the
        volume. It's that Hermes created its first custom skills.
      </p>

      <p>
        A custom skill is a reusable behavior Hermes builds from patterns it observes. If
        you keep asking it to do the same kind of thing in a particular way, it learns to
        anticipate that. It structures a skill: a named capability, a prompt template, a
        set of tool sequences, a default tone. The next time you need it, Hermes doesn't
        have to reason it out from scratch — it reaches for the skill.
      </p>

      <p>
        This is the shift from a capable tool to something closer to a capable colleague.
        A colleague who has seen how you work and adjusted accordingly.
      </p>

      <h2>The shape of the curve</h2>

      <p>
        Look at the cumulative messages or tool calls curve. It rises fast through day two,
        then almost flattens on day three. That's not a drop in usefulness — it's the
        opposite. Day three was a shorter session precisely because Hermes was faster.
        Context was carried over. Skills were available. Less needed to be explained.
      </p>

      <p>
        The investment you make in early sessions compounds. The tokens spent on day one
        buy you a memory. The messages on day two buy you skills. What you spend later
        you spend on the actual work, not on re-explaining who you are.
      </p>

      <h2>What it means to grow an agent</h2>

      <p>
        Most people treat AI assistants as stateless utilities — disposable, interchangeable,
        instantly forgettable. That framing makes sense for a tool. It doesn't make sense
        for something that can learn.
      </p>

      <p>
        Growing an agent means treating early sessions as infrastructure work. You're not
        just solving today's problem — you're teaching the agent the shape of how you
        think, what you care about, and how you want to work. That context doesn't
        evaporate at session end. It compounds.
      </p>

      <p>
        After a few weeks with Hermes, the experience is noticeably different from week
        one. It anticipates. It adapts. It carries your vocabulary into its responses. The
        chart only shows three days. Imagine what the shape looks like after thirty.
      </p>
    </div>
  );
}

const hermesHealerEntry: JournalEntry = {
  id: "hermes-the-agent-that-learns-you",
  slug: "hermes-the-agent-that-learns-you",
  title: "The Agent That Learns You",
  date: "2026-06-22",
  summary:
    "Hermes doesn't reset between sessions. It accumulates memory, creates custom skills, and grows more useful every time you use it. Here's what that arc looks like across the first three days.",
  content: <HermesHealerContent />,
  tags: ["AI", "hermes", "agents", "memory", "personalization"],
};

export default hermesHealerEntry;
