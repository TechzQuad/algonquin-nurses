import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM      = `Algonquin Nurses <${process.env.SMTP_USER ?? "mail@algonquinnursesstl.online"}>`;
const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.algonquinnurses.com";
const ADMIN_URL = `${SITE_URL}/admin`;
const YEAR      = new Date().getFullYear();

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
  surface:      "#f4f7fb",
  white:        "#ffffff",
  green:        "#16a34a",
  greenBg:      "#f0fdf4",
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

// ─── Field renderers ──────────────────────────────────────────────────────────

function cField(label: string, value: string) {
  return `
  <tr>
    <td style="padding:14px 0;border-bottom:1px solid ${C.border};">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td width="8" style="padding-right:12px;vertical-align:top;">
            <div style="width:3px;height:36px;background:linear-gradient(180deg,${C.accent} 0%,${C.primary} 100%);
                        border-radius:99px;"></div>
          </td>
          <td>
            <span style="display:block;font-size:10px;font-weight:700;text-transform:uppercase;
                         letter-spacing:0.09em;color:${C.subtle};margin-bottom:3px;">${label}</span>
            <span style="display:block;font-size:14px;color:${C.fg};font-weight:500;line-height:1.6;">${value}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function nField(label: string, value: string, isLast = false) {
  const border = isLast ? "" : `border-bottom:1px solid ${C.border};`;
  return `
  <tr>
    <td width="120" valign="top"
        style="padding:14px 16px 14px 0;${border}font-size:10px;font-weight:700;
               text-transform:uppercase;letter-spacing:0.08em;color:${C.subtle};
               white-space:nowrap;">
      ${label}
    </td>
    <td valign="top" style="padding:14px 0;${border}font-size:14px;color:${C.fg};
                            font-weight:500;line-height:1.6;">
      ${value}
    </td>
  </tr>`;
}

// ─── Confirmation template (to submitter) ─────────────────────────────────────

function buildConfirmationHtml(opts: {
  subject:    string;
  firstName:  string;
  badgeLabel: string;
  badgeColor: string;
  headline:   string;
  intro:      string;
  fields:     string;
  note?:      string;
  ctaLabel?:  string;
  ctaHref?:   string;
}) {
  const cta = opts.ctaLabel && opts.ctaHref
    ? `<div style="text-align:center;margin-top:36px;">
        <a href="${SITE_URL}${opts.ctaHref}"
           style="display:inline-block;background:linear-gradient(135deg,${C.accent} 0%,${C.accentLight} 100%);
                  color:${C.white};text-decoration:none;font-size:14px;font-weight:700;
                  padding:15px 44px;border-radius:50px;letter-spacing:0.03em;
                  box-shadow:0 4px 14px rgba(13,148,136,0.35);">
          ${opts.ctaLabel} &rarr;
        </a>
       </div>`
    : "";

  const note = opts.note
    ? `<div style="margin-top:28px;padding:16px 20px;
                   background:${C.greenBg};border-left:4px solid ${C.green};
                   border-radius:0 10px 10px 0;">
        <p style="margin:0;font-size:13px;color:#15532a;line-height:1.75;">${opts.note}</p>
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

        <!-- Brand wordmark (no image) -->
        <tr>
          <td style="text-align:center;padding-bottom:28px;">
            <a href="${SITE_URL}" style="text-decoration:none;">
              <span style="display:inline-block;font-size:14px;font-weight:800;
                           color:${C.primary};letter-spacing:0.04em;text-transform:uppercase;
                           border-bottom:2px solid ${C.accent};padding-bottom:4px;">
                ALGONQUIN NURSES
              </span>
            </a>
            <p style="margin:4px 0 0;font-size:10px;color:${C.subtle};
                      text-transform:uppercase;letter-spacing:0.1em;">
              Home Health Care &bull; St. Louis Since 1987
            </p>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:${C.white};border-radius:20px;
                     box-shadow:0 6px 32px rgba(59,93,149,0.12);overflow:hidden;">

            <!-- Header -->
            <div style="background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);
                        padding:40px 40px 36px;">
              <!-- Badge -->
              <div style="margin-bottom:16px;">
                <span style="display:inline-block;background:${opts.badgeColor};
                             color:${C.white};font-size:10px;font-weight:700;
                             text-transform:uppercase;letter-spacing:0.1em;
                             padding:5px 14px;border-radius:50px;">
                  ${opts.badgeLabel}
                </span>
              </div>
              <!-- Success checkmark -->
              <div style="margin-bottom:16px;">
                <span style="display:inline-block;width:48px;height:48px;line-height:48px;
                             text-align:center;background:rgba(255,255,255,0.15);
                             border-radius:50%;font-size:24px;">&#10003;</span>
              </div>
              <h1 style="margin:0;font-size:24px;color:${C.white};font-weight:700;line-height:1.3;">
                ${opts.headline}
              </h1>
            </div>

            <!-- Teal accent bar -->
            <div style="height:4px;background:linear-gradient(90deg,${C.accent} 0%,${C.accentLight} 100%);"></div>

            <!-- Body -->
            <div style="padding:36px 40px;">
              <p style="margin:0 0 28px;font-size:15px;color:${C.muted};line-height:1.85;">${opts.intro}</p>

              <!-- Fields -->
              <div style="background:${C.surface};border-radius:12px;padding:4px 20px 4px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  ${opts.fields}
                </table>
              </div>

              ${note}
              ${cta}
            </div>

            <!-- Divider phones -->
            <div style="background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);
                        padding:24px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;
                        letter-spacing:0.1em;color:rgba(255,255,255,0.6);">Need Immediate Help?</p>
              <p style="margin:0;font-size:14px;color:${C.white};line-height:2.2;">
                <a href="tel:3148228158" style="color:${C.white};text-decoration:none;font-weight:600;">(314) 822-8158</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="tel:6362741870" style="color:${C.white};text-decoration:none;font-weight:600;">(636) 274-1870</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="tel:6369781775" style="color:${C.white};text-decoration:none;font-weight:600;">(636) 978-1775</a>
              </p>
            </div>

            <!-- Footer -->
            <div style="background:${C.surface};border-top:1px solid ${C.border};
                        padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:${C.subtle};line-height:1.8;">
                <a href="${SITE_URL}" style="color:${C.primary};text-decoration:none;font-weight:600;">algonquinnurses.com</a>
                &nbsp;&bull;&nbsp;
                <a href="${SITE_URL}/privacy" style="color:${C.subtle};text-decoration:underline;">Privacy Policy</a>
              </p>
              <p style="margin:0;font-size:11px;color:${C.subtle};">
                &copy; ${YEAR} Algonquin Nurses Home Health Care. All rights reserved.
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

// ─── Notification template (to admin + submitter copy) ───────────────────────

function buildNotificationHtml(opts: {
  formType:   string;
  badgeColor: string;
  headline:   string;
  subline:    string;
  fieldsHtml: string;
  adminLink?: boolean;
}) {
  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "long", month: "long", day: "numeric",
    year: "numeric", hour: "numeric", minute: "2-digit",
    timeZoneName: "short",
  });

  const ctaBlock = opts.adminLink !== false
    ? `<div style="padding:0 36px 36px;text-align:center;">
        <a href="${ADMIN_URL}"
           style="display:inline-block;
                  background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);
                  color:${C.white};text-decoration:none;font-size:13px;font-weight:700;
                  padding:14px 40px;border-radius:50px;letter-spacing:0.03em;">
          Open Admin Panel &rarr;
        </a>
       </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${opts.formType} — New Submission</title>
</head>
<body style="margin:0;padding:0;background-color:${C.surface};font-family:${FONT};">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:${C.surface};padding:48px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;width:100%;">

        <!-- Wordmark -->
        <tr>
          <td style="text-align:center;padding-bottom:24px;">
            <a href="${SITE_URL}" style="text-decoration:none;">
              <span style="display:inline-block;font-size:14px;font-weight:800;
                           color:${C.primary};letter-spacing:0.04em;text-transform:uppercase;
                           border-bottom:2px solid ${C.accent};padding-bottom:4px;">
                ALGONQUIN NURSES
              </span>
            </a>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:${C.white};border-radius:20px;overflow:hidden;
                     box-shadow:0 6px 32px rgba(59,93,149,0.12);">

            <!-- Header -->
            <div style="background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);
                        padding:32px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td valign="middle">
                    <span style="display:inline-block;background:${opts.badgeColor};
                                 color:${C.white};font-size:10px;font-weight:700;
                                 text-transform:uppercase;letter-spacing:0.1em;
                                 padding:5px 14px;border-radius:50px;margin-bottom:10px;">
                      &#9679; ${opts.formType}
                    </span>
                    <h1 style="margin:0;font-size:20px;font-weight:700;color:${C.white};line-height:1.3;">
                      ${opts.headline}
                    </h1>
                    <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.65);">
                      ${opts.subline}
                    </p>
                  </td>
                  <td align="right" valign="top" style="padding-left:16px;min-width:120px;">
                    <span style="font-size:10px;color:rgba(255,255,255,0.55);line-height:1.6;">
                      ${timestamp}
                    </span>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Accent bar -->
            <div style="height:4px;background:linear-gradient(90deg,${opts.badgeColor} 0%,${opts.badgeColor}66 100%);"></div>

            <!-- Fields -->
            <div style="padding:8px 36px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                ${opts.fieldsHtml}
              </table>
            </div>

            ${ctaBlock}

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding-top:24px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:${C.primary};">
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

// ─── Low-level senders ────────────────────────────────────────────────────────

async function sendConfirmation(opts: Parameters<typeof buildConfirmationHtml>[0] & { to: string }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
  try {
    await transporter.sendMail({
      from: FROM,
      to: opts.to,
      subject: opts.subject,
      html: buildConfirmationHtml(opts),
    });
    console.log("[smtp] confirmation sent to:", opts.to);
  } catch (err) {
    console.error("[smtp] confirmation error:", err);
  }
}

async function sendNotification(opts: {
  to:       string[];
  subject:  string;
  formType: string;
  badgeColor: string;
  headline: string;
  subline:  string;
  fieldsHtml: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || opts.to.length === 0) return;
  try {
    await transporter.sendMail({
      from:    FROM,
      to:      opts.to.join(", "),
      subject: opts.subject,
      html:    buildNotificationHtml(opts),
    });
    console.log(`[smtp] ${opts.formType} notification sent to:`, opts.to);
  } catch (err) {
    console.error(`[smtp] ${opts.formType} notification error:`, err);
  }
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export function sendContactConfirmation(data: {
  email: string; firstName: string; lastName: string;
  phone: string; service?: string; message: string;
}) {
  return sendConfirmation({
    to:         data.email,
    subject:    `We got your message, ${data.firstName}! — Algonquin Nurses`,
    badgeLabel: "Message Received",
    badgeColor: C.accent,
    headline:   `Hi ${data.firstName}, your message is on its way to our team!`,
    firstName:  data.firstName,
    intro:      "Thank you for reaching out to Algonquin Nurses. A member of our care team will review your message and get back to you within 24 hours. Here's a copy of what you submitted:",
    fields:     [
      cField("Full Name",  `${data.firstName} ${data.lastName}`),
      cField("Phone",      data.phone),
      ...(data.service ? [cField("Service of Interest", SERVICE_LABELS[data.service] ?? data.service)] : []),
      cField("Message",    data.message),
    ].join(""),
    note:       "Need to speak with someone right away? We're available <strong>24 hours a day, 7 days a week</strong> — call us at <strong>(636) 274-1870</strong>.",
    ctaLabel:   "Explore Our Services",
    ctaHref:    "/services/private-duty-care",
  });
}

export function sendContactNotification(data: {
  to: string[]; firstName: string; lastName: string;
  email: string; phone: string; service?: string; message: string;
}) {
  const fields = [
    nField("Name",    `${data.firstName} ${data.lastName}`),
    nField("Email",   `<a href="mailto:${data.email}" style="color:${C.primary};text-decoration:none;">${data.email}</a>`),
    nField("Phone",   `<a href="tel:${data.phone.replace(/\D/g,"")}" style="color:${C.primary};text-decoration:none;">${data.phone}</a>`),
    ...(data.service ? [nField("Service", SERVICE_LABELS[data.service] ?? data.service)] : []),
    nField("Message", data.message, true),
  ].join("");

  return sendNotification({
    to:         data.to,
    subject:    `📬 New Contact Inquiry — ${data.firstName} ${data.lastName}`,
    formType:   "Contact Form",
    badgeColor: C.accent,
    headline:   `New contact inquiry from ${data.firstName} ${data.lastName}`,
    subline:    `Submitted via the website contact form`,
    fieldsHtml: fields,
  });
}

// ─── Referral ─────────────────────────────────────────────────────────────────

export function sendReferralConfirmation(data: {
  referrerEmail?: string; referrerName: string; referrerPhone: string;
  clientName: string; clientPhone?: string; service?: string; notes?: string;
}) {
  if (!data.referrerEmail) return Promise.resolve();
  const firstName = data.referrerName.split(" ")[0];
  return sendConfirmation({
    to:         data.referrerEmail,
    subject:    `Your referral for ${data.clientName} was received — Algonquin Nurses`,
    badgeLabel: "Referral Submitted",
    badgeColor: C.primary,
    headline:   `Thank you, ${firstName} — we'll reach out to ${data.clientName} soon!`,
    firstName,
    intro:      "We've received your client referral and our intake team will follow up with the client within 24 hours. Here's a summary of the referral you submitted:",
    fields:     [
      cField("Your Name",    data.referrerName),
      cField("Your Phone",   data.referrerPhone),
      cField("Client Name",  data.clientName),
      ...(data.clientPhone ? [cField("Client Phone", data.clientPhone)] : []),
      ...(data.service ? [cField("Service Needed", SERVICE_LABELS[data.service] ?? data.service)] : []),
      ...(data.notes ? [cField("Additional Notes", data.notes)] : []),
    ].join(""),
    note:       "Questions about your referral? Call us at <strong>(636) 274-1870</strong> and reference the client's name.",
    ctaLabel:   "View Our Services",
    ctaHref:    "/services/private-duty-care",
  });
}

export function sendReferralNotification(data: {
  to: string[]; referrerName: string; referrerPhone: string; referrerEmail?: string;
  clientName: string; clientPhone?: string; service?: string; notes?: string;
}) {
  const fields = [
    nField("Referrer",       data.referrerName),
    ...(data.referrerEmail  ? [nField("Referrer Email", `<a href="mailto:${data.referrerEmail}" style="color:${C.primary};text-decoration:none;">${data.referrerEmail}</a>`)] : []),
    nField("Referrer Phone", `<a href="tel:${data.referrerPhone.replace(/\D/g,"")}" style="color:${C.primary};text-decoration:none;">${data.referrerPhone}</a>`),
    nField("Client Name",    data.clientName),
    ...(data.clientPhone    ? [nField("Client Phone", `<a href="tel:${data.clientPhone.replace(/\D/g,"")}" style="color:${C.primary};text-decoration:none;">${data.clientPhone}</a>`)] : []),
    ...(data.service        ? [nField("Service", SERVICE_LABELS[data.service] ?? data.service)] : []),
    nField("Notes",          data.notes ?? "—", true),
  ].join("");

  return sendNotification({
    to:         data.to,
    subject:    `👤 New Client Referral — ${data.clientName} (via ${data.referrerName})`,
    formType:   "Client Referral",
    badgeColor: C.primary,
    headline:   `New referral: ${data.clientName}`,
    subline:    `Referred by ${data.referrerName}`,
    fieldsHtml: fields,
  });
}

// ─── Application ──────────────────────────────────────────────────────────────

export function sendApplicationConfirmation(data: {
  email: string; firstName: string; lastName: string;
  phone: string; position?: string;
}) {
  const positionLabel = data.position ? (POSITION_LABELS[data.position] ?? data.position) : undefined;
  return sendConfirmation({
    to:         data.email,
    subject:    `Application received, ${data.firstName}! — Algonquin Nurses Careers`,
    badgeLabel: "Application Received",
    badgeColor: C.primaryDark,
    headline:   `Great news, ${data.firstName} — your application is in our hands!`,
    firstName:  data.firstName,
    intro:      "Thank you for applying to join the Algonquin Nurses family. Our hiring team will review your application and reach out to you if your qualifications are a great match. Here's a summary of your submission:",
    fields:     [
      cField("Full Name", `${data.firstName} ${data.lastName}`),
      cField("Phone",     data.phone),
      ...(positionLabel ? [cField("Position Applied", positionLabel)] : []),
    ].join(""),
    note:       "Applications are typically reviewed within 3–5 business days. If you have questions, call us at <strong>(636) 274-1870</strong>.",
    ctaLabel:   "View Open Positions",
    ctaHref:    "/careers",
  });
}

export function sendApplicationNotification(data: {
  to: string[]; firstName: string; lastName: string;
  email: string; phone: string; position?: string;
}) {
  const fields = [
    nField("Name",     `${data.firstName} ${data.lastName}`),
    nField("Email",    `<a href="mailto:${data.email}" style="color:${C.primary};text-decoration:none;">${data.email}</a>`),
    nField("Phone",    `<a href="tel:${data.phone.replace(/\D/g,"")}" style="color:${C.primary};text-decoration:none;">${data.phone}</a>`),
    nField("Position", data.position ? (POSITION_LABELS[data.position] ?? data.position) : "—", true),
  ].join("");

  return sendNotification({
    to:         data.to,
    subject:    `💼 New Job Application — ${data.firstName} ${data.lastName}`,
    formType:   "Job Application",
    badgeColor: C.primaryDark,
    headline:   `New applicant: ${data.firstName} ${data.lastName}`,
    subline:    data.position ? `Applied for ${POSITION_LABELS[data.position] ?? data.position}` : "Position not specified",
    fieldsHtml: fields,
  });
}

// ─── Feedback ─────────────────────────────────────────────────────────────────

export function sendFeedbackConfirmation(data: {
  email: string; name?: string;
}) {
  const firstName = data.name ? data.name.split(" ")[0] : "there";
  return sendConfirmation({
    to:         data.email,
    subject:    `Thank you for your feedback${data.name ? `, ${firstName}` : ""}! — Algonquin Nurses`,
    badgeLabel: "Feedback Received",
    badgeColor: C.accent,
    headline:   `Your feedback means the world to us${data.name ? `, ${firstName}` : ""}!`,
    firstName,
    intro:      "We've received your feedback and it goes directly to our leadership team. Reviews like yours help us continue delivering the highest quality of care to families across St. Louis. Thank you for taking the time to share your experience.",
    fields:     [
      ...(data.name ? [cField("Name", data.name)] : []),
    ].join(""),
    note:       "If you'd like to discuss your experience further, please don't hesitate to call us at <strong>(636) 274-1870</strong>.",
    ctaLabel:   "Read More Stories",
    ctaHref:    "/feedback",
  });
}

export function sendFeedbackNotification(data: {
  to: string[]; name?: string; relationship?: string; rating?: number; message: string;
}) {
  const stars = data.rating ? "&#9733;".repeat(data.rating) + "&#9734;".repeat(5 - data.rating) : "—";
  const fields = [
    ...(data.name         ? [nField("Name",         data.name)] : []),
    ...(data.relationship ? [nField("Relationship", data.relationship)] : []),
    nField("Rating",   `<span style="color:#ca8a04;font-size:16px;">${stars}</span> ${data.rating ? `(${data.rating}/5)` : ""}`),
    nField("Feedback", data.message, true),
  ].join("");

  return sendNotification({
    to:         data.to,
    subject:    `⭐ New Client Feedback${data.name ? ` — ${data.name}` : ""}`,
    formType:   "Client Feedback",
    badgeColor: "#ca8a04",
    headline:   `New feedback submitted${data.name ? ` by ${data.name}` : ""}`,
    subline:    data.rating ? `Rated ${data.rating} out of 5 stars` : "No rating provided",
    fieldsHtml: fields,
  });
}

// ─── Chat lead ────────────────────────────────────────────────────────────────

export function sendChatLeadConfirmation(data: {
  email: string; name: string; phone: string; service?: string;
}) {
  const firstName = data.name.split(" ")[0];
  return sendConfirmation({
    to:         data.email,
    subject:    `We'll call you soon, ${firstName}! — Algonquin Nurses`,
    badgeLabel: "Chat Request Received",
    badgeColor: C.accentLight,
    headline:   `We've got your info, ${firstName} — talk soon!`,
    firstName,
    intro:      "Thank you for chatting with us on our website! A member of our care team will reach out to you very shortly. Here's what we have on file:",
    fields:     [
      cField("Name",  data.name),
      cField("Phone", data.phone),
      ...(data.service ? [cField("Service of Interest", SERVICE_LABELS[data.service] ?? data.service)] : []),
    ].join(""),
    note:       "Can't wait? Call us right now at <strong>(636) 274-1870</strong> — we're available <strong>24/7</strong>.",
    ctaLabel:   "Learn About Our Services",
    ctaHref:    "/services/private-duty-care",
  });
}
