export interface HermesDailyTelemetry {
  day: string;
  sessions: number;
  messages: number;
  toolCalls: number;
  tokens: number;
  modelsUsed: number;
}

export interface HermesMemoryEvent {
  day: string;
  memoryUpdated: boolean;
  memoryLocked: boolean;
}

export interface HermesGrowthDay {
  day: string;
  sessions: number;
  messages: number;
  toolCalls: number;
  tokens: number;
  modelsUsed: number;
  memoryLocked: boolean;
  memoryUpdated: boolean;
}

export type HermesGrowthPoint = {
  day: string;
  cumulativeSessions: number;
  cumulativeMessages: number;
  cumulativeToolCalls: number;
  cumulativeTokens: number;
  memoriesCreated: number;
  customSkillsAdded: boolean;
};

export const telemetry: HermesDailyTelemetry[] = [
  { day: "2026-06-18", sessions: 1, messages: 223, toolCalls: 78, tokens: 1672866, modelsUsed: 1 },
  { day: "2026-06-20", sessions: 6, messages: 1057, toolCalls: 413, tokens: 2651205, modelsUsed: 1 },
  { day: "2026-06-22", sessions: 1, messages: 15, toolCalls: 5, tokens: 120183, modelsUsed: 1 },
];

export const memoryEvents: HermesMemoryEvent[] = [
  { day: "2026-06-18", memoryUpdated: false, memoryLocked: true },
  { day: "2026-06-20", memoryUpdated: true, memoryLocked: false },
  { day: "2026-06-22", memoryUpdated: false, memoryLocked: false },
];

export const customSkillEvents: Record<string, boolean> = {
  "2026-06-20": true,
  "2026-06-22": true,
};

export const memoryFileEvents: Record<string, number> = {
  "2026-06-18": 1,
  "2026-06-20": 1,
};

export const modelUsageByDay: Record<string, string> = {
  "2026-06-18": "stepfun/step-3.7-flash:free",
  "2026-06-20": "stepfun/step-3.7-flash:free",
  "2026-06-22": "stepfun/step-3.7-flash:free",
};

export const growth: HermesGrowthDay[] = telemetry.map((t) => ({
  ...t,
  memoryLocked: memoryEvents.some((e) => e.day === t.day && e.memoryLocked),
  memoryUpdated: memoryEvents.some((e) => e.day === t.day && e.memoryUpdated),
}));

export const cumulativeGrowth: HermesGrowthPoint[] = growth.reduce<HermesGrowthPoint[]>((acc, day) => {
  const prev = acc[acc.length - 1] ?? {
    cumulativeSessions: 0,
    cumulativeMessages: 0,
    cumulativeToolCalls: 0,
    cumulativeTokens: 0,
    memoriesCreated: 0,
    customSkillsAdded: false,
  };
  const memoriesForDay = memoryFileEvents[day.day] ?? 0;
  const customSkillAdded = customSkillEvents[day.day] ?? false;
  acc.push({
    day: day.day,
    cumulativeSessions: prev.cumulativeSessions + day.sessions,
    cumulativeMessages: prev.cumulativeMessages + day.messages,
    cumulativeToolCalls: prev.cumulativeToolCalls + day.toolCalls,
    cumulativeTokens: prev.cumulativeTokens + day.tokens,
    memoriesCreated: prev.memoriesCreated + memoriesForDay,
    customSkillsAdded: prev.customSkillsAdded || customSkillAdded,
  });
  return acc;
}, []);

export const series = {
  sessions: cumulativeGrowth.map((p) => ({ x: p.day, y: p.cumulativeSessions })),
  messages: cumulativeGrowth.map((p) => ({ x: p.day, y: p.cumulativeMessages })),
  toolCalls: cumulativeGrowth.map((p) => ({ x: p.day, y: p.cumulativeToolCalls })),
  tokens: cumulativeGrowth.map((p) => ({ x: p.day, y: p.cumulativeTokens })),
};
