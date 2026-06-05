import { NextRequest, NextResponse } from "next/server";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "";
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

  if (!UNSPLASH_ACCESS_KEY) {
    return NextResponse.json(
      { error: "Unsplash API key not configured" },
      { status: 503 }
    );
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
