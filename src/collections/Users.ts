import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField } from "@/lib/access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  access: {
    // Admins and editors can list all users; others see only themselves
    read: ({ req }) => {
      if (!req.user) return false;
      const r = (req.user as { role?: string }).role ?? null;
      if (r === null || r === "administrator" || r === "editor") return true;
      return { id: { equals: req.user.id } };
    },
    // Only admins can create new users (registration is admin-only)
    create: isAdmin,
    // Admins can update anyone; others can only update their own profile
    update: ({ req }) => {
      if (!req.user) return false;
      const r = (req.user as { role?: string }).role ?? null;
      if (r === null || r === "administrator") return true;
      return { id: { equals: req.user.id } };
    },
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "subscriber",
      options: [
        { label: "Administrator", value: "administrator" },
        { label: "Editor", value: "editor" },
        { label: "Author", value: "author" },
        { label: "Contributor", value: "contributor" },
        { label: "Subscriber", value: "subscriber" },
      ],
      admin: {
        description:
          "Administrator: full control over all content and users. Editor: manage all content. Author: publish own posts and upload media. Contributor: draft own posts (cannot publish). Subscriber: profile only.",
      },
      access: {
        // Only admins can assign or change roles
        update: isAdminField,
      },
    },
  ],
};
