import type { Access, FieldAccess } from "payload";

type Role = "administrator" | "editor" | "author" | "contributor" | "subscriber";

function getRole(user: unknown): Role | null {
  return (user as { role?: Role } | null)?.role ?? null;
}

// Users with no role set are treated as administrator (backward compat for existing accounts)
function check(roles: Role[]): Access {
  return ({ req }) => {
    if (!req.user) return false;
    const r = getRole(req.user);
    if (r === null) return true;
    return roles.includes(r);
  };
}

export const isAdmin: Access = check(["administrator"]);
export const isAdminOrEditor: Access = check(["administrator", "editor"]);
export const isAdminEditorOrAuthor: Access = check(["administrator", "editor", "author"]);
export const isLoggedIn: Access = ({ req }) => Boolean(req.user);

// Posts: public sees published only; authenticated sees based on role
export const canReadPost: Access = ({ req: { user } }) => {
  if (!user) return { status: { equals: "published" } };
  const r = getRole(user);
  if (r === null || r === "administrator" || r === "editor") return true;
  if (r === "author" || r === "contributor") {
    return { or: [{ status: { equals: "published" } }, { author: { equals: user.id } }] };
  }
  return { status: { equals: "published" } };
};

export const canCreatePost: Access = check(["administrator", "editor", "author", "contributor"]);

// Admin/editor = any post; author/contributor = own posts only
export const canUpdatePost: Access = ({ req: { user } }) => {
  if (!user) return false;
  const r = getRole(user);
  if (r === null || r === "administrator" || r === "editor") return true;
  if (r === "author" || r === "contributor") return { author: { equals: user.id } };
  return false;
};

// Admin/editor = any post; author = own posts; contributor/subscriber = no
export const canDeletePost: Access = ({ req: { user } }) => {
  if (!user) return false;
  const r = getRole(user);
  if (r === null || r === "administrator" || r === "editor") return true;
  if (r === "author") return { author: { equals: user.id } };
  return false;
};

// Field-level: only admins can change the role field on a user document
export const isAdminField: FieldAccess = ({ req }) => {
  if (!req.user) return false;
  const r = getRole(req.user);
  return r === null || r === "administrator";
};
