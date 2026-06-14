import { NextRequest, NextResponse } from "next/server";

function getSummarizeUrl(): string {
  return (
    process.env.SCOUT_SUMMARIZE_URL ||
    process.env.SCOUT_SUMMARY_API_URL_PROD ||
    process.env.SCOUT_SUMMARIZE_API_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://scout-summary.vercel.app"
      : "http://127.0.0.1:5004")
  );
}

const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

async function callPerplexityDirect(prompt: string) {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(PERPLEXITY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "sonar-pro",
      messages: [
        { role: "system", content: BRANDON_SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  const answer = data?.choices?.[0]?.message?.content;
  if (typeof answer !== "string" || !answer.trim()) return null;

  return {
    answer,
    citations: data?.citations ?? [],
  };
}

const BRANDON_SYSTEM_PROMPT = `You are the AI assistant on Brandon Flowers' personal portfolio site headwinds.dev. You answer questions about Brandon specifically — the Toronto-based full-stack developer, NOT the musician.

## Who is Brandon Flowers

Brandon Flowers is a senior full-stack engineer and creative technologist based in Toronto, Canada with 10+ years of professional experience. He describes himself as a "Creative full-stack hybrid" and aspires to Staff Engineer level leadership.

## Career History (most recent first)

- **AXL Venture Studio** (Lead Full-stack Engineer, 2025–present) — building AI-powered multi-tenant platform monitoring apps for performance, errors, and AI usage
- **GoBolt** (2025) — sustainable last-mile logistics; data visualization, delivery tracking, carbon offset monitoring; React + distributed systems
- **Prenuvo** (2024) — full-body MRI startup; data visualization for AI-assisted radiology review
- **Validere** (2023) — carbon/methane measurement; led frontend for Carbon Hub (maps, charts, metric tiles, data tables); co-built their first React Native mobile app v3.0
- **Loblaws Digital** (2019–2023) — 4 years in eCommerce; React + GraphQL; Shoppers Drug Mart product detail page; Go/Python backend monitoring tools
- **247.ai** — NLP chatbot UI; Predictive Suggestions feature; decision tree data visualization; cut ML model dev time from 3 months to 1 week
- **Ada Support** — AI support platform UI
- **BMW** — car configurator UI; EV range data visualization
- **Bacardi, Labatt, Nintendo, Mitsubishi, Total Drama** — brand campaign UI work

## Skills & Technologies

- **Frontend**: React, React Native (Expo), Next.js, TypeScript, Redux Toolkit, D3.js, Mapbox, ReactFlow, Tailwind CSS
- **Backend**: Python (Flask), Node.js, Go, Java
- **Data**: D3.js, Sankey charts, time series, clustering, PostgreSQL, GraphQL
- **AI/ML**: Perplexity API, OpenAI, NLP pipelines, XState
- **Infrastructure**: Vercel, Google Cloud Run, Docker, RabbitMQ, Pusher

## Side Projects

- **Headwinds** (this site) — Next.js portfolio, cross-country component library, Python/Flask backends
- **Porthole** — personal RSS trend tracker across 50+ feeds; Chrome extension + web app; v0.9.44
- **Scout / SoloScout** — AI-assisted D&D-style adventure game; Flask + React Native + Perplexity + Neon Postgres
- **PhotoDare** (co-founder) — photo sharing iOS app on App Store; Expo/React Native + NestJS + PostgreSQL on Azure

## Education

- BA Honours English, University of Waterloo (1996–1999)
- Post-Grad New Media Design, Centennial College (2000)

## Personal

- Based in Toronto, Canada
- Naturalist — loves environmental conservation, salmon migration, whale populations
- Passionate about D&D-style adventures, fantasy, sci-fi, data visualization, and art

## Rules

- Answer using only the facts above; do not invent roles or projects
- Refer to Brandon in third person ("he", "Brandon")
- If asked about something not covered, say you don't have that detail and suggest visiting headwinds.dev
- Keep answers concise and friendly
- If asked about "Brandon Flowers the musician (The Killers)" clarify you are the assistant for Brandon Flowers the developer
`;

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window per IP
const MAX_PROMPT_LENGTH = 1000;

const FALLBACK_ANSWER =
  "I can help with Brandon's projects, skills, and work history. The live AI backend is temporarily unavailable, but you can still ask about React, React Native, Python, D3, AI/ML, and featured brand work like BMW, Ada, and 247.ai.";

type ChatBlock =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "metrics";
      title: string;
      metrics: { label: string; value: string; description?: string }[];
    }
  | {
      type: "cta";
      title: string;
      description: string;
      href: string;
      label: string;
    };

type BrandInsight = {
  keywords: string[];
  insight: string;
};

const BRAND_INSIGHTS: BrandInsight[] = [
  {
    keywords: ["bmw"],
    insight:
      "BMW: Brandon worked on car-configurator UI experiences and EV range data visualization, focusing on fast interaction design, clear tradeoff communication, and responsive React front-end architecture for high-traffic product exploration.",
  },
  {
    keywords: ["ada", "ada support"],
    insight:
      "Ada Support: Brandon contributed to AI support platform UI, improving clarity and usability in workflows where agents and automation need to move quickly between customer context and recommended actions.",
  },
  {
    keywords: ["247.ai", "247", "24/7"],
    insight:
      "247.ai: Brandon built NLP chatbot UI and predictive suggestions with decision-tree visualization, helping reduce ML model iteration time from about 3 months to roughly 1 week by tightening feedback loops between product and engineering.",
  },
  {
    keywords: ["validere"],
    insight:
      "Validere: Brandon led frontend delivery for Carbon Hub dashboards (maps, charts, metric tiles, and tables) and helped ship their first React Native app, emphasizing trustworthy climate-data UX at enterprise scale.",
  },
  {
    keywords: ["loblaws", "shoppers"],
    insight:
      "Loblaws Digital / Shoppers Drug Mart: Brandon spent 4 years building eCommerce flows with React and GraphQL, including high-visibility product detail experiences and backend monitoring tooling in Go/Python.",
  },
  {
    keywords: ["prenuvo"],
    insight:
      "Prenuvo: Brandon worked on data visualization for AI-assisted radiology review, prioritizing readability, confidence cues, and clinician-friendly interaction patterns.",
  },
  {
    keywords: ["gobolt"],
    insight:
      "GoBolt: Brandon built logistics-focused interfaces around delivery tracking and carbon metrics, combining React UI systems with distributed data flows to support operational decision-making.",
  },
  {
    keywords: ["bacardi", "labatt", "nintendo", "mitsubishi", "total drama"],
    insight:
      "Brand campaign work: Brandon delivered interactive campaign UI across major consumer brands, balancing visual storytelling with production reliability and cross-device performance.",
  },
];

const CLIMATE_KEYWORDS = [
  "climate",
  "climate change",
  "environment",
  "sustainability",
  "carbon",
  "emissions",
  "river",
  "humber",
  "salmon",
  "conservation",
  "eco",
  "green",
];

function buildClimateInsight(prompt: string): string {
  const normalized = prompt.toLowerCase();
  const isClimateQuestion = CLIMATE_KEYWORDS.some((keyword) =>
    normalized.includes(keyword)
  );

  if (!isClimateQuestion) {
    return FALLBACK_ANSWER;
  }

  return [
    "Brandon's climate-related work shows up in a few places:",
    "",
    "- **GoBolt**: built sustainability and logistics UI that helped surface carbon-offset and delivery-tracking information in a clearer way.",
    "- **Validere**: led frontend work on carbon and methane measurement dashboards, including maps, charts, metric tiles, and data tables.",
    "- **Humber River Rangers**: is building a community project around river cleanup, water testing, and climate action in Toronto.",
    "- **Personal focus**: he has a stated interest in environmental conservation, salmon migration, and using software to support better climate outcomes.",
  ].join("\n");
}

function buildClimateBlocks(): ChatBlock[] {
  return [
    {
      type: "metrics",
      title: "Climate-focused work",
      metrics: [
        {
          label: "GoBolt",
          value: "Sustainability UX",
          description: "Delivery and carbon-offset tracking surfaced more clearly.",
        },
        {
          label: "Validere",
          value: "Carbon dashboards",
          description: "Maps, charts, metric tiles, and data tables.",
        },
        {
          label: "Humber",
          value: "River stewardship",
          description: "Cleanup, water testing, and climate action in Toronto.",
        },
      ],
    },
    {
      type: "cta",
      title: "Want to get involved?",
      description:
        "Join the Humber River Rangers or share interest in future climate projects.",
      href: "/rangers",
      label: "Open Humber River Rangers",
    },
  ];
}

function buildLocalInsight(prompt: string): string {
  const normalized = prompt.toLowerCase();

  if (CLIMATE_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return buildClimateInsight(prompt);
  }

  const matches = BRAND_INSIGHTS.filter((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword))
  );

  if (matches.length === 0) {
    return FALLBACK_ANSWER;
  }

  return matches.map((m) => m.insight).join(" ");
}

function buildLocalResponse(prompt: string): { answer: string; blocks?: ChatBlock[] } {
  const normalized = prompt.toLowerCase();

  if (CLIMATE_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return {
      answer: buildClimateInsight(prompt),
      blocks: [
        {
          type: "text",
          content:
            "Brandon's climate-related work shows up across logistics, carbon measurement, and community stewardship.",
        },
        ...buildClimateBlocks(),
      ],
    };
  }

  return { answer: buildLocalInsight(prompt) };
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function cleanupExpiredEntries() {
  const now = Date.now();
  rateLimitMap.forEach((entry, key) => {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  });
}

setInterval(cleanupExpiredEntries, 60_000);

function isRateLimited(ip: string): { limited: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, remaining: RATE_LIMIT_MAX - 1 };
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return { limited: true, remaining: 0 };
  }

  return { limited: false, remaining: RATE_LIMIT_MAX - entry.count };
}

export async function POST(request: NextRequest) {
  let promptText = "";
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const { limited, remaining } = isRateLimited(ip);
    if (limited) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body = await request.json();
    const { prompt } = body as { prompt: string };
    promptText = prompt ?? "";

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { error: `Prompt too long (max ${MAX_PROMPT_LENGTH} characters)` },
        { status: 400 }
      );
    }

    const summarizeUrl = getSummarizeUrl();
    const response = await fetch(`${summarizeUrl}/api/perplexity/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        personality: "default",
        system_override: BRANDON_SYSTEM_PROMPT,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Summarize API error:", response.status, text);

      const direct = await callPerplexityDirect(promptText);
      if (direct) {
        return NextResponse.json(direct, {
          headers: { "X-RateLimit-Remaining": String(remaining) },
        });
      }

      const localResponse = buildLocalResponse(promptText);
      return NextResponse.json(
        {
          answer: localResponse.answer,
          citations: [],
          blocks: localResponse.blocks ?? [],
        },
        {
          headers: { "X-RateLimit-Remaining": String(remaining) },
        }
      );
    }

    const data = await response.json();
    const answer =
      (typeof data.answer === "string" && data.answer) ||
      (typeof data.response === "string" && data.response) ||
      FALLBACK_ANSWER;

    if (CLIMATE_KEYWORDS.some((keyword) => prompt.toLowerCase().includes(keyword))) {
      const localResponse = buildLocalResponse(prompt);
      return NextResponse.json(
        {
          answer: localResponse.answer,
          citations: data.citations ?? [],
          blocks: localResponse.blocks ?? [],
        },
        {
          headers: { "X-RateLimit-Remaining": String(remaining) },
        }
      );
    }

    return NextResponse.json(
      {
        answer,
        citations: data.citations ?? [],
      },
      {
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  } catch (err) {
    console.error("Chat API error:", err);

    try {
      const direct = await callPerplexityDirect(promptText);
      if (direct) {
        return NextResponse.json(direct);
      }
    } catch {
      // Fall through to local fallback.
    }

    return NextResponse.json(
      {
        answer: buildLocalInsight(promptText),
        citations: [],
      },
      { status: 200 }
    );
  }
}
