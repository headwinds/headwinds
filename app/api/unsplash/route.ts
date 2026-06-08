import { NextRequest, NextResponse } from "next/server";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "";
const SCOUT_API_URL =
  process.env.SCOUT_API_URL ||
  process.env.SCOUT_API_URL_PROD ||
  (process.env.NODE_ENV === "production"
    ? "https://scout-222670816692.northamerica-northeast1.run.app"
    : "http://localhost:8000");
const FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1504198266287-1659872e6590?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
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
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expires) {
    return NextResponse.json({ url: cached.url });
  }

  // Prefer Scout's Unsplash service so the key can be managed in one backend.
  try {
    const scoutRes = await fetch(`${SCOUT_API_URL}/api/unsplash`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, category: "technology" }),
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
      cache.set(key, { url: FALLBACK_IMAGE_URL, expires: Date.now() + CACHE_TTL_MS });
      return NextResponse.json({ url: FALLBACK_IMAGE_URL });
    }
  } catch {
    // Fall through to local direct Unsplash API path.
  }

  if (!UNSPLASH_ACCESS_KEY) {
    cache.set(key, { url: FALLBACK_IMAGE_URL, expires: Date.now() + CACHE_TTL_MS });
    return NextResponse.json({ url: FALLBACK_IMAGE_URL });
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
