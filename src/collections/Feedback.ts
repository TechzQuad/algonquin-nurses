import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "@/lib/access";

export const Feedback: CollectionConfig = {
  slug: "feedback",
  labels: { singular: "Feedback", plural: "Feedback" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "rating", "relationship", "createdAt"],
    group: "Submissions",
  },
  access: {
    read: isAdminOrEditor,
    create: () => false,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
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
