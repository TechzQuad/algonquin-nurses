import type { CollectionConfig } from "payload";

export const Applications: CollectionConfig = {
  slug: "applications",
  labels: { singular: "Caregiver Application", plural: "Caregiver Applications" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "email", "position", "createdAt"],
    group: "Submissions",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    {
      name: "position",
      type: "select",
      options: [
        { label: "Certified Nursing Assistant (CNA)", value: "cna" },
        { label: "Home Health Aide", value: "hha" },
        { label: "Registered Nurse (RN)", value: "rn" },
        { label: "Licensed Practical Nurse (LPN)", value: "lpn" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "applicationForm",
      type: "upload",
      relationTo: "application-forms",
    },
  ],
};
