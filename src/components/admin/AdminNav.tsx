"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, BarChart2, Image, Users,
  FileText, ClipboardList, UserCog, Settings, ChevronRight,
  Star,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Sub = { label: string; href: string; apiSlug?: string };
type Item =
  | { type: "link";    label: string; href: string;            icon: React.ReactNode; apiSlug?: string }
  | { type: "group";   label: string; icon: React.ReactNode;   children: Sub[] };
type Section = { heading?: string; items: Item[] };

// ─── Menu definition ─────────────────────────────────────────────────────────

const MENU: Section[] = [
  {
    items: [
      { type: "link",  label: "Dashboard",  href: "/admin",           icon: <LayoutDashboard size={16} />, },
      { type: "link",  label: "Analytics",  href: "/admin/analytics", icon: <BarChart2      size={16} />, },
    ],
  },
  {
    heading: "Content",
    items: [
      { type: "link",  label: "Media",        href: "/admin/collections/media",        icon: <Image         size={16} />, apiSlug: "media" },
      { type: "link",  label: "Team",         href: "/admin/collections/team",         icon: <Users         size={16} />, apiSlug: "team" },
      { type: "link",  label: "Testimonials", href: "/admin/collections/testimonials", icon: <Star          size={16} />, apiSlug: "testimonials" },
      {
        type: "group", label: "Posts", icon: <FileText size={16} />,
        children: [
          { label: "All Posts",   href: "/admin/collections/posts",          apiSlug: "posts" },
          { label: "Add New",     href: "/admin/collections/posts/create" },
          { label: "Categories",  href: "/admin/collections/categories",     apiSlug: "categories" },
        ],
      },
    ],
  },
  {
    heading: "Form Submissions",
    items: [
      {
        type: "group", label: "All Forms", icon: <ClipboardList size={16} />,
        children: [
          { label: "Contact",          href: "/admin/collections/contact-submissions", apiSlug: "contact-submissions" },
          { label: "Referrals",        href: "/admin/collections/referrals",           apiSlug: "referrals" },
          { label: "Feedback",         href: "/admin/collections/feedback",            apiSlug: "feedback" },
          { label: "Job Applications", href: "/admin/collections/applications",        apiSlug: "applications" },
          { label: "Chat Leads",       href: "/admin/collections/chat-leads",          apiSlug: "chat-leads" },
        ],
      },
    ],
  },
  {
    heading: "Admin",
    items: [
      { type: "link", label: "Users",    href: "/admin/collections/users", icon: <UserCog  size={16} />, apiSlug: "users" },
      { type: "link", label: "Settings", href: "/admin/account",           icon: <Settings size={16} /> },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({
    "Posts": true, "All Forms": true,
  });

  // Active-state helper
  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  function toggleGroup(label: string) {
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  // ── Styles ──
  const s = {
    navRoot: {
      padding:    "8px 0 80px",
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    } as React.CSSProperties,
    sectionHeading: {
      padding:       "16px 20px 6px",
      fontSize:      "10px",
      fontWeight:    700,
      textTransform: "uppercase" as const,
      letterSpacing: "0.1em",
      color:         "rgba(179,207,255,0.4)",
    },
    linkBase: (active: boolean): React.CSSProperties => ({
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "space-between",
      gap:             "10px",
      padding:         "9px 16px 9px 20px",
      margin:          "1px 8px",
      borderRadius:    "8px",
      fontSize:        "13.5px",
      fontWeight:      active ? 600 : 400,
      color:           active ? "#ffffff" : "rgba(210,228,255,0.82)",
      background:      active ? "rgba(13,148,136,0.28)" : "transparent",
      borderLeft:      active ? "3px solid #0d9488" : "3px solid transparent",
      textDecoration:  "none",
      cursor:          "pointer",
      transition:      "all 0.15s ease",
    }),
    iconWrap: (active: boolean): React.CSSProperties => ({
      display:    "flex",
      alignItems: "center",
      opacity:    active ? 1 : 0.7,
      color:      active ? "#0d9488" : "rgba(180,210,255,0.7)",
      flexShrink: 0,
    }),
    labelWrap: {
      display:  "flex",
      alignItems: "center",
      gap:      "10px",
      flex:     1,
      minWidth: 0,
    } as React.CSSProperties,
    subItem: (active: boolean): React.CSSProperties => ({
      display:        "flex",
      alignItems:     "center",
      justifyContent: "space-between",
      padding:        "7px 16px 7px 52px",
      margin:         "1px 8px",
      borderRadius:   "7px",
      fontSize:       "13px",
      fontWeight:     active ? 600 : 400,
      color:          active ? "#ffffff" : "rgba(200,222,255,0.7)",
      background:     active ? "rgba(13,148,136,0.22)" : "transparent",
      textDecoration: "none",
      transition:     "all 0.15s ease",
    }),
    divider: {
      height:    "1px",
      margin:    "8px 20px",
      background:"rgba(255,255,255,0.07)",
    } as React.CSSProperties,
  };

  return (
    <div style={s.navRoot}>
      {MENU.map((section, si) => (
        <div key={si}>
          {si > 0 && <div style={s.divider} />}
          {section.heading && (
            <p style={s.sectionHeading}>{section.heading}</p>
          )}

          {section.items.map((item) => {
            if (item.type === "link") {
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href} style={s.linkBase(active)}>
                  <span style={s.labelWrap}>
                    <span style={s.iconWrap(active)}>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                </Link>
              );
            }

            // type === "group"
            const isOpen       = open[item.label] ?? false;
            const anyChildActive = item.children.some((c) => isActive(c.href));
            const groupActive  = anyChildActive;

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleGroup(item.label)}
                  style={{
                    ...s.linkBase(groupActive),
                    width:      "100%",
                    background: groupActive ? "rgba(13,148,136,0.18)" : "transparent",
                    border:     "none",
                    textAlign:  "left",
                  }}
                >
                  <span style={s.labelWrap}>
                    <span style={s.iconWrap(groupActive)}>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <ChevronRight
                    size={13}
                    style={{
                      opacity:    0.5,
                      transition: "transform 0.2s ease",
                      transform:  isOpen ? "rotate(90deg)" : "none",
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isOpen && (
                  <div style={{ paddingBottom: "2px" }}>
                    {item.children.map((child) => {
                      const active = isActive(child.href);
                      return (
                        <Link key={child.href} href={child.href} style={s.subItem(active)}>
                          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span
                              style={{
                                width:        "4px",
                                height:       "4px",
                                borderRadius: "50%",
                                background:   active ? "#0d9488" : "rgba(255,255,255,0.3)",
                                flexShrink:   0,
                              }}
                            />
                            {child.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
