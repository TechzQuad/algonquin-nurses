import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { sendReferralConfirmation, sendReferralNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { referrerName, referrerPhone, referrerEmail, clientName, clientPhone, service, notes } =
    body as Record<string, unknown>;

  if (!referrerName || !referrerPhone || !clientName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "referrals",
      data: {
        referrerName: String(referrerName),
        referrerPhone: String(referrerPhone),
        referrerEmail: referrerEmail ? String(referrerEmail) : undefined,
        clientName: String(clientName),
        clientPhone: clientPhone ? String(clientPhone) : undefined,
        service: (service ? String(service) : undefined) as
          | "private-duty" | "medicaid" | "cds" | "hcy" | "veterans" | "other" | undefined,
        notes: notes ? String(notes) : undefined,
      },
    });

    await Promise.all([
      sendReferralConfirmation({
        referrerEmail: referrerEmail ? String(referrerEmail) : undefined,
        referrerName: String(referrerName),
        referrerPhone: String(referrerPhone),
        clientName: String(clientName),
        clientPhone: clientPhone ? String(clientPhone) : undefined,
        service: service ? String(service) : undefined,
        notes: notes ? String(notes) : undefined,
      }),
      sendReferralNotification({
        referrerName: String(referrerName),
        referrerPhone: String(referrerPhone),
        referrerEmail: referrerEmail ? String(referrerEmail) : undefined,
        clientName: String(clientName),
        clientPhone: clientPhone ? String(clientPhone) : undefined,
        service: service ? String(service) : undefined,
        notes: notes ? String(notes) : undefined,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("referral submission failed", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
