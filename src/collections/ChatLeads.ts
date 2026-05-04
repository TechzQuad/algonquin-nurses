import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "@/lib/access";

export const ChatLeads: CollectionConfig = {
  slug: "chat-leads",
  labels: { singular: "Chat Lead", plural: "Chat Leads" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "phone", "service", "createdAt"],
    group: "Submissions",
  },
  access: {
    read: isAdminOrEditor,
    create: () => false,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    {
      name: "service",
      type: "select",
      options: [
        { label: "Private Duty Care", value: "private-duty" },
        { label: "Medicaid In-Home Care", value: "medicaid" },
        { label: "Consumer Directed Services", value: "cds" },
        { label: "Healthy Youth & Children Program", value: "hcy" },
        { label: "Veterans Care", value: "veterans" },
      ],
    },
  ],
};
