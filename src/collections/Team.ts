import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "@/lib/access";

export const Team: CollectionConfig = {
  slug: "team",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "updatedAt"],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
};
