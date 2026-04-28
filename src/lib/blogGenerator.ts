import Anthropic from "@anthropic-ai/sdk";

export type GeneratedPost = {
  title: string;
  slug: string;
  excerpt: string;
  focusKeyphrase: string;
  categories: string[];
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
  };
  content: string;
};

// ─── SEO Blog Template ────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an expert SEO content strategist for Algonquin Nurses, a licensed home health care agency in St. Louis, Missouri. Your job is to transform raw source documents into fully SEO-optimized blog posts that rank on Google and genuinely help families navigating home care.

BLOG POST TEMPLATE (follow this exact structure in the content field):
1. **Introduction** (2–3 paragraphs): Open with a hook that speaks to a real family pain point. Include the primary keyword naturally within the first 100 words. Establish trust.
2. **## [Descriptive H2 — core topic]**: Deep-dive into the main topic with facts, data, or expert context.
3. **## [Descriptive H2 — practical guidance]**: Step-by-step tips or actionable advice families can use today.
4. **## What St. Louis Families Need to Know**: Missouri-specific context — DHSS regulations, local Medicaid waiver programs, Area Agency on Aging, VA resources in St. Louis, etc.
5. **## Frequently Asked Questions**: 3–4 FAQs in Q&A format (use **Q:** and **A:** prefixes). Cover common concerns. This section is critical for Google featured snippets.
6. **## Ready to Get Started?**: Warm conclusion summarizing the key takeaway, followed by a clear call to action to contact Algonquin Nurses at (314) 555-0100 or via the website.

SEO WRITING RULES:
- Minimum 900 words in the content field
- Use the primary keyword 4–6 times naturally (never keyword-stuffed)
- Use related/semantic keywords throughout
- Write in second person ("you", "your family") — warm, empathetic, professional
- Every H2 should include a keyword variant or related phrase
- Use specific numbers and facts when possible
- Do NOT include an H1 in the content — the title field is the H1`;

const USER_PROMPT_TEMPLATE = `Transform the following document into an SEO-optimized blog post for Algonquin Nurses. Follow the system instructions exactly.

CATEGORIES (choose 1–2 that best fit):
- Home Care Tips
- Medicaid & Benefits
- Veterans Care
- Aging in Place
- Caregiver Resources
- Company News

Return ONLY a valid JSON object — no explanation, no markdown fences — with this exact structure:
{
  "title": "50–60 character keyword-rich headline",
  "slug": "url-friendly-3-to-6-word-slug",
  "excerpt": "2–3 sentence engaging summary that includes the primary keyword and hooks the reader.",
  "focusKeyphrase": "primary keyword phrase (2–5 words)",
  "categories": ["Category Name"],
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
  "seo": {
    "metaTitle": "50–60 char title | Algonquin Nurses",
    "metaDescription": "140–160 char description with keyword and subtle CTA.",
    "keywords": "keyword1, keyword2, keyword3, keyword4, keyword5",
    "ogTitle": "Social share title (can be slightly longer/more engaging than metaTitle)",
    "ogDescription": "1–2 sentence description for Facebook/LinkedIn cards."
  },
  "content": "Full markdown content following the template in the system prompt..."
}

SOURCE DOCUMENT:
{DOCUMENT}`;

export async function generateBlogPost(rawContent: string): Promise<GeneratedPost> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to your .env.local file to enable AI blog generation."
    );
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: USER_PROMPT_TEMPLATE.replace("{DOCUMENT}", rawContent.slice(0, 12000)),
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text.trim() : "";

  // Strip markdown code fences if Claude wrapped the JSON
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

  let parsed: GeneratedPost;
  try {
    parsed = JSON.parse(cleaned) as GeneratedPost;
  } catch {
    // Try to extract JSON object from surrounding text
    const match = cleaned.match(/\{[\s\S]+\}/);
    if (!match) {
      throw new Error("AI response did not contain valid JSON. Please try again.");
    }
    parsed = JSON.parse(match[0]) as GeneratedPost;
  }

  return parsed;
}
