import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { Resend } from "resend";

export const runtime = "nodejs";

// TEMPORARY — delete this route after confirming email works
export async function GET() {
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!resendKey) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set" }, { status: 500 });
  }

  // Find admin users
  const payload = await getPayloadClient();
  const { docs: adminUsers } = await payload.find({
    collection: "users",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: { role: { equals: "administrator" } } as any,
    limit: 100,
    depth: 0,
    overrideAccess: true,
  });
  const adminEmails = adminUsers.map((u) => (u as { email: string }).email).filter(Boolean);

  // Attempt send
  const resend = new Resend(resendKey);
  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: adminEmails.length > 0 ? adminEmails : ["delivered@resend.dev"],
    subject: "Test Email — Algonquin Nurses",
    html: "<p>This is a test email from the Algonquin Nurses website. If you received this, email notifications are working correctly.</p>",
  });

  return NextResponse.json({
    from: fromEmail,
    adminEmails,
    resendResponse: data ?? null,
    resendError: error ?? null,
  });
}
