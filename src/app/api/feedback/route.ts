import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendFeedbackConfirmation, sendFeedbackNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, relationship, rating, message, recaptchaToken } = body as Record<string, unknown>;

  const isHuman = await verifyRecaptcha(String(recaptchaToken ?? ""), "feedback");
  if (!isHuman) {
    return NextResponse.json({ error: "reCAPTCHA verification failed. Please try again." }, { status: 400 });
  }

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
        relationship: (relationship ? String(relationship) : undefined) as
          | "client" | "family" | "friend" | "other" | undefined,
        rating: safeRating,
        message: String(message),
      },
    });

    const { docs: adminUsers } = await payload.find({
      collection: "users",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      where: { role: { equals: "administrator" } } as any,
      limit: 100,
      depth: 0,
      overrideAccess: true,
    });
    const adminEmails = adminUsers.map((u) => (u as { email: string }).email).filter(Boolean);

    const emailStr = email ? String(email) : undefined;
    const nameStr  = name  ? String(name)  : undefined;

    await Promise.allSettled([
      sendFeedbackNotification({
        to:           adminEmails,
        name:         nameStr,
        relationship: relationship ? String(relationship) : undefined,
        rating:       safeRating,
        message:      String(message),
      }),
      emailStr
        ? sendFeedbackConfirmation({ email: emailStr, name: nameStr })
        : Promise.resolve(),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("feedback submission failed", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
