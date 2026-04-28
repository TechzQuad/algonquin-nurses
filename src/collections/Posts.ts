import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt", "updatedAt"],
    description: "Blog posts and articles. New posts start as Draft by default.",
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
      editor: lexicalEditor({}),
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
