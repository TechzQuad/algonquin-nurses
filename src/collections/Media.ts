import type { CollectionConfig } from "payload";
import { isAdminOrEditor, isAdminEditorOrAuthor } from "@/lib/access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: isAdminEditorOrAuthor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "hero", width: 1600, height: 900, position: "centre" },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
