import type { CollectionConfig } from "payload";

export const Resumes: CollectionConfig = {
  slug: "resumes",
  labels: { singular: "Resume", plural: "Resumes" },
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
    staticDir: "resumes",
    mimeTypes: ["application/pdf"],
  },
  fields: [],
};
