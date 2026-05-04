import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "@/lib/access";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: { singular: "Contact Submission", plural: "Contact Submissions" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "email", "service", "createdAt"],
    group: "Submissions",
  },
  access: {
    read: isAdminOrEditor,
    create: () => false,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
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
        { label: "Other", value: "other" },
      ],
    },
    { name: "message", type: "textarea", required: true },
  ],
};
