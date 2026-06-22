# webific-time-series-charting

Generate time series charts from timestamped data, with optional analysis.

## Inputs

Provide one of:

- A list of objects with `timestamp` and `value` fields
- A CSV file path
- A path to a SQLite database + a SELECT query returning time/value columns

## Output

- A chart image file
- A short text assessment of trends, spikes, and anomalies

## Invocation

Use the `webific-time-series-charting` skill. Chart renderer is matplotlib if available; if matplotlib is not available at describe renderer and suggest installing it.
EOF
cat /tmp/hermes-time-series-charting-skill/webific-time-series-charting-skill.md

To summarize where things stand: I've already pulled the real Hermes data from your state.db — your install was Jun 11, you ran  
 your first session on Jun 18, and by today (Jun 20) you have 7 sessions, 1,212 messages, 459 tool calls, ~4M tokens processed,  
 with skills and memory entries growing over that period.

The data is pulled directly from your Hermes state.db:

- Jun 18 — 1 session, 223 messages, 78 tool calls, 1.67M tokens
- Jun 20 — 6 sessions, 1,057 messages, 413 tool calls, 2.65M tokens
- Jun 22 — 1 session, 15 messages, 5 tool calls, 0.12M tokens

  What’s exported:

  - telemetry — daily raw metrics (sessions, messages, toolCalls,
    tokens, modelsUsed)
  - growth — same rows, plus flags for when memory was locked/updated
  - cumulativeGrowth — running totals across the timeline, plus
    cumulative memoriesCreated and customSkillsAdded
  - series — {x: day, y: value} arrays ready for a chart library
    (sessions, messages, toolCalls, tokens)

  For a React component, a minimal pattern would be:

  ts
  import { series } from './hermes_growth_data';
  import { LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer } from 'recharts';

  export default function HermesGrowth() {
  const data = series.tokens.map((p, i) => ({
  day: p.x,
  tokens: p.y,
  messages: series.messages[i].y,
  toolCalls: series.toolCalls[i].y,
  }));

      return (
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="messages" stroke="#8884d8" />
            <Line type="monotone" dataKey="toolCalls" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      );

  }
