import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;

function normalizeCredentials(credentials: any) {
  if (!credentials || typeof credentials !== "object") return null;

  const privateKey = credentials.private_key;
  const normalized = {
    type: "service_account",
    token_uri: "https://oauth2.googleapis.com/token",
    ...credentials,
  };

  if (typeof privateKey === "string") {
    return {
      ...normalized,
      private_key: privateKey.replace(/\\n/g, "\n"),
    };
  }

  return normalized;
}

function parseCredentialsFromEnv() {
  const credJson = process.env.GA4_SERVICE_ACCOUNT_JSON;
  const clientEmail = process.env.GA4_CLIENT_EMAIL;
  const privateKey = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (credJson) {
    try {
      return normalizeCredentials(JSON.parse(credJson));
    } catch {
      try {
        // Supports base64-encoded JSON for env-safe transport.
        const decoded = Buffer.from(credJson, "base64").toString("utf8");
        return normalizeCredentials(JSON.parse(decoded));
      } catch {
        return null;
      }
    }
  }

  if (clientEmail && privateKey) {
    return {
      client_email: clientEmail,
      private_key: privateKey,
    };
  }

  return null;
}

function getClient(): BetaAnalyticsDataClient | null {
  if (!PROPERTY_ID) return null;
  const credentials = parseCredentialsFromEnv();
  if (!credentials) return null;
  return new BetaAnalyticsDataClient({ credentials });
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
