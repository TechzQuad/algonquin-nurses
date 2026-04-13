import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "publishedAt", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({}),
    },
    {
      name: "publishedAt",
      type: "date",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          admin: { description: "Overrides the post title in <title> and og:title (50–60 chars ideal)" },
        },
        {
          name: "metaDescription",
          type: "textarea",
          admin: { description: "Meta description (140–160 chars ideal). Falls back to excerpt." },
        },
        {
          name: "keywords",
          type: "text",
          admin: { description: "Comma-separated focus keywords" },
        },
        {
          name: "noIndex",
          type: "checkbox",
          defaultValue: false,
          admin: { description: "Hide this post from search engines" },
        },
      ],
    },
  ],
};
