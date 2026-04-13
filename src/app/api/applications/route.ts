import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { firstName, lastName, email, phone, position, experience } =
    body as Record<string, unknown>;

  if (!firstName || !lastName || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "applications",
      data: {
        firstName: String(firstName),
        lastName: String(lastName),
        email: String(email),
        phone: String(phone),
        position: (position ? String(position) : undefined) as
          | "cna" | "hha" | "rn" | "lpn" | "other" | undefined,
        experience: experience ? String(experience) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("application submission failed", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
