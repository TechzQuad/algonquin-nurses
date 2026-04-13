import type { CollectionConfig } from "payload";

export const Feedback: CollectionConfig = {
  slug: "feedback",
  labels: { singular: "Feedback", plural: "Feedback" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "rating", "relationship", "createdAt"],
    group: "Submissions",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text" },
    {
      name: "relationship",
      type: "select",
      options: [
        { label: "I am the client", value: "client" },
        { label: "Family member", value: "family" },
        { label: "Friend", value: "friend" },
        { label: "Other", value: "other" },
      ],
    },
    { name: "rating", type: "number", min: 0, max: 5 },
    { name: "message", type: "textarea", required: true },
  ],
};
