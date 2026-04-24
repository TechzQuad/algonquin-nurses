import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { sendChatLeadConfirmation } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, phone, service } = body as Record<string, unknown>;

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "chat-leads",
      overrideAccess: true,
      data: {
        name: String(name),
        email: String(email),
        phone: String(phone),
        service: (service ? String(service) : undefined) as
          | "private-duty" | "medicaid" | "cds" | "hcy" | "veterans" | undefined,
      },
    });

    await sendChatLeadConfirmation({
      email: String(email),
      name: String(name),
      phone: String(phone),
      service: service ? String(service) : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("chat lead save failed", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
