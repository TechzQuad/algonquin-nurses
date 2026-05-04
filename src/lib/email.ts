import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Algonquin Nurses <noreply@algonquinnurses.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.algonquinnurses.com";
const LOGO_URL = `${SITE_URL}/images/algonquin-logo-top-300.png`;
const YEAR = new Date().getFullYear();

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:6px 0;font-size:14px;color:#6b7280;width:160px;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;">${value}</td>
  </tr>`;
}

function buildEmailHtml({
  subject,
  greeting,
  intro,
  tableRows,
  note,
  ctaLabel,
  ctaHref,
}: {
  subject: string;
  greeting: string;
  intro: string;
  tableRows?: string;
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const ctaBlock =
    ctaLabel && ctaHref
      ? `<tr><td style="padding:28px 40px 0;text-align:center;">
           <a href="${SITE_URL}${ctaHref}"
              style="display:inline-block;background-color:#3b5d95;color:#ffffff;text-decoration:none;
                     font-size:15px;font-weight:600;padding:14px 32px;border-radius:8px;letter-spacing:0.01em;">
             ${ctaLabel}
           </a>
         </td></tr>`
      : "";

  const tableBlock = tableRows
    ? `<table cellpadding="0" cellspacing="0" width="100%"
             style="margin-top:20px;border-top:1px solid #e5e7eb;padding-top:16px;">
         ${tableRows}
       </table>`
    : "";

  const noteBlock = note
    ? `<p style="margin:24px 0 0;font-size:13px;color:#9ca3af;line-height:1.6;">${note}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;background-color:#ffffff;border-radius:16px;
                    overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.09);">

        <!-- Header -->
        <tr>
          <td style="background-color:#3b5d95;padding:30px 40px;text-align:center;">
            <img src="${LOGO_URL}" alt="Algonquin Nurses Home Health Care"
                 style="max-width:190px;height:auto;display:block;margin:0 auto;" />
          </td>
        </tr>

        <!-- Accent bar -->
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#3b5d95 0%,#839fce 100%);"></td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <h1 style="margin:0 0 10px;font-size:22px;color:#1a2e50;font-weight:700;line-height:1.3;">
              ${greeting}
            </h1>
            <p style="margin:0;font-size:15px;color:#4b5563;line-height:1.7;">${intro}</p>
            ${tableBlock}
            ${noteBlock}
          </td>
        </tr>

        ${ctaBlock}

        <!-- Divider -->
        <tr>
          <td style="padding:32px 40px 0;">
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:28px 40px 36px;text-align:center;">
            <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#3b5d95;">
              Algonquin Nurses Home Health Care
            </p>
            <p style="margin:0 0 6px;font-size:13px;color:#6b7280;">
              Serving St. Louis Metro with Compassionate Care Since 1987
            </p>
            <p style="margin:0 0 16px;font-size:13px;color:#6b7280;line-height:1.8;">
              St. Louis: <a href="tel:3148228158" style="color:#3b5d95;text-decoration:none;">(314) 822-8158</a>
              &nbsp;&middot;&nbsp;
              House Springs: <a href="tel:6362741870" style="color:#3b5d95;text-decoration:none;">(636) 274-1870</a>
              &nbsp;&middot;&nbsp;
              O'Fallon: <a href="tel:6369781775" style="color:#3b5d95;text-decoration:none;">(636) 978-1775</a>
            </p>
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              &copy; ${YEAR} Algonquin Nurses Home Health Care. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  greeting: string;
  intro: string;
  tableRows?: string;
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: [opts.to],
      subject: opts.subject,
      html: buildEmailHtml(opts),
    });
  } catch (err) {
    console.error("Email delivery failed:", err);
  }
}

// ─── Template helpers ────────────────────────────────────────────────────────

const SERVICE_LABELS: Record<string, string> = {
  "private-duty": "Private Duty Care",
  medicaid: "Medicaid In-Home Care",
  cds: "Consumer Directed Services",
  hcy: "Healthy Youth & Children Program",
  veterans: "Veterans Care",
  other: "Other",
};

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
    greeting: `Thank you, ${data.firstName}!`,
    intro:
      "We've received your message and a member of our care team will be in touch with you within 1 business day. Here's a summary of your submission:",
    tableRows: [
      row("Name", `${data.firstName} ${data.lastName}`),
      row("Phone", data.phone),
      ...(data.service ? [row("Service of Interest", SERVICE_LABELS[data.service] ?? data.service)] : []),
      row("Message", data.message),
    ].join(""),
    note: "Need immediate assistance? Call us at <strong>(636) 274-1870</strong> anytime.",
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
    greeting: `Thank you for your referral, ${data.referrerName.split(" ")[0]}!`,
    intro:
      "We've received your client referral and will reach out to them promptly. Here's a summary:",
    tableRows: [
      row("Your Name", data.referrerName),
      row("Your Phone", data.referrerPhone),
      row("Client Name", data.clientName),
      ...(data.clientPhone ? [row("Client Phone", data.clientPhone)] : []),
      ...(data.service ? [row("Service", SERVICE_LABELS[data.service] ?? data.service)] : []),
      ...(data.notes ? [row("Notes", data.notes)] : []),
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
  const POSITION_LABELS: Record<string, string> = {
    cna: "Certified Nursing Assistant (CNA)",
    hha: "Home Health Aide (HHA)",
    rn: "Registered Nurse (RN)",
    lpn: "Licensed Practical Nurse (LPN)",
    other: "Other",
  };
  return sendEmail({
    to: data.email,
    subject: "Application received — Algonquin Nurses",
    greeting: `Thank you for applying, ${data.firstName}!`,
    intro:
      "We've received your job application and our hiring team will review it shortly. We'll be in touch if your qualifications are a match. Here's a summary:",
    tableRows: [
      row("Name", `${data.firstName} ${data.lastName}`),
      row("Phone", data.phone),
      ...(data.position ? [row("Position", POSITION_LABELS[data.position] ?? data.position)] : []),
    ].join(""),
    note: "Questions about your application? Call us at <strong>(636) 274-1870</strong>.",
    ctaLabel: "View Open Positions",
    ctaHref: "/careers",
  });
}

export async function sendContactNotification(data: {
  to: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY || data.to.length === 0) {
    console.log("[resend] skipping contact notification — no API key or no recipients");
    return;
  }
  const { data: result, error } = await resend.emails.send({
    from: FROM,
    to: data.to,
    subject: "Contact Form",
    html: buildEmailHtml({
      subject: "Contact Form",
      greeting: "New Contact Form Submission",
      intro: "A visitor submitted the contact form on the website.",
      tableRows: [
        row("Name", `${data.firstName} ${data.lastName}`),
        row("Email", data.email),
        row("Phone", data.phone),
        ...(data.service ? [row("Service of Interest", SERVICE_LABELS[data.service] ?? data.service)] : []),
        row("Message", data.message),
      ].join(""),
    }),
  });
  if (error) console.error("[resend] contact notification error:", error);
  else console.log("[resend] contact notification sent, id:", result?.id);
}

export async function sendReferralNotification(data: {
  to: string[];
  referrerName: string;
  referrerPhone: string;
  referrerEmail?: string;
  clientName: string;
  clientPhone?: string;
  service?: string;
  notes?: string;
}) {
  if (!process.env.RESEND_API_KEY || data.to.length === 0) {
    console.log("[resend] skipping referral notification — no API key or no recipients");
    return;
  }
  const { data: result, error } = await resend.emails.send({
    from: FROM,
    to: data.to,
    subject: "Referral Form",
    html: buildEmailHtml({
      subject: "Referral Form",
      greeting: "New Client Referral Submission",
      intro: "A referral was submitted through the website.",
      tableRows: [
        row("Referrer Name", data.referrerName),
        row("Referrer Phone", data.referrerPhone),
        ...(data.referrerEmail ? [row("Referrer Email", data.referrerEmail)] : []),
        row("Client Name", data.clientName),
        ...(data.clientPhone ? [row("Client Phone", data.clientPhone)] : []),
        ...(data.service ? [row("Service", SERVICE_LABELS[data.service] ?? data.service)] : []),
        ...(data.notes ? [row("Notes", data.notes)] : []),
      ].join(""),
    }),
  });
  if (error) console.error("[resend] referral notification error:", error);
  else console.log("[resend] referral notification sent, id:", result?.id);
}

export async function sendApplicationNotification(data: {
  to: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position?: string;
}) {
  if (!process.env.RESEND_API_KEY || data.to.length === 0) {
    console.log("[resend] skipping application notification — no API key or no recipients");
    return;
  }
  const POSITION_LABELS: Record<string, string> = {
    cna: "Certified Nursing Assistant (CNA)",
    hha: "Home Health Aide (HHA)",
    rn: "Registered Nurse (RN)",
    lpn: "Licensed Practical Nurse (LPN)",
    other: "Other",
  };
  const { data: result, error } = await resend.emails.send({
    from: FROM,
    to: data.to,
    subject: "Career Form",
    html: buildEmailHtml({
      subject: "Career Form",
      greeting: "New Job Application Submission",
      intro: "A candidate submitted a job application through the website.",
      tableRows: [
        row("Name", `${data.firstName} ${data.lastName}`),
        row("Email", data.email),
        row("Phone", data.phone),
        ...(data.position ? [row("Position", POSITION_LABELS[data.position] ?? data.position)] : []),
      ].join(""),
    }),
  });
  if (error) console.error("[resend] application notification error:", error);
  else console.log("[resend] application notification sent, id:", result?.id);
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
    greeting: `Thanks for reaching out, ${data.name.split(" ")[0]}!`,
    intro:
      "We received your information through our website chat and a member of our care team will contact you within 1 business day.",
    tableRows: [
      row("Name", data.name),
      row("Phone", data.phone),
      ...(data.service ? [row("Service of Interest", SERVICE_LABELS[data.service] ?? data.service)] : []),
    ].join(""),
    note: "Can't wait? Call us now at <strong>(636) 274-1870</strong> — we're available 24/7.",
    ctaLabel: "Explore Our Services",
    ctaHref: "/services/private-duty-care",
  });
}
