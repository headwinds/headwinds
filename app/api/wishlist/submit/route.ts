import { NextRequest, NextResponse } from "next/server";

const SCOUT_API_URL =
  process.env.SCOUT_API_URL ||
  process.env.SCOUT_API_URL_PROD ||
  (process.env.NODE_ENV === "production"
    ? "https://scout-222670816692.northamerica-northeast1.run.app"
    : "http://localhost:8000");

type WishlistCartSubmissionPayload = {
  total: number;
  budget: number;
  itemCount: number;
  remaining: number;
  items: Array<{ id: string; name: string; category: string; price: number }>;
};

function validatePayload(body: unknown):
  | { valid: true; payload: WishlistCartSubmissionPayload }
  | { valid: false; message: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, message: "Invalid request body" };
  }

  const payload = body as WishlistCartSubmissionPayload;

  if (
    typeof payload.total !== "number" ||
    typeof payload.budget !== "number" ||
    typeof payload.itemCount !== "number" ||
    typeof payload.remaining !== "number" ||
    !Array.isArray(payload.items)
  ) {
    return { valid: false, message: "Missing cart submission fields" };
  }

  if (payload.itemCount < 1 || payload.items.length < 1) {
    return { valid: false, message: "Cart is empty" };
  }

  if (payload.total > payload.budget) {
    return { valid: false, message: "Cart is over budget" };
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

    const payload = {
      ...validation.payload,
      submittedAt: new Date().toISOString(),
    };
    const scoutAuthToken = process.env.SCOUT_AUTH_TOKEN || "";

    if (!scoutAuthToken) {
      console.log("Wishlist cart submitted without Scout forwarding", payload);

      return NextResponse.json({
        status: 202,
        message: "Cart submission captured; Scout forwarding is not configured",
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
        label: "wishlist_cart_submitted",
        device: request.headers.get("user-agent") || "unknown",
        app: "headwinds",
        who: "wishlist_guest",
        description: "A Headwinds wishlist guest submitted their virtual studio cart.",
        json: payload,
      }),
    });

    const scoutData = await scoutResponse.json().catch(() => null);

    if (!scoutResponse.ok || scoutData?.status !== 200) {
      console.error("Scout wishlist cart submission failed", {
        status: scoutResponse.status,
        data: scoutData,
      });

      return NextResponse.json(
        { status: 502, message: "Scout cart submission failed" },
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
    console.error("Wishlist cart submission route error", error);
    return NextResponse.json(
      { status: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
