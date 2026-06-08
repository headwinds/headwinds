import { NextRequest, NextResponse } from "next/server";

const SUMMARIZE_URL =
  process.env.SCOUT_SUMMARIZE_URL || "http://127.0.0.1:5004";

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

    const response = await fetch(`${SUMMARIZE_URL}/api/perplexity/chat`, {
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
      return NextResponse.json(
        {
          answer: FALLBACK_ANSWER,
          citations: [],
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
    return NextResponse.json(
      {
        answer: FALLBACK_ANSWER,
        citations: [],
      },
      { status: 200 }
    );
  }
}
