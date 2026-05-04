import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL ?? "Algonquin Nurses <onboarding@resend.dev>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.algonquinnurses.com";
// Always use the production domain for logo so email clients can load it
const LOGO_URL = "https://www.algonquinnurses.com/images/algonquin-logo-top-300.png";
const ADMIN_URL = `${SITE_URL}/admin`;
const YEAR = new Date().getFullYear();

const SERVICE_LABELS: Record<string, string> = {
  "private-duty": "Private Duty Care",
  medicaid: "Medicaid In-Home Care",
  cds: "Consumer Directed Services",
  hcy: "Healthy Youth & Children Program",
  veterans: "Veterans Care",
  other: "Other",
};

const POSITION_LABELS: Record<string, string> = {
  cna: "Certified Nursing Assistant (CNA)",
  hha: "Home Health Aide (HHA)",
  rn: "Registered Nurse (RN)",
  lpn: "Licensed Practical Nurse (LPN)",
  other: "Other",
};

// ─── Confirmation template (sent to the person who submitted) ─────────────────

function field(label: string, value: string) {
  return `
  <tr>
    <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
      <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8;margin-bottom:3px;">${label}</span>
      <span style="font-size:15px;color:#1e293b;font-weight:500;">${value}</span>
    </td>
  </tr>`;
}

function buildConfirmationHtml({
  subject,
  firstName,
  intro,
  fields,
  note,
  ctaLabel,
  ctaHref,
}: {
  subject: string;
  firstName: string;
  intro: string;
  fields: string;
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const cta = ctaLabel && ctaHref
    ? `<div style="text-align:center;margin-top:32px;">
        <a href="${SITE_URL}${ctaHref}"
           style="display:inline-block;background-color:#3b5d95;color:#ffffff;text-decoration:none;
                  font-size:14px;font-weight:600;padding:14px 36px;border-radius:50px;
                  letter-spacing:0.02em;">
          ${ctaLabel} &rarr;
        </a>
       </div>`
    : "";

  const noteHtml = note
    ? `<p style="margin:28px 0 0;padding:16px 20px;background:#f0f7ff;border-left:3px solid #3b5d95;border-radius:4px;font-size:13px;color:#475569;line-height:1.6;">${note}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f1f5f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;width:100%;">

        <!-- Logo bar -->
        <tr>
          <td style="padding-bottom:24px;text-align:center;">
            <img src="${LOGO_URL}" alt="Algonquin Nurses Home Health Care" width="160" style="display:inline-block;height:auto;"/>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:#ffffff;border-radius:16px;box-shadow:0 2px 16px rgba(15,23,42,0.08);overflow:hidden;">

            <!-- Blue header strip -->
            <div style="background:linear-gradient(135deg,#1a2e50 0%,#3b5d95 100%);padding:32px 40px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#93c5fd;">Message Received</p>
              <h1 style="margin:0;font-size:24px;color:#ffffff;font-weight:700;line-height:1.2;">Hi ${firstName}, we got your message!</h1>
            </div>

            <!-- Body -->
            <div style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.7;">${intro}</p>

              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                ${fields}
              </table>

              ${noteHtml}
              ${cta}
            </div>

            <!-- Footer -->
            <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#3b5d95;">Algonquin Nurses Home Health Care</p>
              <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;">Serving St. Louis Metro with Compassionate Care Since 1987</p>
              <p style="margin:0 0 16px;font-size:12px;color:#64748b;line-height:2;">
                <a href="tel:3148228158" style="color:#3b5d95;text-decoration:none;">(314) 822-8158</a>
                &nbsp;&bull;&nbsp;
                <a href="tel:6362741870" style="color:#3b5d95;text-decoration:none;">(636) 274-1870</a>
                &nbsp;&bull;&nbsp;
                <a href="tel:6369781775" style="color:#3b5d95;text-decoration:none;">(636) 978-1775</a>
              </p>
              <p style="margin:0;font-size:11px;color:#cbd5e1;">&copy; ${YEAR} Algonquin Nurses Home Health Care. All rights reserved.</p>
            </div>

          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Notification template (sent to admin staff) ──────────────────────────────

const BADGE_COLORS: Record<string, string> = {
  "Contact Form":  "#0ea5e9",
  "Referral Form": "#8b5cf6",
  "Career Form":   "#f59e0b",
};

function notifField(label: string, value: string, last = false) {
  return `
  <tr>
    <td width="140" valign="top" style="padding:14px 16px 14px 0;${last ? "" : "border-bottom:1px solid #f1f5f9;"}">
      <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8;">${label}</span>
    </td>
    <td valign="top" style="padding:14px 0;${last ? "" : "border-bottom:1px solid #f1f5f9;"}">
      <span style="font-size:14px;color:#1e293b;font-weight:500;line-height:1.5;">${value}</span>
    </td>
  </tr>`;
}

function buildNotificationHtml(formType: string, fieldsHtml: string) {
  const badgeColor = BADGE_COLORS[formType] ?? "#3b5d95";
  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
    year: "numeric", hour: "numeric", minute: "2-digit",
    timeZoneName: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${formType} Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0f172a;padding:40px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;width:100%;">

        <!-- Top bar with logo -->
        <tr>
          <td style="padding-bottom:28px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td>
                  <img src="${LOGO_URL}" alt="Algonquin Nurses" width="130" style="display:block;height:auto;"/>
                </td>
                <td align="right" valign="middle">
                  <span style="display:inline-block;background:${badgeColor};color:#ffffff;font-size:11px;font-weight:700;
                               text-transform:uppercase;letter-spacing:0.08em;padding:5px 14px;border-radius:50px;">
                    ${formType}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Main card -->
        <tr>
          <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.3);">

            <!-- Colored top accent -->
            <div style="height:4px;background:linear-gradient(90deg,${badgeColor} 0%,${badgeColor}88 100%);"></div>

            <!-- Header -->
            <div style="padding:28px 36px 20px;">
              <h1 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#0f172a;">New ${formType} Submission</h1>
              <p style="margin:0;font-size:12px;color:#94a3b8;">Received ${timestamp}</p>
            </div>

            <!-- Divider -->
            <div style="height:1px;background:#f1f5f9;margin:0 36px;"></div>

            <!-- Fields -->
            <div style="padding:8px 36px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                ${fieldsHtml}
              </table>
            </div>

            <!-- CTA -->
            <div style="padding:20px 36px 32px;text-align:center;">
              <a href="${ADMIN_URL}"
                 style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;
                        font-size:13px;font-weight:600;padding:12px 32px;border-radius:50px;
                        letter-spacing:0.02em;">
                View in Admin Panel &rarr;
              </a>
            </div>

          </td>
        </tr>

        <!-- Footer note -->
        <tr>
          <td style="padding-top:20px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#475569;">
              This is an automated notification from <a href="${SITE_URL}" style="color:#94a3b8;">algonquinnurses.com</a>.
              Only administrators receive this email.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Shared sendEmail for confirmations ───────────────────────────────────────

export async function sendEmail(opts: {
  to: string;
  subject: string;
  firstName: string;
  intro: string;
  fields: string;
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  if (!process.env.RESEND_API_KEY) return;
  const { error } = await resend.emails.send({
    from: FROM,
    to: [opts.to],
    subject: opts.subject,
    html: buildConfirmationHtml(opts),
  });
  if (error) console.error("[resend] confirmation error:", error);
}

// ─── Confirmation emails (to submitter) ───────────────────────────────────────

export function sendContactConfirmation(data: {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  service?: string;
  message: string;
}) {
  return sendEmail({
    to: data.email,
    subject: "We received your message — Algonquin Nurses",
    firstName: data.firstName,
    intro: "We've received your message and a member of our care team will be in touch within 1 business day. Here's a copy of what you submitted:",
    fields: [
      field("Name", `${data.firstName} ${data.lastName}`),
      field("Phone", data.phone),
      ...(data.service ? [field("Service of Interest", SERVICE_LABELS[data.service] ?? data.service)] : []),
      field("Message", data.message),
    ].join(""),
    note: "Need immediate assistance? Call us at <strong>(636) 274-1870</strong> — we're available 24/7.",
    ctaLabel: "Visit Our Website",
    ctaHref: "/",
  });
}

export function sendReferralConfirmation(data: {
  referrerEmail?: string;
  referrerName: string;
  referrerPhone: string;
  clientName: string;
  clientPhone?: string;
  service?: string;
  notes?: string;
}) {
  if (!data.referrerEmail) return Promise.resolve();
  return sendEmail({
    to: data.referrerEmail,
    subject: "Referral received — Algonquin Nurses",
    firstName: data.referrerName.split(" ")[0],
    intro: "We've received your client referral and will reach out to them promptly. Here's a summary of what you submitted:",
    fields: [
      field("Your Name", data.referrerName),
      field("Your Phone", data.referrerPhone),
      field("Client Name", data.clientName),
      ...(data.clientPhone ? [field("Client Phone", data.clientPhone)] : []),
      ...(data.service ? [field("Service", SERVICE_LABELS[data.service] ?? data.service)] : []),
      ...(data.notes ? [field("Notes", data.notes)] : []),
    ].join(""),
    note: "Questions? Call us at <strong>(636) 274-1870</strong>.",
    ctaLabel: "View Our Services",
    ctaHref: "/services/private-duty-care",
  });
}

export function sendApplicationConfirmation(data: {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  position?: string;
}) {
  return sendEmail({
    to: data.email,
    subject: "Application received — Algonquin Nurses",
    firstName: data.firstName,
    intro: "We've received your job application and our hiring team will review it shortly. We'll be in touch if your qualifications are a match.",
    fields: [
      field("Name", `${data.firstName} ${data.lastName}`),
      field("Phone", data.phone),
      ...(data.position ? [field("Position", POSITION_LABELS[data.position] ?? data.position)] : []),
    ].join(""),
    note: "Questions about your application? Call us at <strong>(636) 274-1870</strong>.",
    ctaLabel: "View Open Positions",
    ctaHref: "/careers",
  });
}

export function sendChatLeadConfirmation(data: {
  email: string;
  name: string;
  phone: string;
  service?: string;
}) {
  return sendEmail({
    to: data.email,
    subject: "We'll be in touch — Algonquin Nurses",
    firstName: data.name.split(" ")[0],
    intro: "We received your information through our website chat and a member of our care team will contact you within 1 business day.",
    fields: [
      field("Name", data.name),
      field("Phone", data.phone),
      ...(data.service ? [field("Service of Interest", SERVICE_LABELS[data.service] ?? data.service)] : []),
    ].join(""),
    note: "Can't wait? Call us now at <strong>(636) 274-1870</strong> — we're available 24/7.",
    ctaLabel: "Explore Our Services",
    ctaHref: "/services/private-duty-care",
  });
}

// ─── Notification emails (to admin staff) ────────────────────────────────────

async function sendNotification(to: string[], subject: string, formType: string, fieldsHtml: string) {
  if (!process.env.RESEND_API_KEY || to.length === 0) {
    console.log(`[resend] skipping ${formType} notification — no API key or no recipients`);
    return;
  }
  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html: buildNotificationHtml(formType, fieldsHtml),
  });
  if (error) console.error(`[resend] ${formType} notification error:`, error);
  else console.log(`[resend] ${formType} notification sent, id:`, data?.id);
}

export function sendContactNotification(data: {
  to: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}) {
  const fields = [
    notifField("Name", `${data.firstName} ${data.lastName}`),
    notifField("Email", `<a href="mailto:${data.email}" style="color:#3b5d95;text-decoration:none;">${data.email}</a>`),
    notifField("Phone", `<a href="tel:${data.phone.replace(/\D/g, "")}" style="color:#3b5d95;text-decoration:none;">${data.phone}</a>`),
    ...(data.service ? [notifField("Service", SERVICE_LABELS[data.service] ?? data.service)] : []),
    notifField("Message", data.message, true),
  ].join("");
  return sendNotification(data.to, "Contact Form", "Contact Form", fields);
}

export function sendReferralNotification(data: {
  to: string[];
  referrerName: string;
  referrerPhone: string;
  referrerEmail?: string;
  clientName: string;
  clientPhone?: string;
  service?: string;
  notes?: string;
}) {
  const allFields = [
    notifField("Referrer Name", data.referrerName),
    ...(data.referrerEmail ? [notifField("Referrer Email", `<a href="mailto:${data.referrerEmail}" style="color:#3b5d95;text-decoration:none;">${data.referrerEmail}</a>`)] : []),
    notifField("Referrer Phone", `<a href="tel:${data.referrerPhone.replace(/\D/g, "")}" style="color:#3b5d95;text-decoration:none;">${data.referrerPhone}</a>`),
    notifField("Client Name", data.clientName),
    ...(data.clientPhone ? [notifField("Client Phone", `<a href="tel:${data.clientPhone.replace(/\D/g, "")}" style="color:#3b5d95;text-decoration:none;">${data.clientPhone}</a>`)] : []),
    ...(data.service ? [notifField("Service", SERVICE_LABELS[data.service] ?? data.service)] : []),
    ...(data.notes ? [notifField("Notes", data.notes, true)] : [notifField("Notes", "—", true)]),
  ].join("");
  return sendNotification(data.to, "Referral Form", "Referral Form", allFields);
}

export function sendApplicationNotification(data: {
  to: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position?: string;
}) {
  const allFields = [
    notifField("Name", `${data.firstName} ${data.lastName}`),
    notifField("Email", `<a href="mailto:${data.email}" style="color:#3b5d95;text-decoration:none;">${data.email}</a>`),
    notifField("Phone", `<a href="tel:${data.phone.replace(/\D/g, "")}" style="color:#3b5d95;text-decoration:none;">${data.phone}</a>`),
    notifField("Position", data.position ? (POSITION_LABELS[data.position] ?? data.position) : "—", true),
  ].join("");
  return sendNotification(data.to, "Career Form", "Career Form", allFields);
}
