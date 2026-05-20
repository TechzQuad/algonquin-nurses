"use client";

import { useState } from "react";
import { SetStepNav } from "@payloadcms/ui";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ─── Palette ─────────────────────────────────────────────────────────────────

const P = {
  primary:  "#3b5d95",
  accent:   "#0d9488",
  bg:       "#f4f7fb",
  card:     "#ffffff",
  border:   "#e5e7eb",
  text:     "#1a1a2e",
  muted:    "#6b7280",
  grid:     "#f3f4f6",
  green:    "#10b981",
  red:      "#ef4444",
  amber:    "#f59e0b",
  purple:   "#7c3aed",
};

// ─── Dummy data ───────────────────────────────────────────────────────────────

const TRAFFIC_30D = [
  { day: "May 1",  users: 42,  sessions: 58,  pageviews: 143 },
  { day: "May 2",  users: 38,  sessions: 51,  pageviews: 120 },
  { day: "May 3",  users: 55,  sessions: 74,  pageviews: 198 },
  { day: "May 4",  users: 61,  sessions: 83,  pageviews: 211 },
  { day: "May 5",  users: 70,  sessions: 95,  pageviews: 252 },
  { day: "May 6",  users: 48,  sessions: 63,  pageviews: 160 },
  { day: "May 7",  users: 35,  sessions: 44,  pageviews: 110 },
  { day: "May 8",  users: 72,  sessions: 98,  pageviews: 264 },
  { day: "May 9",  users: 80,  sessions: 109, pageviews: 291 },
  { day: "May 10", users: 88,  sessions: 118, pageviews: 310 },
  { day: "May 11", users: 65,  sessions: 87,  pageviews: 223 },
  { day: "May 12", users: 59,  sessions: 79,  pageviews: 201 },
  { day: "May 13", users: 44,  sessions: 59,  pageviews: 148 },
  { day: "May 14", users: 50,  sessions: 68,  pageviews: 175 },
  { day: "May 15", users: 93,  sessions: 124, pageviews: 338 },
  { day: "May 16", users: 102, sessions: 136, pageviews: 367 },
  { day: "May 17", users: 97,  sessions: 130, pageviews: 351 },
  { day: "May 18", users: 85,  sessions: 114, pageviews: 305 },
  { day: "May 19", users: 78,  sessions: 104, pageviews: 278 },
  { day: "May 20", users: 110, sessions: 148, pageviews: 402 },
  { day: "May 21", users: 125, sessions: 168, pageviews: 451 },
  { day: "May 22", users: 118, sessions: 158, pageviews: 426 },
  { day: "May 23", users: 108, sessions: 144, pageviews: 390 },
  { day: "May 24", users: 95,  sessions: 127, pageviews: 341 },
  { day: "May 25", users: 82,  sessions: 110, pageviews: 294 },
  { day: "May 26", users: 76,  sessions: 101, pageviews: 271 },
  { day: "May 27", users: 133, sessions: 178, pageviews: 480 },
  { day: "May 28", users: 145, sessions: 194, pageviews: 523 },
  { day: "May 29", users: 138, sessions: 185, pageviews: 498 },
  { day: "May 30", users: 152, sessions: 203, pageviews: 547 },
];

const CHANNELS = [
  { name: "Organic Search", value: 42, color: P.accent  },
  { name: "Direct",         value: 28, color: P.primary },
  { name: "Referral",       value: 16, color: P.amber   },
  { name: "Social",         value: 10, color: P.purple  },
  { name: "Other",          value: 4,  color: P.muted   },
];

const TOP_PAGES = [
  { page: "/",                            title: "Home",                  views: 1842, avgTime: "2m 14s", bounce: "38%" },
  { page: "/services/medicaid-in-home-care", title: "Medicaid In-Home Care", views: 1204, avgTime: "3m 08s", bounce: "29%" },
  { page: "/careers",                     title: "Careers",               views: 987,  avgTime: "2m 51s", bounce: "34%" },
  { page: "/contact",                     title: "Contact",               views: 854,  avgTime: "1m 44s", bounce: "42%" },
  { page: "/client-referral",             title: "Client Referral",       views: 621,  avgTime: "2m 22s", bounce: "31%" },
  { page: "/blog",                        title: "Blog",                  views: 543,  avgTime: "2m 59s", bounce: "45%" },
  { page: "/services/consumer-directed",  title: "Consumer Directed Svcs",views: 498,  avgTime: "3m 14s", bounce: "27%" },
  { page: "/feedback",                    title: "Feedback",              views: 312,  avgTime: "1m 33s", bounce: "50%" },
];

const DEVICES = [
  { name: "Mobile",  value: 58, color: P.accent  },
  { name: "Desktop", value: 34, color: P.primary },
  { name: "Tablet",  value: 8,  color: P.amber   },
];

const MONTHLY_USERS = [
  { month: "Dec",  users: 1240 },
  { month: "Jan",  users: 1580 },
  { month: "Feb",  users: 1390 },
  { month: "Mar",  users: 1820 },
  { month: "Apr",  users: 2140 },
  { month: "May",  users: 2680 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, color, trend }: {
  label: string; value: string; sub: string; color: string; trend?: "up" | "down";
}) {
  return (
    <div style={{
      background: P.card, border: `1px solid ${P.border}`, borderRadius: "14px",
      padding: "20px 24px", borderTop: `3px solid ${color}`, flex: 1, minWidth: 0,
    }}>
      <p style={{ margin: "0 0 8px", fontSize: "11px", fontWeight: 700, color: P.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>
        {label}
      </p>
      <p style={{ margin: "0 0 6px", fontSize: "30px", fontWeight: 800, color: P.text, lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ margin: 0, fontSize: "12px", color: trend === "up" ? P.green : trend === "down" ? P.red : P.muted }}>
        {trend === "up" ? "↑ " : trend === "down" ? "↓ " : ""}{sub}
      </p>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${P.border}`, borderRadius: "10px", padding: "12px 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <p style={{ margin: "0 0 8px", fontSize: "12px", fontWeight: 700, color: P.text }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ margin: "2px 0", fontSize: "12px", color: P.muted }}>
          <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: p.color, marginRight: "6px" }} />
          {p.name}: <strong style={{ color: P.text }}>{p.value.toLocaleString()}</strong>
        </p>
      ))}
    </div>
  );
};

// ─── Main view ────────────────────────────────────────────────────────────────

type Tab = "30d" | "12m";

export function AnalyticsView() {
  const [tab, setTab] = useState<Tab>("30d");

  const totals30d = TRAFFIC_30D.reduce((a, r) => ({
    users:     a.users     + r.users,
    sessions:  a.sessions  + r.sessions,
    pageviews: a.pageviews + r.pageviews,
  }), { users: 0, sessions: 0, pageviews: 0 });

  const card: React.CSSProperties = {
    background: P.card, border: `1px solid ${P.border}`, borderRadius: "14px", padding: "24px",
  };
  const cardTitle: React.CSSProperties = {
    margin: "0 0 20px", fontSize: "14px", fontWeight: 700, color: P.text,
  };
  const row: React.CSSProperties = {
    display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap",
  };

  return (
    <div style={{ padding: "32px 36px", background: P.bg, minHeight: "100vh", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <SetStepNav nav={[{ label: "Analytics" }]} />

      {/* Header */}
      <div style={{ marginBottom: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: 800, color: P.text }}>Analytics</h1>
          <p style={{ margin: 0, fontSize: "14px", color: P.muted }}>Website traffic overview — demo data</p>
        </div>
        {/* Tab switcher */}
        <div style={{ display: "flex", background: "#e5e7eb", borderRadius: "8px", padding: "3px" }}>
          {(["30d", "12m"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "6px 16px", borderRadius: "6px", border: "none", cursor: "pointer",
                fontSize: "13px", fontWeight: 600,
                background: tab === t ? "#fff" : "transparent",
                color: tab === t ? P.text : P.muted,
                boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s",
              }}
            >
              {t === "30d" ? "Last 30 days" : "Last 6 months"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div style={row}>
        <KpiCard label="Total Users"       value={totals30d.users.toLocaleString()}     sub="+18% vs prev period"   color={P.accent}   trend="up"   />
        <KpiCard label="Sessions"          value={totals30d.sessions.toLocaleString()}  sub="+14% vs prev period"   color={P.primary}  trend="up"   />
        <KpiCard label="Pageviews"         value={totals30d.pageviews.toLocaleString()} sub="+21% vs prev period"   color={P.purple}   trend="up"   />
        <KpiCard label="Avg Bounce Rate"   value="38.4%"                                sub="-3.2% vs prev period"  color={P.green}    trend="up"   />
        <KpiCard label="Avg Session Time"  value="2m 34s"                               sub="+0.4s vs prev period"  color={P.amber}    trend="up"   />
      </div>

      {/* Traffic chart + channels */}
      <div style={{ ...row, alignItems: "flex-start" }}>
        <div style={{ ...card, flex: "2 1 420px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <p style={{ ...cardTitle, margin: 0 }}>
              {tab === "30d" ? "Daily Traffic — Last 30 Days" : "Monthly Users — Last 6 Months"}
            </p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            {tab === "30d" ? (
              <AreaChart data={TRAFFIC_30D} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gUsers"     x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={P.accent}  stopOpacity={0.2} />
                    <stop offset="95%" stopColor={P.accent}  stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="gSessions"  x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={P.primary} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={P.primary} stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={P.grid} vertical={false} />
                <XAxis dataKey="day"      tick={{ fontSize: 10, fill: P.muted }} tickLine={false} interval={4} />
                <YAxis                    tick={{ fontSize: 10, fill: P.muted }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                <Area type="monotone" dataKey="users"    name="Users"    stroke={P.accent}  strokeWidth={2} fill="url(#gUsers)"    dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="sessions" name="Sessions" stroke={P.primary} strokeWidth={2} fill="url(#gSessions)" dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            ) : (
              <BarChart data={MONTHLY_USERS} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={P.grid} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: P.muted }} tickLine={false} />
                <YAxis                 tick={{ fontSize: 11, fill: P.muted }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="users" name="Users" fill={P.accent} radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Traffic channels */}
        <div style={{ ...card, flex: "1 1 220px" }}>
          <p style={cardTitle}>Traffic by Channel</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={CHANNELS} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {CHANNELS.map((c, i) => (
                  <g key={i}>
                    <path key={i} fill={c.color} />
                  </g>
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginTop: "8px" }}>
            {CHANNELS.map((c) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                  <span style={{ color: P.muted }}>{c.name}</span>
                </span>
                <strong style={{ color: P.text }}>{c.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Devices + top pages */}
      <div style={{ ...row, alignItems: "flex-start" }}>
        {/* Devices */}
        <div style={{ ...card, flex: "1 1 200px" }}>
          <p style={cardTitle}>Devices</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {DEVICES.map((d) => (
              <div key={d.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "13px" }}>
                  <span style={{ color: P.muted }}>{d.name}</span>
                  <strong style={{ color: P.text }}>{d.value}%</strong>
                </div>
                <div style={{ height: "6px", background: "#e5e7eb", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${d.value}%`, background: d.color, borderRadius: "99px", transition: "width 0.6s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top pages */}
        <div style={{ ...card, flex: "3 1 400px", overflow: "hidden" }}>
          <p style={cardTitle}>Top Pages</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr>
                  {["Page", "Views", "Avg Time", "Bounce"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "0 12px 10px 0", fontSize: "11px", fontWeight: 700, color: P.muted, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${P.border}` }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOP_PAGES.map((row, i) => (
                  <tr key={row.page} style={{ background: i % 2 === 0 ? "transparent" : "#f9fafb" }}>
                    <td style={{ padding: "10px 12px 10px 0", color: P.primary, fontWeight: 500 }}>
                      {row.title}
                      <span style={{ display: "block", fontSize: "11px", color: P.muted, fontWeight: 400 }}>{row.page}</span>
                    </td>
                    <td style={{ padding: "10px 12px 10px 0", color: P.text, fontWeight: 600 }}>{row.views.toLocaleString()}</td>
                    <td style={{ padding: "10px 12px 10px 0", color: P.muted }}>{row.avgTime}</td>
                    <td style={{ padding: "10px 12px 10px 0" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: parseFloat(row.bounce) < 35 ? P.green : parseFloat(row.bounce) > 44 ? P.red : P.amber }}>
                        {row.bounce}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px 18px", fontSize: "13px", color: "#92400e" }}>
        <strong>Demo data</strong> — Connect Google Analytics 4 to see real traffic metrics.
      </div>
    </div>
  );
}
