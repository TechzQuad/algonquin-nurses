import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, relationship, rating, message } = body as Record<string, unknown>;

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const ratingNum = typeof rating === "number" ? rating : Number(rating);
  const safeRating = Number.isFinite(ratingNum) && ratingNum >= 0 && ratingNum <= 5
    ? ratingNum
    : undefined;

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "feedback",
      data: {
        name: name ? String(name) : undefined,
        relationship: relationship ? String(relationship) : undefined,
        rating: safeRating,
        message: String(message),
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("feedback submission failed", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
