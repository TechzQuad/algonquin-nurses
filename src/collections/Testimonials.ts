import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "@/lib/access";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "rating", "updatedAt"],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
