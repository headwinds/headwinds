import { NextRequest, NextResponse } from "next/server";

const SCOUT_MAP_URL = process.env.SCOUT_MAP_URL || "http://localhost:5007";

type CacheEntry = {
  status: "queued" | "running" | "completed";
  taskId?: string;
  imageUrl?: string;
  updatedAt: number;
};

type PosterRequest = {
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  name_label?: string;
  theme?: string;
  distance?: number;
  width?: number;
  height?: number;
  network_type?: string;
  minimal?: boolean;
  country_label?: string;
};

const DEFAULT_REQUEST: Required<Pick<PosterRequest, "city" | "country" | "latitude" | "longitude" | "name_label" | "theme" | "distance" | "width" | "height" | "network_type" | "minimal" | "country_label">> = {
  city: "Toronto",
  country: "Canada",
  latitude: 43.6496935,
  longitude: -79.4989025,
  name_label: "Old Mill Bridge",
  theme: "headwinds_humber",
  distance: 2600,
  width: 18,
  height: 24,
  network_type: "all",
  minimal: false,
  country_label: "CANADA",
};

const REQUEST_TTL_MS = 20 * 60 * 1000;
const requestCache = new Map<string, CacheEntry>();

function requestKey(request: PosterRequest) {
  return JSON.stringify({ ...DEFAULT_REQUEST, ...request });
}

function pruneCache(now: number) {
  requestCache.forEach((entry, key) => {
    if (now - entry.updatedAt > REQUEST_TTL_MS) {
      requestCache.delete(key);
    }
  });
}

async function fetchStatus(taskId: string) {
  const response = await fetch(`${SCOUT_MAP_URL}/api/status/${taskId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`scout-map status request failed with ${response.status}`);
  }

  const data = await response.json();
  const downloadUrl = data?.download_url ? `${SCOUT_MAP_URL}${data.download_url}` : null;

  return {
    task_id: taskId,
    status: data?.status || "unknown",
    progress: data?.progress || null,
    error: data?.error || null,
    imageUrl: data?.status === "completed" ? downloadUrl : null,
  };
}

async function fetchLatestPoster() {
  const response = await fetch(`${SCOUT_MAP_URL}/api/posters?limit=10`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`scout-map latest posters request failed with ${response.status}`);
  }

  const data = await response.json();
  const posters = Array.isArray(data?.posters) ? data.posters : [];

  if (posters.length === 0) {
    return {
      status: "idle",
      imageUrl: null,
      progress: "No generated poster available yet.",
    };
  }

  const latest = posters[0];
  const downloadPath = latest?.download_url;
  const imageUrl = typeof downloadPath === "string" ? `${SCOUT_MAP_URL}${downloadPath}` : null;

  return {
    status: imageUrl ? "completed" : "idle",
    imageUrl,
    progress: imageUrl ? "Loaded latest generated poster." : "No generated poster available yet.",
    task_id: null,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as PosterRequest;
    const mergedRequest = { ...DEFAULT_REQUEST, ...body };
    const now = Date.now();

    pruneCache(now);

    const key = requestKey(body);
    const existing = requestCache.get(key);

    if (existing?.status === "completed" && existing.imageUrl) {
      return NextResponse.json({
        status: "completed",
        task_id: existing.taskId || null,
        imageUrl: existing.imageUrl,
        message: "Reusing generated poster",
      });
    }

    if ((existing?.status === "queued" || existing?.status === "running") && existing.taskId) {
      return NextResponse.json({
        status: existing.status,
        task_id: existing.taskId,
        message: "Reusing in-progress poster task",
      });
    }

    const response = await fetch(`${SCOUT_MAP_URL}/api/poster/single`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mergedRequest),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json(
        { error: `scout-map request failed with ${response.status}`, detail },
        { status: 502 }
      );
    }

    const data = await response.json();

    requestCache.set(key, {
      status: data.status === "queued" ? "queued" : "running",
      taskId: data.task_id,
      updatedAt: now,
    });

    return NextResponse.json({
      task_id: data.task_id,
      status: data.status,
      message: data.message,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function GET(request: NextRequest) {
  const taskId = request.nextUrl.searchParams.get("task_id");

  if (!taskId) {
    try {
      const latest = await fetchLatestPoster();
      return NextResponse.json(latest);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json({ error: message }, { status: 503 });
    }
  }

  try {
    const status = await fetchStatus(taskId);

    const now = Date.now();
    requestCache.forEach((entry, key) => {
      if (entry.taskId === taskId) {
        if (status.status === "completed" && status.imageUrl) {
          requestCache.set(key, {
            status: "completed",
            taskId,
            imageUrl: status.imageUrl,
            updatedAt: now,
          });
        } else if (status.status === "queued" || status.status === "running") {
          requestCache.set(key, {
            status: status.status,
            taskId,
            updatedAt: now,
          });
        }
      }
    });

    return NextResponse.json(status);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}