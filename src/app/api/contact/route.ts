import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { sendContactConfirmation, sendContactNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { firstName, lastName, email, phone, service, message } = body as Record<string, unknown>;

  if (!firstName || !lastName || !email || !phone || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "contact-submissions",
      data: {
        firstName: String(firstName),
        lastName: String(lastName),
        email: String(email),
        phone: String(phone),
        service: (service ? String(service) : undefined) as
          | "private-duty" | "medicaid" | "cds" | "hcy" | "veterans" | "other" | undefined,
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

    await Promise.all([
      sendContactConfirmation({
        email: String(email),
        firstName: String(firstName),
        lastName: String(lastName),
        phone: String(phone),
        service: service ? String(service) : undefined,
        message: String(message),
      }),
      sendContactNotification({
        to: adminEmails,
        firstName: String(firstName),
        lastName: String(lastName),
        email: String(email),
        phone: String(phone),
        service: service ? String(service) : undefined,
        message: String(message),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact submission failed", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
