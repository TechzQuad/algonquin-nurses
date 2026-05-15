const PROJECT_ID = process.env.RECAPTCHA_PROJECT_ID!;
const API_KEY = process.env.RECAPTCHA_API_KEY!;
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
const SCORE_THRESHOLD = 0.5;

interface EnterpriseAssessment {
  tokenProperties?: { valid: boolean; action?: string };
  riskAnalysis?: { score: number };
}

export async function verifyRecaptcha(token: string, expectedAction: string): Promise<boolean> {
  if (!PROJECT_ID || !API_KEY || !SITE_KEY) {
    console.warn("[recaptcha] env vars missing — skipping verification");
    return true;
  }
  if (!token) return false;

  try {
    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments?key=${API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: { token, siteKey: SITE_KEY, expectedAction } }),
    });

    if (!res.ok) {
      console.error("[recaptcha] assessment HTTP error", res.status);
      return false;
    }

    const data: EnterpriseAssessment = await res.json();

    if (!data.tokenProperties?.valid) {
      console.warn("[recaptcha] invalid token");
      return false;
    }

    const score = data.riskAnalysis?.score ?? 0;
    return score >= SCORE_THRESHOLD;
  } catch (err) {
    console.error("[recaptcha] verification failed", err);
    return false;
  }
}
