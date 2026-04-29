import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;

function getClient(): BetaAnalyticsDataClient | null {
  const credJson = process.env.GA4_SERVICE_ACCOUNT_JSON;
  if (!credJson || !PROPERTY_ID) return null;

  try {
    const credentials = JSON.parse(credJson);
    return new BetaAnalyticsDataClient({ credentials });
  } catch {
    return null;
  }
}

let cache: { data: unknown; ts: number } | null = null;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function GET() {
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  const client = getClient();
  if (!client) {
    return NextResponse.json(
      { error: "GA4 credentials not configured", points: [] },
      { status: 200 }
    );
  }

  try {
    const [response] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: "365daysAgo", endDate: "today" }],
      dimensions: [{ name: "yearMonth" }],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
        { name: "screenPageViews" },
      ],
      orderBys: [{ dimension: { dimensionName: "yearMonth" } }],
    });

    const points = (response.rows ?? []).map((row) => {
      const ym = row.dimensionValues?.[0]?.value ?? "";
      const date = `${ym.slice(0, 4)}-${ym.slice(4, 6)}`;
      return {
        date,
        sessions: Number(row.metricValues?.[0]?.value ?? 0),
        users: Number(row.metricValues?.[1]?.value ?? 0),
        pageviews: Number(row.metricValues?.[2]?.value ?? 0),
      };
    });

    const result = { points };
    cache = { data: result, ts: Date.now() };
    return NextResponse.json(result);
  } catch (err) {
    console.error("GA4 API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch analytics", points: [] },
      { status: 500 }
    );
  }
}
