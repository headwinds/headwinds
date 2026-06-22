import { NextRequest, NextResponse } from "next/server";

const SCOUT_API_URL =
  process.env.SCOUT_API_URL ||
  process.env.SCOUT_API_URL_PROD ||
  (process.env.NODE_ENV === "production"
    ? "https://scout-222670816692.northamerica-northeast1.run.app"
    : "http://localhost:8000");

type BudgetReachedPayload = {
  total: number;
  budget: number;
  itemCount: number;
  items: Array<{ id: string; name: string; category: string; price: number }>;
};

function validatePayload(body: unknown):
  | { valid: true; payload: BudgetReachedPayload }
  | { valid: false; message: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, message: "Invalid request body" };
  }

  const payload = body as BudgetReachedPayload;

  if (
    typeof payload.total !== "number" ||
    typeof payload.budget !== "number" ||
    typeof payload.itemCount !== "number" ||
    !Array.isArray(payload.items)
  ) {
    return { valid: false, message: "Missing budget event fields" };
  }

  if (payload.total < payload.budget) {
    return { valid: false, message: "Budget has not been reached" };
  }

  return { valid: true, payload };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = validatePayload(body);

    if (!validation.valid) {
      return NextResponse.json(
        { status: 400, message: validation.message },
        { status: 400 }
      );
    }

    const scoutAuthToken = process.env.SCOUT_AUTH_TOKEN || "";

    if (!scoutAuthToken) {
      console.log("Wishlist budget reached without Scout forwarding", {
        ...validation.payload,
        submittedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        status: 202,
        message: "Budget event captured; Scout forwarding is not configured",
        scoutSubmitted: false,
      });
    }

    const scoutResponse = await fetch(`${SCOUT_API_URL}/api/track/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${scoutAuthToken}`,
      },
      body: JSON.stringify({
        label: "wishlist_budget_reached",
        device: request.headers.get("user-agent") || "unknown",
        app: "headwinds",
        who: "wishlist_guest",
        description: "A Headwinds wishlist guest filled a virtual cart to $1,000.",
        json: validation.payload,
      }),
    });

    const scoutData = await scoutResponse.json().catch(() => null);

    if (!scoutResponse.ok || scoutData?.status !== 200) {
      console.error("Scout wishlist budget event failed", {
        status: scoutResponse.status,
        data: scoutData,
      });

      return NextResponse.json(
        { status: 502, message: "Scout event submission failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "success",
      scoutSubmitted: true,
      scout: scoutData,
    });
  } catch (error) {
    console.error("Wishlist budget event route error", error);
    return NextResponse.json(
      { status: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
