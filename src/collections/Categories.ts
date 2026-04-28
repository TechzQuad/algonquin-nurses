import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "description"],
    description: "Blog post categories for organization and SEO filtering.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL-friendly identifier (e.g. home-care-tips)" },
    },
    {
      name: "description",
      type: "textarea",
      admin: { description: "Short description shown on category pages and used for SEO." },
    },
    {
      name: "color",
      type: "text",
      admin: { description: "Hex color for the category badge (e.g. #10b981)" },
    },
  ],
};
