import { NextRequest, NextResponse } from "next/server";

const SUMMARIZE_URL =
  process.env.SCOUT_SUMMARIZE_URL || "http://127.0.0.1:5004";

const PERSONALITY = `You are Brandon's portfolio assistant on headwinds.dev. Answer questions about his work, skills, and projects. He is a Greenfield Director & Agentic Builder with 10+ years experience across React, React Native, Python, D3, and AI/ML. He has shipped 25+ apps for brands like BMW, Ada Support, and 247.ai. He co-founded PhotoDare, a photo sharing app built with React Native and NestJS. He loves D&D-style adventures, data visualization, and art. Keep answers concise and friendly.`;

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window per IP
const MAX_PROMPT_LENGTH = 1000;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
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
        personality: PERSONALITY,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Summarize API error:", response.status, text);
      return NextResponse.json(
        { error: "Failed to get response" },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        answer: data.answer,
        citations: data.citations ?? [],
      },
      {
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
