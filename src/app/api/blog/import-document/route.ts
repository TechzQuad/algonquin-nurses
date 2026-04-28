import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { generateBlogPost } from "@/lib/blogGenerator";
import { markdownToLexical } from "@/lib/markdownToLexical";

const SUPPORTED_TYPES = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "text/plain",
];

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient();

    const { user } = await payload.auth({ headers: req.headers });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const name = file.name.toLowerCase();
    const isDocx = name.endsWith(".docx");
    const isTxt = name.endsWith(".txt") || file.type === "text/plain";

    if (!isDocx && !isTxt) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a .docx or .txt file." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let rawContent = "";

    if (isDocx) {
      // Dynamic import so mammoth (CJS) works in ESM Next.js
      const mammoth = await import("mammoth");
      const result = await mammoth.default.extractRawText({ buffer });
      rawContent = result.value;
    } else {
      rawContent = buffer.toString("utf-8");
    }

    if (!rawContent.trim()) {
      return NextResponse.json({ error: "The file appears to be empty." }, { status: 400 });
    }

    const generated = await generateBlogPost(rawContent);
    const lexicalContent = markdownToLexical(generated.content);

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
    console.error("[import-document]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Allow large uploads (docx can be several MB)
export const config = {
  api: { bodyParser: false },
};
