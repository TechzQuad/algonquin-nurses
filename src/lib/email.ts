import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM      = process.env.RESEND_FROM_EMAIL ?? "Algonquin Nurses <onboarding@resend.dev>";
const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.algonquinnurses.com";
const LOGO_URL  = "https://www.algonquinnurses.com/images/algonquin-logo-top-300.png";
const ADMIN_URL = `${SITE_URL}/admin`;
const YEAR      = new Date().getFullYear();

// Brand tokens (mirrors globals.css)
const C = {
  primary:      "#3b5d95",
  primaryDark:  "#2d4a78",
  primaryLight: "#839fce",
  accent:       "#0d9488",
  accentLight:  "#14b8a6",
  fg:           "#1a1a2e",
  muted:        "#525252",
  subtle:       "#737373",
  border:       "#e5e5e5",
  surface:      "#f8fafc",
  white:        "#ffffff",
};

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI','Inter',Helvetica,Arial,sans-serif";

const SERVICE_LABELS: Record<string, string> = {
  "private-duty": "Private Duty Care",
  medicaid:       "Medicaid In-Home Care",
  cds:            "Consumer Directed Services",
  hcy:            "Healthy Youth & Children Program",
  veterans:       "Veterans Care",
  other:          "Other",
};

const POSITION_LABELS: Record<string, string> = {
  cna:   "Certified Nursing Assistant (CNA)",
  hha:   "Home Health Aide (HHA)",
  rn:    "Registered Nurse (RN)",
  lpn:   "Licensed Practical Nurse (LPN)",
  other: "Other",
};

// Badge color per form type — uses brand palette
const FORM_ACCENT: Record<string, string> = {
  "Contact Form":  C.accent,       // teal
  "Referral Form": C.primary,      // brand blue
  "Career Form":   C.primaryDark,  // deep navy
};

// ─── Confirmation template (to submitter) ─────────────────────────────────────

function cField(label: string, value: string) {
  return `
  <tr>
    <td style="padding:12px 0;border-bottom:1px solid ${C.border};">
      <span style="display:block;font-size:10px;font-weight:700;text-transform:uppercase;
                   letter-spacing:0.08em;color:${C.subtle};margin-bottom:4px;">${label}</span>
      <span style="font-size:15px;color:${C.fg};font-weight:500;line-height:1.5;">${value}</span>
    </td>
  </tr>`;
}

function buildConfirmationHtml(opts: {
  subject: string;
  firstName: string;
  intro: string;
  fields: string;
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const cta = opts.ctaLabel && opts.ctaHref
    ? `<div style="text-align:center;margin-top:36px;">
        <a href="${SITE_URL}${opts.ctaHref}"
           style="display:inline-block;background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);
                  color:${C.white};text-decoration:none;font-size:14px;font-weight:600;
                  padding:14px 40px;border-radius:50px;letter-spacing:0.02em;">
          ${opts.ctaLabel} &rarr;
        </a>
       </div>`
    : "";

  const note = opts.note
    ? `<div style="margin-top:28px;padding:16px 20px;background:#f0f7ff;
                   border-left:4px solid ${C.primary};border-radius:0 8px 8px 0;">
        <p style="margin:0;font-size:13px;color:${C.muted};line-height:1.7;">${opts.note}</p>
       </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${opts.subject}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.surface};font-family:${FONT};">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:${C.surface};padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;width:100%;">

        <!-- Logo -->
        <tr>
          <td style="text-align:center;padding-bottom:28px;">
            <a href="${SITE_URL}" style="display:inline-block;">
              <img src="${LOGO_URL}" alt="Algonquin Nurses Home Health Care"
                   width="170" style="display:inline-block;height:auto;"/>
            </a>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:${C.white};border-radius:20px;
                     box-shadow:0 4px 24px rgba(59,93,149,0.10);overflow:hidden;">

            <!-- Header gradient -->
            <div style="background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);
                        padding:36px 40px 32px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;
                         letter-spacing:0.1em;color:${C.primaryLight};">Algonquin Nurses</p>
              <h1 style="margin:0;font-size:26px;color:${C.white};font-weight:700;line-height:1.25;">
                Hi ${opts.firstName}, we received your message!
              </h1>
            </div>

            <!-- Teal accent bar -->
            <div style="height:3px;background:linear-gradient(90deg,${C.accent} 0%,${C.accentLight} 100%);"></div>

            <!-- Body -->
            <div style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:15px;color:${C.muted};line-height:1.8;">${opts.intro}</p>

              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                ${opts.fields}
              </table>

              ${note}
              ${cta}
            </div>

            <!-- Footer -->
            <div style="background:${C.surface};border-top:1px solid ${C.border};
                        padding:28px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:${C.primary};">
                Algonquin Nurses Home Health Care
              </p>
              <p style="margin:0 0 8px;font-size:12px;color:${C.subtle};">
                Serving St. Louis Metro with Compassionate Care Since 1987
              </p>
              <p style="margin:0 0 20px;font-size:12px;color:${C.muted};line-height:2.2;">
                <a href="tel:3148228158" style="color:${C.primary};text-decoration:none;">(314) 822-8158</a>
                &nbsp;&bull;&nbsp;
                <a href="tel:6362741870" style="color:${C.primary};text-decoration:none;">(636) 274-1870</a>
                &nbsp;&bull;&nbsp;
                <a href="tel:6369781775" style="color:${C.primary};text-decoration:none;">(636) 978-1775</a>
              </p>
              <p style="margin:0;font-size:11px;color:${C.subtle};">
                &copy; ${YEAR} Algonquin Nurses Home Health Care &bull;
                <a href="${SITE_URL}" style="color:${C.subtle};text-decoration:underline;">algonquinnurses.com</a>
              </p>
            </div>

          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Notification template (to admin staff) ───────────────────────────────────

function nField(label: string, value: string, isLast = false) {
  const border = isLast ? "" : `border-bottom:1px solid ${C.border};`;
  return `
  <tr>
    <td width="130" valign="top"
        style="padding:14px 20px 14px 0;${border}font-size:11px;font-weight:700;
               text-transform:uppercase;letter-spacing:0.07em;color:${C.subtle};">
      ${label}
    </td>
    <td valign="top" style="padding:14px 0;${border}font-size:14px;color:${C.fg};
                            font-weight:500;line-height:1.6;">
      ${value}
    </td>
  </tr>`;
}

function buildNotificationHtml(formType: string, fieldsHtml: string) {
  const accent = FORM_ACCENT[formType] ?? C.primary;
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
  <title>${formType} — New Submission</title>
</head>
<body style="margin:0;padding:0;background-color:${C.surface};font-family:${FONT};">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:${C.surface};padding:48px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;width:100%;">

        <!-- Top: logo + badge -->
        <tr>
          <td style="padding-bottom:24px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td valign="middle">
                  <a href="${SITE_URL}">
                    <img src="${LOGO_URL}" alt="Algonquin Nurses" width="150"
                         style="display:block;height:auto;"/>
                  </a>
                </td>
                <td align="right" valign="middle">
                  <span style="display:inline-block;background:${accent};color:${C.white};
                               font-size:11px;font-weight:700;text-transform:uppercase;
                               letter-spacing:0.09em;padding:6px 16px;border-radius:50px;">
                    ● ${formType}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:${C.white};border-radius:20px;overflow:hidden;
                     box-shadow:0 4px 24px rgba(59,93,149,0.10);">

            <!-- Brand header -->
            <div style="background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);
                        padding:30px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;
                               letter-spacing:0.1em;color:${C.primaryLight};">New Submission</p>
                    <h1 style="margin:0;font-size:22px;font-weight:700;color:${C.white};line-height:1.2;">
                      ${formType}
                    </h1>
                  </td>
                  <td align="right" valign="bottom">
                    <span style="font-size:11px;color:${C.primaryLight};">${timestamp}</span>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Accent bar -->
            <div style="height:3px;background:linear-gradient(90deg,${accent} 0%,${accent}55 100%);"></div>

            <!-- Fields -->
            <div style="padding:8px 36px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                ${fieldsHtml}
              </table>
            </div>

            <!-- CTA -->
            <div style="padding:24px 36px 36px;text-align:center;">
              <a href="${ADMIN_URL}"
                 style="display:inline-block;background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);
                        color:${C.white};text-decoration:none;font-size:13px;font-weight:600;
                        padding:13px 36px;border-radius:50px;letter-spacing:0.02em;">
                View in Admin Panel &rarr;
              </a>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding-top:24px;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:${C.primary};">
              Algonquin Nurses Home Health Care
            </p>
            <p style="margin:0;font-size:11px;color:${C.subtle};">
              Automated notification &bull;
              <a href="${SITE_URL}" style="color:${C.subtle};text-decoration:underline;">algonquinnurses.com</a>
              &bull; &copy; ${YEAR}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Shared sender for confirmations ─────────────────────────────────────────

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

// ─── Shared sender for notifications ─────────────────────────────────────────

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
      cField("Name", `${data.firstName} ${data.lastName}`),
      cField("Phone", data.phone),
      ...(data.service ? [cField("Service of Interest", SERVICE_LABELS[data.service] ?? data.service)] : []),
      cField("Message", data.message),
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
      cField("Your Name", data.referrerName),
      cField("Your Phone", data.referrerPhone),
      cField("Client Name", data.clientName),
      ...(data.clientPhone ? [cField("Client Phone", data.clientPhone)] : []),
      ...(data.service ? [cField("Service", SERVICE_LABELS[data.service] ?? data.service)] : []),
      ...(data.notes ? [cField("Notes", data.notes)] : []),
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
      cField("Name", `${data.firstName} ${data.lastName}`),
      cField("Phone", data.phone),
      ...(data.position ? [cField("Position", POSITION_LABELS[data.position] ?? data.position)] : []),
    ].join(""),
    note: "Questions? Call us at <strong>(636) 274-1870</strong>.",
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
      cField("Name", data.name),
      cField("Phone", data.phone),
      ...(data.service ? [cField("Service of Interest", SERVICE_LABELS[data.service] ?? data.service)] : []),
    ].join(""),
    note: "Can't wait? Call us now at <strong>(636) 274-1870</strong> — we're available 24/7.",
    ctaLabel: "Explore Our Services",
    ctaHref: "/services/private-duty-care",
  });
}

// ─── Notification emails (to admin staff) ────────────────────────────────────

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
    nField("Name", `${data.firstName} ${data.lastName}`),
    nField("Email", `<a href="mailto:${data.email}" style="color:${C.primary};text-decoration:none;">${data.email}</a>`),
    nField("Phone", `<a href="tel:${data.phone.replace(/\D/g,"")}" style="color:${C.primary};text-decoration:none;">${data.phone}</a>`),
    ...(data.service ? [nField("Service", SERVICE_LABELS[data.service] ?? data.service)] : []),
    nField("Message", data.message, true),
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
  const fields = [
    nField("Referrer", data.referrerName),
    ...(data.referrerEmail ? [nField("Referrer Email", `<a href="mailto:${data.referrerEmail}" style="color:${C.primary};text-decoration:none;">${data.referrerEmail}</a>`)] : []),
    nField("Referrer Phone", `<a href="tel:${data.referrerPhone.replace(/\D/g,"")}" style="color:${C.primary};text-decoration:none;">${data.referrerPhone}</a>`),
    nField("Client", data.clientName),
    ...(data.clientPhone ? [nField("Client Phone", `<a href="tel:${data.clientPhone.replace(/\D/g,"")}" style="color:${C.primary};text-decoration:none;">${data.clientPhone}</a>`)] : []),
    ...(data.service ? [nField("Service", SERVICE_LABELS[data.service] ?? data.service)] : []),
    nField("Notes", data.notes ?? "—", true),
  ].join("");
  return sendNotification(data.to, "Referral Form", "Referral Form", fields);
}

export function sendApplicationNotification(data: {
  to: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position?: string;
}) {
  const fields = [
    nField("Name", `${data.firstName} ${data.lastName}`),
    nField("Email", `<a href="mailto:${data.email}" style="color:${C.primary};text-decoration:none;">${data.email}</a>`),
    nField("Phone", `<a href="tel:${data.phone.replace(/\D/g,"")}" style="color:${C.primary};text-decoration:none;">${data.phone}</a>`),
    nField("Position", data.position ? (POSITION_LABELS[data.position] ?? data.position) : "—", true),
  ].join("");
  return sendNotification(data.to, "Career Form", "Career Form", fields);
}
