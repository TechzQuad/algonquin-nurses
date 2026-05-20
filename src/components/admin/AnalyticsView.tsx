"use client";

import { useEffect, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// ─── Types & helpers ──────────────────────────────────────────────────────────

type Doc = { createdAt: string };

const FORM_SOURCES = [
  { key: "contact-submissions", label: "Contact",          color: "#0d9488" },
  { key: "referrals",           label: "Referrals",        color: "#3b5d95" },
  { key: "feedback",            label: "Feedback",         color: "#f59e0b" },
  { key: "applications",        label: "Job Applications", color: "#2d4a78" },
  { key: "chat-leads",          label: "Chat Leads",       color: "#7c3aed" },
];

const PALETTE = {
  primary: "#3b5d95",
  accent:  "#0d9488",
  bg:      "#f4f7fb",
  card:    "#ffffff",
  border:  "#e5e7eb",
  text:    "#1a1a2e",
  muted:   "#6b7280",
  grid:    "#f3f4f6",
};

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function monthLabel(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}
function dayLabel(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function buildMonthlyTrend(
  datasets: Record<string, Doc[]>,
  months = 6
): { month: string; [k: string]: number | string }[] {
  const now   = new Date();
  const rows: { month: string; [k: string]: number | string }[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const d     = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const row: { month: string; [k: string]: number | string } = { month: monthLabel(d) };
    FORM_SOURCES.forEach(({ key, label }) => {
      row[label] = (datasets[key] ?? []).filter((doc) => {
        const cd = new Date(doc.createdAt);
        return cd.getFullYear() === d.getFullYear() && cd.getMonth() === d.getMonth();
      }).length;
    });
    rows.push(row);
  }
  return rows;
}

function buildDailyTrend(
  datasets: Record<string, Doc[]>,
  days = 30
): { day: string; total: number }[] {
  const now  = new Date();
  const rows = [];
  for (let i = days - 1; i >= 0; i--) {
    const d    = new Date(now);
    d.setDate(now.getDate() - i);
    const total = Object.values(datasets).flat().filter((doc) => {
      const cd = new Date(doc.createdAt);
      return (
        cd.getFullYear() === d.getFullYear() &&
        cd.getMonth() === d.getMonth() &&
        cd.getDate() === d.getDate()
      );
    }).length;
    rows.push({ day: dayLabel(d), total });
  }
  return rows;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, color }: { label: string; value: number | string; sub: string; color: string }) {
  return (
    <div
      style={{
        background:   PALETTE.card,
        border:       `1px solid ${PALETTE.border}`,
        borderRadius: "14px",
        padding:      "22px 24px",
        borderTop:    `3px solid ${color}`,
        flex:         1,
        minWidth:     0,
      }}
    >
      <p style={{ margin: "0 0 8px", fontSize: "12px", fontWeight: 600, color: PALETTE.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>
        {label}
      </p>
      <p style={{ margin: "0 0 6px", fontSize: "32px", fontWeight: 800, color: PALETTE.text, lineHeight: 1 }}>
        {fmt(Number(value))}
      </p>
      <p style={{ margin: 0, fontSize: "12px", color: PALETTE.muted }}>{sub}</p>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${PALETTE.border}`, borderRadius: "10px", padding: "12px 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <p style={{ margin: "0 0 8px", fontSize: "12px", fontWeight: 700, color: PALETTE.text }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ margin: "2px 0", fontSize: "12px", color: PALETTE.muted }}>
          <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: p.color, marginRight: "6px" }} />
          {p.name}: <strong style={{ color: PALETTE.text }}>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

// ─── Main view ────────────────────────────────────────────────────────────────

export function AnalyticsView() {
  const [datasets, setDatasets] = useState<Record<string, Doc[]>>({});
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const result: Record<string, Doc[]> = {};
      await Promise.allSettled(
        FORM_SOURCES.map(async ({ key }) => {
          try {
            const res = await fetch(`/api/${key}?limit=1000&depth=0&sort=-createdAt`, { credentials: "include" });
            if (res.ok) {
              const data = await res.json();
              result[key] = data.docs ?? [];
            }
          } catch { /* ignore */ }
        })
      );
      if (active) { setDatasets(result); setLoading(false); }
    }
    load();
    return () => { active = false; };
  }, []);

  // Computed metrics
  const totals    = FORM_SOURCES.map(({ key, label, color }) => ({ label, color, value: (datasets[key] ?? []).length }));
  const allDocs   = Object.values(datasets).flat();
  const now       = new Date();
  const thisMonth = allDocs.filter((d) => {
    const cd = new Date(d.createdAt);
    return cd.getMonth() === now.getMonth() && cd.getFullYear() === now.getFullYear();
  }).length;
  const lastMonth = allDocs.filter((d) => {
    const cd = new Date(d.createdAt);
    const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return cd.getMonth() === lm.getMonth() && cd.getFullYear() === lm.getFullYear();
  }).length;
  const thisWeek  = allDocs.filter((d) => {
    const cd   = new Date(d.createdAt);
    const diff = (now.getTime() - cd.getTime()) / 86400000;
    return diff <= 7;
  }).length;

  const monthlyData = buildMonthlyTrend(datasets, 6);
  const dailyData   = buildDailyTrend(datasets, 30);

  const pieData = totals.filter((t) => t.value > 0).map((t) => ({ name: t.label, value: t.value, color: t.color }));

  const s = {
    page: { padding: "32px 36px", background: PALETTE.bg, minHeight: "100vh", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" },
    header: { marginBottom: "28px" },
    h1: { margin: "0 0 6px", fontSize: "24px", fontWeight: 800, color: PALETTE.text } as React.CSSProperties,
    sub: { margin: 0, fontSize: "14px", color: PALETTE.muted } as React.CSSProperties,
    row: { display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" as const },
    card: { background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: "14px", padding: "24px" } as React.CSSProperties,
    cardTitle: { margin: "0 0 20px", fontSize: "14px", fontWeight: 700, color: PALETTE.text } as React.CSSProperties,
  };

  if (loading) {
    return (
      <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #e5e7eb", borderTopColor: PALETTE.accent, borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: PALETTE.muted, fontSize: "14px" }}>Loading analytics…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <h1 style={s.h1}>Analytics</h1>
        <p style={s.sub}>Form submissions overview — all time</p>
      </div>

      {/* KPI row */}
      <div style={s.row}>
        <KpiCard label="Total Submissions"  value={allDocs.length} sub="All forms combined"           color={PALETTE.accent}  />
        <KpiCard label="This Month"         value={thisMonth}      sub={`${lastMonth} last month`}    color={PALETTE.primary} />
        <KpiCard label="This Week"          value={thisWeek}       sub="Last 7 days"                  color="#7c3aed"         />
        <KpiCard label="Avg Per Month"      value={monthlyData.length ? Math.round(monthlyData.reduce((a, r) => a + FORM_SOURCES.reduce((s, f) => s + Number(r[f.label] || 0), 0), 0) / monthlyData.length) : 0} sub="6-month average" color="#f59e0b" />
      </div>

      {/* Daily trend + pie */}
      <div style={{ ...s.row, alignItems: "flex-start" }}>
        {/* Daily area chart */}
        <div style={{ ...s.card, flex: "2 1 400px" }}>
          <p style={s.cardTitle}>Daily Submissions — Last 30 Days</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={dailyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={PALETTE.accent} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={PALETTE.accent} stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: PALETTE.muted }} tickLine={false} interval={4} />
              <YAxis tick={{ fontSize: 10, fill: PALETTE.muted }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="total" name="Submissions" stroke={PALETTE.accent} strokeWidth={2.5} fill="url(#areaGrad)" dot={false} activeDot={{ r: 5, fill: PALETTE.accent }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div style={{ ...s.card, flex: "1 1 220px" }}>
          <p style={s.cardTitle}>Submissions by Form</p>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [v, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
                {pieData.map((d) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                      <span style={{ color: PALETTE.muted }}>{d.name}</span>
                    </span>
                    <span style={{ fontWeight: 700, color: PALETTE.text }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p style={{ textAlign: "center", color: PALETTE.muted, fontSize: "13px", paddingTop: "40px" }}>No data yet</p>
          )}
        </div>
      </div>

      {/* Monthly stacked bar */}
      <div style={{ ...s.card, marginBottom: "24px" }}>
        <p style={s.cardTitle}>Monthly Submissions by Form — Last 6 Months</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.grid} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: PALETTE.muted }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: PALETTE.muted }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
            {FORM_SOURCES.map(({ label, color }) => (
              <Bar key={label} dataKey={label} stackId="a" fill={color} radius={label === FORM_SOURCES[FORM_SOURCES.length - 1].label ? [4,4,0,0] : [0,0,0,0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Per-source cards */}
      <div style={s.row}>
        {FORM_SOURCES.map(({ key, label, color }) => {
          const docs = datasets[key] ?? [];
          const monthCount = docs.filter((d) => {
            const cd = new Date(d.createdAt);
            return cd.getMonth() === now.getMonth() && cd.getFullYear() === now.getFullYear();
          }).length;
          return (
            <div
              key={key}
              style={{
                background:   PALETTE.card,
                border:       `1px solid ${PALETTE.border}`,
                borderRadius: "12px",
                padding:      "18px 20px",
                flex:         "1 1 160px",
                borderTop:    `3px solid ${color}`,
              }}
            >
              <p style={{ margin: "0 0 10px", fontSize: "12px", fontWeight: 600, color: PALETTE.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</p>
              <p style={{ margin: "0 0 4px", fontSize: "26px", fontWeight: 800, color: PALETTE.text, lineHeight: 1 }}>{docs.length}</p>
              <p style={{ margin: 0, fontSize: "11px", color: PALETTE.muted }}>
                <span style={{ color, fontWeight: 600 }}>{monthCount}</span> this month
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
