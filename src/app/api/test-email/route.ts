import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// TEMPORARY — delete this route after confirming email works
export async function GET() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST ?? "smtp.hostinger.com";
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);

  if (!smtpUser || !smtpPass) {
    return NextResponse.json({ error: "SMTP_USER or SMTP_PASS not set" }, { status: 500 });
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

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true,
    auth: { user: smtpUser, pass: smtpPass },
  });

  try {
    await transporter.sendMail({
      from: `Algonquin Nurses <${smtpUser}>`,
      to: adminEmails.length > 0 ? adminEmails.join(", ") : smtpUser,
      subject: "Test Email — Algonquin Nurses",
      html: "<p>This is a test email from the Algonquin Nurses website. If you received this, SMTP is working correctly.</p>",
    });
    return NextResponse.json({ ok: true, from: smtpUser, adminEmails });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err), adminEmails }, { status: 500 });
  }
}
