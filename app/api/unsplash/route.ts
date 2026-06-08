import { NextRequest, NextResponse } from "next/server";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "";
const SCOUT_API_URL =
  process.env.SCOUT_API_URL ||
  process.env.SCOUT_API_URL_PROD ||
  (process.env.NODE_ENV === "production"
    ? "https://scout-222670816692.northamerica-northeast1.run.app"
    : "http://localhost:8000");

const BRAND_QUERY_HINTS: Record<string, string> = {
  nintendo: "nintendo gaming console",
  bmw: "bmw car dashboard",
  microsoft: "microsoft office workspace",
  ada: "customer support team software",
  "247": "ai chatbot interface",
  "247.ai": "ai chatbot interface",
  labatt: "canadian brewery",
  bacardi: "cocktail bar",
  mitsubishi: "mitsubishi lancer car",
  totaldrama: "animation character design",
};

function inferCategory(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("nintendo") || q.includes("gaming") || q.includes("game")) {
    return "gaming";
  }
  if (q.includes("music") || q.includes("dj") || q.includes("band")) {
    return "music";
  }
  if (q.includes("bmw") || q.includes("mitsubishi") || q.includes("microsoft")) {
    return "technology";
  }
  return "design";
}

function getSearchQuery(query: string): string {
  const normalized = query.toLowerCase();
  for (const key of Object.keys(BRAND_QUERY_HINTS)) {
    if (normalized.includes(key)) return BRAND_QUERY_HINTS[key];
  }
  return query;
}

function getFallbackImageUrl(query: string): string {
  return `https://source.unsplash.com/1600x900/?${encodeURIComponent(query)}`;
}
const cache = new Map<string, { url: string; expires: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "query parameter is required" },
      { status: 400 }
    );
  }

  const key = query.toLowerCase();
  const category = inferCategory(query);
  const searchQuery = getSearchQuery(query);
  const fallbackUrl = getFallbackImageUrl(searchQuery);
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expires) {
    return NextResponse.json({ url: cached.url });
  }

  // Prefer Scout's Unsplash service so the key can be managed in one backend.
  try {
    const scoutRes = await fetch(`${SCOUT_API_URL}/api/unsplash`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: searchQuery, category }),
    });

    if (scoutRes.ok) {
      const scoutData = await scoutRes.json();
      const scoutUrl: string = scoutData?.data?.photo_url || "";
      if (scoutUrl) {
        cache.set(key, { url: scoutUrl, expires: Date.now() + CACHE_TTL_MS });
        return NextResponse.json({ url: scoutUrl });
      }
    }

    if (scoutRes.status === 404) {
      cache.set(key, { url: fallbackUrl, expires: Date.now() + CACHE_TTL_MS });
      return NextResponse.json({ url: fallbackUrl });
    }
  } catch {
    // Fall through to local direct Unsplash API path.
  }

  if (!UNSPLASH_ACCESS_KEY) {
    cache.set(key, { url: fallbackUrl, expires: Date.now() + CACHE_TTL_MS });
    return NextResponse.json({ url: fallbackUrl });
  }

  try {
    const params = new URLSearchParams({
      query,
      per_page: "1",
      orientation: "landscape",
    });

    const res = await fetch(
      `https://api.unsplash.com/search/photos?${params}`,
      {
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
      }
    );

    if (!res.ok) {
      console.error("Unsplash API error:", res.status);
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const imageUrl: string =
      data.results?.[0]?.urls?.regular || "";

    if (imageUrl) {
      cache.set(key, { url: imageUrl, expires: Date.now() + CACHE_TTL_MS });
    }

    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error("Unsplash route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
