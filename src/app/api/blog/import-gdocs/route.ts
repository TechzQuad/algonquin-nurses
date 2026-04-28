import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { generateBlogPost } from "@/lib/blogGenerator";
import { markdownToLexical } from "@/lib/markdownToLexical";

function extractDocId(url: string): string | null {
  const m = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient();

    // Verify Payload session
    const { user } = await payload.auth({ headers: req.headers });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const url: string = body?.url ?? "";
    if (!url.trim()) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const docId = extractDocId(url);
    if (!docId) {
      return NextResponse.json(
        { error: "Invalid Google Docs URL. Paste the full sharing link." },
        { status: 400 }
      );
    }

    // Export as plain text (requires the doc to be shared publicly or to anyone with the link)
    const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
    let rawContent: string;
    try {
      const docRes = await fetch(exportUrl, { redirect: "follow" });
      if (!docRes.ok) {
        return NextResponse.json(
          {
            error:
              'Could not fetch the document. Make sure sharing is set to "Anyone with the link can view".',
          },
          { status: 400 }
        );
      }
      rawContent = await docRes.text();
    } catch {
      return NextResponse.json(
        { error: "Network error while fetching the Google Doc." },
        { status: 502 }
      );
    }

    if (!rawContent.trim()) {
      return NextResponse.json({ error: "The document appears to be empty." }, { status: 400 });
    }

    // Generate SEO-optimized content with Claude
    const generated = await generateBlogPost(rawContent);

    // Convert markdown content → Payload Lexical JSON
    const lexicalContent = markdownToLexical(generated.content);

    // Create the post in Payload with status: draft
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createPayload = payload as any;
    const post = await createPayload.create({
      collection: "posts",
      data: {
        title: generated.title,
        slug: generated.slug,
        excerpt: generated.excerpt,
        status: "draft",
        focusKeyphrase: generated.focusKeyphrase,
        tags: generated.tags.map((tag: string) => ({ tag })),
        content: lexicalContent,
        seo: {
          metaTitle: generated.seo.metaTitle,
          metaDescription: generated.seo.metaDescription,
          keywords: generated.seo.keywords,
        },
      },
      overrideAccess: false,
      user,
    });

    return NextResponse.json({ success: true, postId: post.id, slug: post.slug });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Import failed";
    console.error("[import-gdocs]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
