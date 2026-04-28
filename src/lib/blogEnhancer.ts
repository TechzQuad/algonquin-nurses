import Anthropic from "@anthropic-ai/sdk";
import { lexicalToMarkdown } from "./lexicalToMarkdown";
import { markdownToLexical } from "./markdownToLexical";

// ─── Site structure for internal linking ──────────────────────────────────────

const SITE_PAGES = [
  { title: "Home Health Care Services", url: "/services", description: "Overview of all home health care services offered by Algonquin Nurses" },
  { title: "About Algonquin Nurses", url: "/about", description: "Company history, mission, and team" },
  { title: "Careers — Join Our Team", url: "/careers", description: "Job openings for home health aides and nurses" },
  { title: "Contact Us", url: "/contact", description: "Get in touch with the Algonquin Nurses team" },
  { title: "Blog & Resources", url: "/blog", description: "All articles on home health care" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

export type EnhancedPost = {
  content: ReturnType<typeof markdownToLexical>;
  focusKeyphrase: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
  };
};

type MediaItem = { id: string | number; alt?: string | null; url?: string | null };
type PostLink = { title: string; slug: string; excerpt?: string | null };
type ServiceItem = { title?: string | null; slug?: string | null; description?: string | null };

// ─── Prompt ───────────────────────────────────────────────────────────────────

function buildPrompt(
  markdown: string,
  currentTitle: string,
  focusKeyphrase: string | null | undefined,
  otherPosts: PostLink[],
  services: ServiceItem[],
  media: MediaItem[]
): string {
  const postLinks = otherPosts
    .slice(0, 8)
    .map((p) => `- "${p.title}" → /blog/${p.slug}${p.excerpt ? ` (${p.excerpt.slice(0, 80)}…)` : ""}`)
    .join("\n");

  const serviceLinks = services
    .slice(0, 6)
    .map((s) => `- "${s.title ?? "Service"}" → /services${s.slug ? `/${s.slug}` : ""}`)
    .join("\n");

  const siteLinks = SITE_PAGES.map((p) => `- "${p.title}" → ${p.url} (${p.description})`).join("\n");

  const imageList = media
    .slice(0, 10)
    .map((m) => `- ID:${m.id} | alt: "${m.alt ?? "image"}"${m.url ? ` | url: ${m.url}` : ""}`)
    .join("\n");

  return `You are an expert SEO editor for Algonquin Nurses, a home health care agency in St. Louis, Missouri. Your job is to enhance an existing blog post draft so it achieves maximum Google rankings while providing genuine value to readers.

POST TITLE: ${currentTitle}
FOCUS KEYPHRASE: ${focusKeyphrase || "(detect from content)"}

AVAILABLE INTERNAL PAGES FOR LINKING:
${siteLinks}

AVAILABLE SERVICE PAGES:
${serviceLinks || "(none yet)"}

OTHER BLOG POSTS TO LINK TO:
${postLinks || "(no other posts yet)"}

AVAILABLE IMAGES (use [IMAGE:ID] marker to insert):
${imageList || "(no images available — do not insert image markers)"}

ENHANCEMENT RULES:
1. **Internal links** — weave 3–6 natural internal links into the text using Markdown link syntax [anchor text](url). Spread them across different sections. Never link the same URL twice. Links must be genuinely relevant to the surrounding text.
2. **Image insertion** — if images are available, insert 1–3 using [IMAGE:ID] on its own line at logical visual break points (after the intro, mid-article, before FAQs). Pick images whose alt text best matches the surrounding topic. Skip entirely if no images are available.
3. **SEO headings** — ensure H2/H3 headings contain keyword variations, questions, or action phrases.
4. **Focus keyphrase** — use it naturally 4–6 times. Never stuff. Include it in the first paragraph and at least one H2.
5. **Formatting** — use bullet lists for multi-item concepts, bold for key terms, blockquotes for impactful stats or quotes.
6. **Tone** — warm, empathetic, second-person ("you", "your family"). Professional but not clinical.
7. **Length** — do NOT shorten the content. You may expand sections with useful detail.
8. **Do NOT change** the overall structure, remove sections, or alter CTAs.

CURRENT CONTENT (markdown):
${markdown}

Return ONLY a valid JSON object — no explanation, no code fences:
{
  "focusKeyphrase": "detected or confirmed primary keyword phrase",
  "seo": {
    "metaTitle": "50–60 char keyword-rich title | Algonquin Nurses",
    "metaDescription": "140–160 char meta description with keyword and implicit CTA",
    "keywords": "keyword1, keyword2, keyword3, keyword4, keyword5",
    "ogTitle": "Engaging social share title",
    "ogDescription": "1–2 sentence social share description"
  },
  "content": "Full enhanced markdown content with internal links and [IMAGE:ID] markers..."
}`;
}

// ─── Main enhancer function ───────────────────────────────────────────────────

export async function enhanceBlogPost(
  postContent: unknown,
  postTitle: string,
  focusKeyphrase: string | null | undefined,
  otherPosts: PostLink[],
  services: ServiceItem[],
  media: MediaItem[]
): Promise<EnhancedPost> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }

  // Convert current Lexical content to markdown for Claude
  const currentMarkdown = lexicalToMarkdown(postContent);
  if (!currentMarkdown.trim()) {
    throw new Error("Post content is empty — nothing to enhance.");
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = buildPrompt(
    currentMarkdown,
    postTitle,
    focusKeyphrase,
    otherPosts,
    services,
    media
  );

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "";
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

  let parsed: { focusKeyphrase: string; seo: EnhancedPost["seo"]; content: string };
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]+\}/);
    if (!match) throw new Error("AI response did not contain valid JSON.");
    parsed = JSON.parse(match[0]);
  }

  // Convert enhanced markdown back to Payload Lexical JSON
  const lexicalContent = markdownToLexical(parsed.content);

  return {
    content: lexicalContent,
    focusKeyphrase: parsed.focusKeyphrase,
    seo: parsed.seo,
  };
}
