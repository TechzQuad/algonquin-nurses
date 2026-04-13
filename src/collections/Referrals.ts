import type { CollectionConfig } from "payload";

export const Referrals: CollectionConfig = {
  slug: "referrals",
  labels: { singular: "Referral", plural: "Referrals" },
  admin: {
    useAsTitle: "clientName",
    defaultColumns: ["clientName", "referrerName", "service", "createdAt"],
    group: "Submissions",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "referrerName", type: "text", required: true },
    { name: "referrerPhone", type: "text", required: true },
    { name: "clientName", type: "text", required: true },
    { name: "clientPhone", type: "text" },
    {
      name: "service",
      type: "select",
      options: [
        { label: "Private Duty Care", value: "private-duty" },
        { label: "Medicaid In-Home Care", value: "medicaid" },
        { label: "Consumer Directed Services", value: "cds" },
        { label: "Youth & Children Program", value: "hcy" },
        { label: "Veterans Care", value: "veterans" },
        { label: "Not Sure / Other", value: "other" },
      ],
    },
    { name: "notes", type: "textarea" },
  ],
};
