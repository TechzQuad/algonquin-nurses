import type { CollectionConfig } from "payload";

export const Resumes: CollectionConfig = {
  slug: "application-forms",
  labels: { singular: "Application Form", plural: "Application Forms" },
  admin: {
    group: "Submissions",
    defaultColumns: ["filename", "createdAt"],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    staticDir: "application-forms",
    mimeTypes: ["application/pdf"],
  },
  fields: [],
};
