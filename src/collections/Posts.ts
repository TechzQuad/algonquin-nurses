import type { CollectionConfig } from "payload";
import { lexicalEditor, HorizontalRuleFeature } from "@payloadcms/richtext-lexical";
import { enhanceBlogPost } from "@/lib/blogEnhancer";

// Module-level set prevents the afterChange hook from triggering itself
// when it calls payload.update() to save the enhanced content.
const enhancingIds = new Set<string | number>();

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt", "updatedAt"],
    description: "Blog posts and articles. New posts start as Draft by default.",
    // Preview button — opens the post in the browser with Draft Mode enabled
    preview: (doc, { token }) => {
      const base =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      return `${base}/api/preview?slug=${doc.slug}&token=${token}`;
    },
    livePreview: {
      url: ({ data }) => {
        const base =
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        return `${base}/blog/${data.slug}`;
      },
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { status: { equals: "published" } };
    },
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          data.slug = (data.title as string)
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .slice(0, 100);
        }
        return data;
      },
    ],
    beforeChange: [
      ({ data, originalDoc }) => {
        if (
          data.status === "published" &&
          !data.publishedAt &&
          !originalDoc?.publishedAt
        ) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        // Skip if this update was triggered by our own enhancement (prevents infinite loop)
        if (enhancingIds.has(doc.id)) return doc;
        // Skip if no AI key configured or content is empty
        if (!process.env.ANTHROPIC_API_KEY || !doc.content) return doc;

        enhancingIds.add(doc.id);

        try {
          // Fetch other posts for internal link suggestions
          const { docs: otherPosts } = await req.payload.find({
            collection: "posts",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            where: { and: [{ id: { not_equals: doc.id } }, { status: { equals: "published" } }] } as any,
            limit: 8,
            depth: 0,
          });

          // Fetch services for internal links
          let services: { title?: string | null; slug?: string | null; description?: string | null }[] = [];
          try {
            const { docs: svcDocs } = await req.payload.find({
              collection: "services",
              limit: 10,
              depth: 0,
            });
            services = svcDocs as typeof services;
          } catch {
            // services collection may not exist
          }

          // Fetch media images for inline image insertion
          const { docs: mediaDocs } = await req.payload.find({
            collection: "media",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            where: { mimeType: { contains: "image" } } as any,
            limit: 10,
            depth: 0,
          });

          const media = mediaDocs.map((m) => ({
            id: (m as { id: string | number }).id,
            alt: (m as { alt?: string }).alt ?? null,
            url: (m as { url?: string }).url ?? null,
          }));

          const enhanced = await enhanceBlogPost(
            doc.content,
            doc.title as string,
            doc.focusKeyphrase as string | null,
            otherPosts.map((p) => ({
              title: (p as { title: string }).title,
              slug: (p as { slug: string }).slug,
              excerpt: (p as { excerpt?: string }).excerpt ?? null,
            })),
            services,
            media
          );

          // Save enhanced content back — enhancingIds prevents re-triggering
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (req.payload as any).update({
            collection: "posts",
            id: doc.id,
            data: {
              content: enhanced.content,
              focusKeyphrase: enhanced.focusKeyphrase,
              seo: {
                ...(doc.seo ?? {}),
                metaTitle: enhanced.seo.metaTitle,
                metaDescription: enhanced.seo.metaDescription,
                keywords: enhanced.seo.keywords,
                ogTitle: enhanced.seo.ogTitle,
                ogDescription: enhanced.seo.ogDescription,
              },
            },
          });
        } catch (err) {
          // Enhancement is best-effort — never block the original save
          console.error("[blogEnhancer] Enhancement failed for post", doc.id, err);
        } finally {
          enhancingIds.delete(doc.id);
        }

        return doc;
      },
    ],
  },
  fields: [
    // ── Document Import Panel (top of form) ──────────────────────────────
    {
      name: "importPanel",
      type: "ui",
      admin: {
        components: {
          Field: "@/components/admin/BlogImportPanel",
        },
      },
    },

    // ── Core content ─────────────────────────────────────────────────────
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "H1 headline — 50–60 characters is ideal for SEO." },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "URL path (e.g. home-care-tips-st-louis). Auto-generated from title if left blank.",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: {
        description:
          "2–3 sentence summary. Shown on the blog index and used as the default meta description.",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      admin: { description: "Recommended: 1600×900 px (16:9). Alt text is required for SEO." },
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, HorizontalRuleFeature()],
      }),
    },

    // ── Taxonomy ─────────────────────────────────────────────────────────
    {
      name: "categories",
      type: "relationship",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      relationTo: "categories" as any,
      hasMany: true,
      admin: {
        position: "sidebar",
        description: "Choose one or two categories.",
      },
    },
    {
      name: "tags",
      type: "array",
      admin: {
        description: "Keyword tags for related content and SEO.",
      },
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },

    // ── Publishing ────────────────────────────────────────────────────────
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Pending Review", value: "pending_review" },
        { label: "Published", value: "published" },
      ],
      admin: {
        position: "sidebar",
        description:
          'Set to "Published" to make this post live. New posts default to Draft.',
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        description: "Auto-set when first published. Override to backdate or schedule.",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Displayed as the hero featured post on the blog index.",
      },
    },

    // ── SEO ───────────────────────────────────────────────────────────────
    {
      name: "focusKeyphrase",
      type: "text",
      admin: {
        description:
          "Primary keyword phrase this post targets (e.g. 'home health care St. Louis').",
      },
    },
    {
      name: "seo",
      type: "group",
      label: "SEO & Social",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          admin: {
            description:
              "Page <title> tag. 50–60 chars ideal. Falls back to post title.",
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
          admin: {
            description:
              "Meta description for Google. 140–160 chars ideal. Falls back to excerpt.",
          },
        },
        {
          name: "keywords",
          type: "text",
          admin: { description: "Comma-separated focus keywords for this post." },
        },
        {
          name: "ogTitle",
          type: "text",
          admin: {
            description: "Open Graph title for Facebook/LinkedIn shares. Falls back to metaTitle.",
          },
        },
        {
          name: "ogDescription",
          type: "textarea",
          admin: {
            description:
              "Open Graph description for social shares. Falls back to metaDescription.",
          },
        },
        {
          name: "canonicalUrl",
          type: "text",
          admin: {
            description:
              "Override the canonical URL (e.g. if content appears elsewhere first).",
          },
        },
        {
          name: "noIndex",
          type: "checkbox",
          defaultValue: false,
          admin: { description: "Hide this post from search engine crawlers." },
        },
      ],
    },
  ],
};
