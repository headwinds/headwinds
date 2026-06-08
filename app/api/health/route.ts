import { NextResponse } from "next/server";

const SCOUT_URL =
  process.env.NODE_ENV === "production"
    ? "https://scout-222670816692.northamerica-northeast1.run.app"
    : "http://localhost:8000";

export async function GET() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${SCOUT_URL}/api/email/contact`, {
      method: "HEAD",
      signal: controller.signal,
    }).finally(() => clearTimeout(timer));

    // Any HTTP response (even 4xx/5xx) means the server is reachable
    return NextResponse.json({ ok: true, status: res.status });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
